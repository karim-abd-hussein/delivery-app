import{ Document,Model } from "mongoose";

export async function save<T extends Document>(item:T,ItemModel:Model<T>):Promise<void> {
    
try {
    
    const newItem=new ItemModel(item);

    await newItem.save();


} catch (error) {
    
    throw error;
}

}


export async function remove<T extends Document>(_id:string,ItemModel:Model<T>):Promise<void> {
    
    try {
        

           await ItemModel.deleteOne({_id});
        
    
    } catch (error) {
        
        throw error;
    }
    
    }
    
    

    export async function updateItemById<T extends Document>(id:string,item:object,ItemModel:Model<T>):Promise<void> {
    
            try {
                
                
                await ItemModel.updateOne({_id:id},{$set:item},{ runValidators: true } );
            
            } catch (error) {
                
                throw error;
            }
            
            }