import mongoose from "mongoose";
import myApointmentSchema from "../models/apointmentSchema.js";
import myUserSchema from "../models/UserSchema.js";


export const postUser = async(req, res) => {


    const { fullname, email, phone, disease, doctor, user } = req.body;

    if( !fullname || !email || !phone || !disease || !doctor ){
        return res.status(422).json({error: "please fill the fields"});
    }

    let existingUser;
    try{
        existingUser = await myUserSchema.findById(user);
        if(!existingUser){
            return res.status(404).json({ error: "User not found!" });
        }
    }catch(err){
        console.log(err)
    }

    let myuser;
    try{

        myuser = new myApointmentSchema({ fullname, email, phone, disease, doctor, user });

        const session = await mongoose.startSession();
        session.startTransaction();
        existingUser.fixed.push(myuser);
        await existingUser.save({ session });
        myuser = await myuser.save({ session });
        session.commitTransaction();
        if(!myuser){
            return res.status(500).json({ error: "Unexpexted Error Occured!" });
        }
            return res.status(200).json({ myuser });

    }catch(err){
        console.log(err)
    }



    // const { fullname, email, phone, disease, doctor, user } = req.body;
    // if(!fullname || !email || !phone || !disease || !doctor){
    //     return res.status(422).json({ error: "please fill the fields" });
    // }


    // let existingUser;
    // try{
    //     existingUser = await myUserSchema.findById(user);
    //     if(!existingUser){
    //         return res.status(404).json({ error: "User not found!" });
    //     }
    // }catch(err){
    //     console.log(err)
    // }


    // try{
    //     const myuser = new myApointmentSchema({ fullname, email, phone, disease, doctor, user });

    //     const session = await mongoose.startSession();
    //     session.startTransaction();
    //     existingUser.fixed.push(myuser);
    //     await existingUser.save({ session });
    //     const savedUser = await myuser.save({ session });
    //     session.commitTransaction();


    //     // const savedUser = await user.save();
    //     if(!savedUser){
    //         return res.status(500).json({ error: "Invalid Crenditals" });
    //     }
    //     return res.status(200).json({ savedUser });
    // } catch(err) {
    //     console.log(err);
    // }
}

export const getUser = async(req, res) => {
    try{
        const user = await myApointmentSchema.find();
        if(!user){
            return res.status(422).json({ error: "User not found" });
        } else {
            return res.status(200).json({ user });
        }
    } catch(err){
        console.log(err);
    }
}

export const getUserID = async(req, res) => {
    const id = req.params.id;
    try{
        const singleUser = await myApointmentSchema.findById(id);
        if(!singleUser){
            return res.status(422).json({ error: "User not found" });
        } else {
            return res.status(200).json({ singleUser });
        }
    } catch(err){
        console.log(err);
    }
}

export const updateUser = async(req, res) => {
    const id = req.params.id;
    const { fullname, email, phone, disease, doctor } = req.body;
    try{
        const updateUser = await myApointmentSchema.findByIdAndUpdate(id ,{
            fullname, email, phone, disease, doctor
        });
        if(!updateUser){
            return res.status(422).json({ error: "User not found" });
        } else {
            return res.status(200).json({ updateUser });
        }
    } catch(err){
        console.log(err);
    }
}

export const deleteUser = async(req, res) => {
    const id = req.params.id;
    try{
        await myApointmentSchema.findByIdAndRemove(id);
            return res.status(200).json({ message: "Successfully Deleted!" });
    } catch(err){
        console.log(err);
    }
}