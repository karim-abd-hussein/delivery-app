import { Server, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { Notification } from '../interfaces/base.interfaces';
import notificationModel from '../models/notification.model';
import ApiError from '../utils/ApiError';
import httpErrorResponse from '../utils/httpErrorResponse';

let onlineUsers = new Map<string, string>();
let io: Server;

export default function initSocket(server: HTTPServer) {
  io = new Server(server, {
    cors: {
      origin: "*", // Allow all origins for testing purposes
    },
  });

  io.on('connection', (socket: Socket) => {

    // Register user
    socket.on('register', async (userId: string) => {
      await notityNewUser(userId, socket.id);
      onlineUsers.set(userId, socket.id);
    });

  
    // Handle disconnect
    socket.on('disconnect', () => {
      for (const [key, value] of onlineUsers.entries()) {
        if (value === socket.id) {
          onlineUsers.delete(key);
        }
      }
    });
  });
}

export async function notify(notification: Notification) {
  try {
    const user = onlineUsers.get(notification.id);
    if (user) {
      io.to(user).emit('order', { type: 'order', message: notification.message });
    } else {
      await new notificationModel(notification).save();
    }
  } catch (error: any) {
    throw new ApiError(error.message, httpErrorResponse.internalServerError.status);
  }
}

export async function notityNewUser(userId: string, socketId: string) {
  try {
    const notifications: Notification[] = await notificationModel.find({ userId });
    await notificationModel.deleteMany({ userId });
    for (const notification of notifications) {
      io.to(socketId).emit('notification', { type: 'notification', message: notification.message });
    }
  } catch (error: any) {
    throw new ApiError(error.message, httpErrorResponse.internalServerError.status);
  }
}
