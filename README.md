# Delivery-Application

## Overview
The **Delivery-Application** backend is the server-side implementation for a delivery service application. It provides RESTful APIs for managing stores, products, orders, and users, including real-time notifications. Built with Node.js, Express, MongoDB, Mongoose, and Socket.IO, this backend ensures robust performance and scalability.

## Features
- **Super Admin**: Manage stores (create, delete, update, retrieve).
- **Stores**: Add and manage products.
- **Customers**: Place and track orders.
- **Notifications**: Real-time updates using Socket.IO.
- **Authentication**: Secure login and access control with JWT.
- **API Documentation**: Integrated Swagger UI for easy API testing and exploration.

## Technologies Used
- **Node.js**: Server-side runtime.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for flexible and scalable data storage.
- **Mongoose**: ODM for MongoDB.
- **Socket.IO**: Real-time communication.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Swagger**: API documentation and testing.

## Endpoints

### Stores 
| Method | Endpoint                      | Description               |
|--------|-------------------------------|---------------------------|
| POST   | /stores /insert               | Create a new store.       |
| POST   | /stores /log-in               | log in from store.        |
| GET    | /stores/get-stores            | Retrieve all stores.      |
| GET    | /stores/get-by-id/:id         | Retrieve a specific store.|
| GET    | /stores/get-by-name/:name     | Retrieve a specific store.|
| GET    | /stores/get-by-phone/:phone   | Retrieve a specific store.|
| PUT    | /stores/update/:id            | Update store details.     |
| DELETE | /stores/delete/:id            | Delete a store.           |

### Products 
| Method | Endpoint                     | Description                 |
|--------|------------------------------|-----------------------------|
| POST   | /products/insert             | Add a new product.          |
| GET    | /products/get-products       | Retrieve all products.      |
| GET    | /products/get-by-id/:id      | Retrieve a specific product.|
| GET    | /products/get-by-name/:id    | Retrieve a specific product.|
| PUT  | /products/update/:id           | Update product details.     |
| DELETE | /products/delete/:id         | Delete a product.           |

### Orders 
| Method | Endpoint                         | Description               |
|--------|----------------------------------|---------------------------|
| POST   | /orders/insert                   | Create a new order.       |
| DELETE | /orders/delete/:id               | cansel pending order      |
| GET    | /orders/orders                   | Retrieve all orders.      |
| GET    | /orders/get-store-orders/:id     | Retrieve a specific order.|
| PUT    | /orders/change-status/:id/:status| Update order status.      |

### Customers
| Method | Endpoint        | Description                 |
|--------|-----------------|-----------------------------|
| POST   | /auth/add-profile | Add a profile             |
| POST   | /auth/sgin-up | Register a new user.          |
| POST   | /auth/log-in    | User login.                 |


## Real-Time Notifications
Socket.IO is used to provide real-time notifications to users. Events include:
- **Order Updates**: Notify customers when their order status changes.
- **New Products**: Notify customers about new product additions.

## API Documentation
Swagger UI is integrated for API testing and documentation. Access it at `http://localhost:5000/api-docs` after starting the server.


