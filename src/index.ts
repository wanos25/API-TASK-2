import express from "express";
import cors from "cors";
import router from "./routes/index";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

import { errorHandler } from "./middleware/errorHandler";
app.use(errorHandler);
