import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import Connection from "./db/conn.js";
import userRouter from "./routes/routes.js";
import apointmentRouter from "./routes/ApointmentRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", userRouter);
app.use("/user", apointmentRouter);

Connection();

app.listen(3000, () =>{
    console.log("Server is Running....");
})