import express from "express";
import { deleteStore, getStoresByName, insertStore, updateStore } from "../controllers/stores";
const router=express.Router();


router.post('/insert',insertStore);


router.delete('/delete/:id',deleteStore)


router.put('/update/:id',updateStore);


router.get('/get-by-name/:name',getStoresByName);

export default router;