const Conversations = require("../models/conversationModel");
// const Messages = require("../models/messageModel");
const savedAnanomConversation = require("../models/savedAnanomConversationModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const ananomMessageCtrl = {
  createConversation: async (req, res) => {
    try {
      const { messages } = req.body;
      // console.log(messages, "here");
      if (messages.length === 0) return;

    //   const newConversation = await Conversations.findOneAndUpdate(
    //     {
    //       $or: [
    //         { recipients: [req.user._id, recipient] },
    //         { recipients: [recipient, req.user._id] },
    //       ],
    //     },
    //     {
    //       recipients: [req.user._id, recipient],
    //       text,
    //       media,
    //     },
    //     { new: true, upsert: true }
    //   );
        
        const newConversation = await new savedAnanomConversation({
            owner: req.user._id,
            messages,
        }).save();
      // console.log(newConversation)
    //   const newMessage = new Messages({
    //     conversation: newConversation._id,
    //     sender: req.user._id,
    //     recipient,
    //     text,
    //     media,
    //   });

    //   await newMessage.save();

      return res.json({ msg: "Saved." });
    } catch (err) {
      // console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },

  getConversations: async (req, res) => {
    // console.log(req.user)
    try {
      const features = new APIfeatures(
        savedAnanomConversation.find({
          owner: req.user._id,
        }),
        req.query
      ).paginating();

      const ananomconversations = await features.query
        .sort("-createdAt")
      // console.log(ananomconversations);
      return res.json({
        ananomconversations,
        result: ananomconversations.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

//   getMessages: async (req, res) => {
//     try {
//       const features = new APIfeatures(
//         Messages.find({
//           $or: [
//             { sender: req.user._id, recipient: req.params.id },
//             { sender: req.params.id, recipient: req.user._id },
//           ],
//         }),
//         req.query
//       ).paginating();

//       const messages = await features.query.sort("-createdAt");

//       res.json({
//         messages,
//         result: messages.length,
//       });
//     } catch (err) {
//       return res.status(500).json({ msg: err.message });
//     }
//   },
};

module.exports = ananomMessageCtrl;
