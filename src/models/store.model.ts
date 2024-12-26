import mongoose, { Document, Schema } from 'mongoose';
import { Store } from '../interfaces/base.interfaces';
const storeSchema:Schema = new mongoose.Schema<Store>(
  {
    name: { type: String, required: true },
    address: { 
        city:{
            type:String,
            require:true
            },
        street:{

            type:String,
            require:true

            }
        },
    phone: { type: String, required: true },
  }
);

export default mongoose.model<Store&Document>('StoreModel', storeSchema);
