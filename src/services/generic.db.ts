import mongoose, { Document,Model } from "mongoose";

export async function save<T extends Document>(item:T,ItemModel:Model<T>):Promise<void> {
    
try {
    
    const newItem=new ItemModel(item);

    await newItem.save();


} catch (error) {
    
    throw error;
}

}


export async function remove<T extends Document>(id:mongoose.Types.ObjectId,ItemModel:Model<T>):Promise<void> {
    
    try {
        

           await ItemModel.deleteOne({_id:id});
        
    
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

    export async function updateItemById<T extends Document>(id:mongoose.Types.ObjectId,item:T,ItemModel:Model<T>):Promise<void> {
    
            try {
                
                
                await ItemModel.updateOne({_id:id},{$set:item},{ runValidators: true } );
            
            } catch (error) {
                
                throw error;
            }
            
            }