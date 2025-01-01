import express from "express";
import { deleteProduct,  getProductById,  getProducts, getProductsByName, insertProduct, updateProduct } from "../controllers/products";
const router=express.Router();


router.post('/insert',insertProduct);

router.delete('/delete/:id',deleteProduct);

router.put('/update/:id',updateProduct);

router.get('/get-by-name/:name',getProductsByName);

router.get('/get-by-id/:id',getProductById);

router.get('/get-products',getProducts);


export default router;