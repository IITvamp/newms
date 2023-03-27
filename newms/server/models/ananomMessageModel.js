const mongoose = require("mongoose");
const { Schema } = mongoose;

const ananomMessageSchema = new Schema(
  {
    conversation: { type: mongoose.Types.ObjectId, ref: "ananomconversation" },
    sender: { type: mongoose.Types.ObjectId, ref: "user" },
    recipient: { type: mongoose.Types.ObjectId, ref: "user" },
    text: String,
    media: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ananommessage", ananomMessageSchema);
