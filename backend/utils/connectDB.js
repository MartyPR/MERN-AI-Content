const mongoose = require("mongoose");

//pas:UYTO4HfU6qa8VlvP
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://martypr3:UYTO4HfU6qa8VlvP@ia-mern.maij9ws.mongodb.net/?retryWrites=true&w=majority&appName=IA-Mern");
    console.log(`Mongoose connected ${conn.connection.host}`);
  } catch (error) {
    console.error(`error connecting to MongoDB ${error}`);
    process.exit(1);
  }
};
module.exports = connectDB;
