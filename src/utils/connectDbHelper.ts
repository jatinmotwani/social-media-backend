import { Sequelize } from "sequelize-typescript";

import { User } from "../models/User";
import { Post } from "../models/Post";
import { Comment } from "../models/Comment";
import { Like } from "../models/Like";

const sequelize = new Sequelize({
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  dialect: "postgres",
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
});

sequelize.addModels([User, Post, Comment, Like]);

export const initDB = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
};
