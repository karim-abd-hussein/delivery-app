import { Document,Model } from "mongoose";
import validateId from "../validation/validateId.validator";

export async function save<T extends Document>(item:T,ItemModel:Model<T>):Promise<void> {
    
try {
    
    const newItem=new ItemModel(item);

    await newItem.save();


} catch (error) {
    
    throw error;
}

}


export async function remove<T extends Document>(id:string,ItemModel:Model<T>):Promise<void> {
    
    try {
        
        const oId=await validateId(id,ItemModel);

           await ItemModel.deleteOne({_id:oId});
        
    
    } catch (error) {
        
        throw error;
    }
    
    }
    
    
    export async function getItemsByName<T extends Document>(name:string,ItemModel:Model<T>):Promise<T[]> {
    
        try {
            
            
            const result:T[]=await ItemModel.find({name});

            return result;
        
        } catch (error) {
            
            throw error;
        }
        
        }