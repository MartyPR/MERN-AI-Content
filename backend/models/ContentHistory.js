const mongoose = require("mongoose");

//schema
const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const ContentHistory = mongoose.model('History',historySchema);
module.exports=ContentHistory;
