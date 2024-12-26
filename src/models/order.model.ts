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
        nextTo:{

            type:String,
        }

    },
     products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // References a Product
        quantity: { type: Number, required: true }, // Quantity of the product
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

 export default mongoose.model<Order & Document>('OrderModel', orderSchema);
