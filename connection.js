import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

const { CONNECTION_URL, PORT } = process.env;

const connectToDb = async () => {
  try {
    await mongoose.connect(CONNECTION_URL);
    console.log("connected to database");
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

export { express, app, connectToDb };
