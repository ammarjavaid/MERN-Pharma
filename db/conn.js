import mongoose from "mongoose";

const Connection = async() =>{

    const DB = process.env.DATABASE;

    try{
        await mongoose.connect(DB, {useNewUrlParser: true});
        console.log("Database Connected!");
    }catch(err){
        console.log(err);
    }
}

export default Connection