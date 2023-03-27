const mongoose = require("mongoose");
const { Schema } = mongoose;

const SavedAnanomConversationSchema = new Schema(
  {
    owner: { type: mongoose.Types.ObjectId, ref: "user" },
    text: {
      type: String,
      default: "",
    },
    media: {
      type: Array,
      default: [],
    },
    messages: [
      Schema({
        sender: { type: mongoose.Types.ObjectId, ref: "user" },
        receiverId: { type: mongoose.Types.ObjectId, ref: "user" },
        text: String,
        media: Array,
        createdAt: String,
      }),
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "savedAnanomconversation",
  SavedAnanomConversationSchema
);
