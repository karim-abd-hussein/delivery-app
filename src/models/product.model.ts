import mongoose, { Document, Schema } from "mongoose";
import { Product } from "../interfaces/base.interfaces";

const productSchema:Schema = new mongoose.Schema<Product>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String },
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' }, // Belongs to a Store
  },
  { timestamps: true }
);

export default mongoose.model<Product&Document>('ProductModel', productSchema);
