require("../env");
import express from "express";
import { initDB } from "./utils/connectDbHelper";
import router from "./routes";
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

// Routes
app.use("/api", router);

// Init db
initDB();

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}.`);
});
