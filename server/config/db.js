import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "accessishop"   // your DB name
    });

    console.log("MongoDB Connected:", conn.connection.host);
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1); // stop app if DB fails
  }
};

export default connectDB;
