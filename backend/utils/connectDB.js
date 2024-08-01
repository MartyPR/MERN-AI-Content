const mongoose = require("mongoose");

//pas:
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB);
    console.log(`Mongoose connected ${conn.connection.host}`);
  } catch (error) {
    console.error(`error connecting to MongoDB ${error}`);
    process.exit(1);
  }
};
module.exports = connectDB;
