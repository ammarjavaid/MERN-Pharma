import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fixed: [{
        type: mongoose.Types.ObjectId, ref: "Apointment"
    }]
});

const myUserSchema = mongoose.model("user", userSchema);
export default myUserSchema;