import mongoose from "mongoose";
import { Notification } from "../interfaces/base.interfaces";

const notificationSchema=new mongoose.Schema({

    id:{

        type:String,
        require:true
    },
    message:{

        type:String,
        require:true
    },
    createdAt: { type: Date, default: Date.now }

});

export default  mongoose.model('NotificationModel',notificationSchema);