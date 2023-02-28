import express from "express"
import { deleteUser, getUser, getUserID, postUser, updateUser } from "../controller/Apointment.js";

const apointmentRouter = express.Router();

apointmentRouter.post("/", postUser);
apointmentRouter.get("/", getUser);
apointmentRouter.get("/:id", getUserID);
apointmentRouter.put("/:id", updateUser);
apointmentRouter.delete("/:id", deleteUser);

export default apointmentRouter;