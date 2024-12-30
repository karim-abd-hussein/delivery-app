import express from "express";
import { deleteStore, getStoresByName, insertStore, updateStore } from "../controllers/stores";
const router=express.Router();


 
/**
 * @swagger
 * /stores/insert:
 *   post:
 *     summary: Create a new store
 *     description: Add a new store to the application.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the store
 *                 example: "SuperMart"
 *              address:
 *              type: object
 *              required:
 *                 - city
 *                 - street
 *              phone:
 *                 type:string
 *                 description: The phone of the store
 *     responses:
 *       201:
 *         description: Store created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Generated ID for the store
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Name of the store
 *                   example: "SuperMart"
 *       400:
 *         description: Invalid request body
 */

router.post('/insert',insertStore);


router.delete('/delete/:id',deleteStore)


router.put('/update/:id',updateStore);


router.get('/get-by-name/:name',getStoresByName);

export default router;