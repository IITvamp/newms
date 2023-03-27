const mongoose = require("mongoose");
const { Schema } = mongoose;

const AnanomConversationSchema = new Schema(
  {
    recipients: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    text: String,
    media: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ananomconversation", AnanomConversationSchema);
