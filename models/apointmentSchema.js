import mongoose from "mongoose";


const apointmentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    disease: {
        type: String,
        required: true
    },
    doctor: {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
    user: {
        // type: String,
        type: mongoose.Types.ObjectId,
        ref: "user",
        // required: true
    },
});

const myApointmentSchema = mongoose.model("Apointment", apointmentSchema);
export default myApointmentSchema;