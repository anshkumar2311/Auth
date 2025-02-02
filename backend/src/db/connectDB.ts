import { mongoose } from "mongoose";

export const connectDB = async () => {
  try {
    let db_uri = process.env.MONGO_URI;
    const conn =  await mongoose.connect(db_uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connection to MongoDB", error.message);
    process.exit(1); //1 is failure and 0 is success
  }
};
