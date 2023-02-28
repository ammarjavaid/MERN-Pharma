import mongoose from "mongoose";

const userToken = new mongoose.Schema({
    token: {
        type: String,
        required: true
    }
});

const myToken = mongoose.model("token", userToken);
export default myToken;