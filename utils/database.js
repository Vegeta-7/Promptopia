import mongoose from "mongoose";

let isConnected = false;  //track the connection

export const connectToDB = async() => {    
    // In Mongoose, the strictQuery option is used to control how strictly the query conditions are enforced
    mongoose.set('strictQuery',true);

    if(isConnected){
        console.log("MongoDB is connected");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            // dbName: "share_prompt", 
            useNewUrlParser: true,
            useUnifiedTopology: true,           
        })
        isConnected=true;
        console.log("MongoDB now connected",mongoose.connection.db.databaseName)
    } catch (error) {
        console.log(error);
    }
}