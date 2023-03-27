const mongoose = require("mongoose");
const { Schema } = mongoose;

const matchRequestSchema = new Schema(
  {
    receiver: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("matchRequest", matchRequestSchema);
