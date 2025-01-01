import express from "express";
import { canselOrder, changeStatus, createOrder, getOrders, getPendingStoreOrders } from "../controllers/orders";
const router=express.Router();

//Customer
router.post('/create',createOrder);

router.delete('/cansel/:id',canselOrder);

router.get('/orders',getOrders);

//Store
router.put('/change-status/:id/:status',changeStatus);

router.get('/get-store-orders',getPendingStoreOrders);

export default router;
