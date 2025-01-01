import mongoose,{Document, Mongoose,Schema} from "mongoose";
import { Customer } from "../interfaces/base.interfaces";

// Define the schema
const customerSchema:Schema = new mongoose.Schema<Customer>({
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    imageURL: {
        type: String,
    },
    address:{
        city:{
            type:String,
        },
        street:{

            type:String
        },
        nextTo:{

            type:String
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model<Customer & Document>('CustomerModel',customerSchema);
