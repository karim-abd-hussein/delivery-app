import express from "express";
import { canselOrder, changeStatus, createOrder, deleteOrder, getOrders, updateOrder } from "../controllers/orders";
const router=express.Router();

//Customer
router.post('/create',createOrder);

router.put('/update/:id',updateOrder);

router.delete('/delete-completed/:id',deleteOrder);

router.delete('/cansel/:id',canselOrder);

router.get('/orders',getOrders);

//Admins
router.put('/change-status/:id/:status',changeStatus);

export default router;