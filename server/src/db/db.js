import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connection Host: ", conn.connection.host);
  } catch (error) {
    console.error("connectToDB Error: ", error);
    process.exit(1);
  }
};

export default connectToDB;
