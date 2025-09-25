import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.routes.js";
import JobRoute from "./routes/job.routes.js";
import ApplicationRoute from "./routes/application.routes.js";

dotenv.config({});
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));


//  api routes

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/jobs", JobRoute);
app.use("/api/v1/application",ApplicationRoute);


app.listen(PORT, () => {
    connectDB()
  console.log(`server is running at ${PORT}`);
});
