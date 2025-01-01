import mongoose, { Document, Schema } from "mongoose";
import {Order} from '../interfaces/base.interfaces'
const orderSchema:Schema=new mongoose.Schema<Order>({

    phone:{

        type:String,
        require:true,
    },
    address:{

        city:{

            type:String,
            require:true
        },
        street:{

            type:String,
            require:true
        },
    },
     products: [
      {
        productId: { type:String, required: true },
        quantity: { type: Number, required: true }, 
      },
    ],
    store:{type:String,require:true},
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Pending','Canceled','Accepted', 'Received'],
      default: 'Pending',
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

 export default mongoose.model<Order & Document>('OrderModel', orderSchema);
