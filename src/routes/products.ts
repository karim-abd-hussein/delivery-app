import express from "express";
import { deleteProduct, getByName, insertProduct } from "../controllers/products";
const router=express.Router();


router.post('/insert',insertProduct);

router.delete('/delete/:id',deleteProduct)

router.get('/get-by-name/:name',getByName);


export default router;