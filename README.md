# Delivery Application

This is a backend application for managing a delivery service. The application supports the following entities:
- **Products**
- **Stores**
- **Customers**
- **Orders**

The application provides a REST API for managing these entities.

## **Table of Contents**
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)

---

## **Features**
- Create, read, update, and delete products.
- Manage stores and their inventory.
- Customer registration and profile management.
- Place and manage orders.

---


## **API Endpoints**

### **Products**
| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| GET    | /api/products      | Get all products         |
| POST   | /api/products      | Create a new product     |
| GET    | /api/products/:id  | Get a product by ID      |
| PUT    | /api/products/:id  | Update a product by ID   |
| DELETE | /api/products/:id  | Delete a product by ID   |

### **Stores**
| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| GET    | /api/stores        | Get all stores           |
| POST   | /api/stores        | Create a new store       |
| GET    | /api/stores/:id    | Get a store by ID        |
| PUT    | /api/stores/:id    | Update a store by ID     |
| DELETE | /api/stores/:id    | Delete a store by ID     |

### **Customers**
| Method | Endpoint             | Description                  |
|--------|----------------------|------------------------------|
| POST   | /api/auth/sign-up       | Register a new customer   |
| POST   | /api/auth/log-in        | Log in                    |
| POST   | /api/auth/add-profile   | Add customer profile      |

### **Orders**
| Method | Endpoint           | Description               |
|--------|--------------------|---------------------------|
| GET    | /api/orders        | Get all orders            |
| POST   | /api/orders        | Place a new order         |
| GET    | /api/orders/:id    | Get an order by ID        |
| PUT    | /api/orders/:id    | Update an order by ID     |
| DELETE | /api/orders/:id    | Cancel an order by ID     |

---

## **Technologies Used**
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB.
- **dotenv**: For managing environment variables.

