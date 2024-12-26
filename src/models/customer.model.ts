import mongoose,{Mongoose,Schema} from "mongoose";


// Define the schema
const customerSchema:Schema = new mongoose.Schema({
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
    image: {
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

// Create a model from the schema
const Customer = mongoose.model('Customer',customerSchema);

// Export the model
export default Customer;
