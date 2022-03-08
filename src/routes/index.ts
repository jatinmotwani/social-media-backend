import { Router } from "express";

import authenticate from "../middlewares/authentication";

import postRouter from "./post";
import userRouter from "./user";

const router = Router();

router.use("/user", userRouter);

router.use("/post", authenticate, postRouter);

router.use("/*", (req, res) => {
  return res.status(400).send("Error");
});

export default router;
