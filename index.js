import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect();
    console.log("MongoDB Connection Host: ", conn.connection.host);
  } catch (error) {
    console.error("connectToDB Error: ", error);
    process.exit(1);
  }
};
