const Users = require("../models/userModel");
const MatchRequest = require("../models/matchRequestsModel");
const Conversations = require("../models/conversationModel");

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

const MatchRequestCtrl = {
  createMatchRequest: async (req, res) => {
    try {
      const { sender, receiver } = req.body;
      //   const existingMatchRequest = await MatchRequest.findOne({
      //     sender,
      //     receiver,
      //   });
      // console.log(existingMatchRequest);
      //   if (existingMatchRequest) {
      //     return res.status(500).json({
      //       msg: "You have already requested the match with this user.",
      //     });
      //   }
      // if (receiver === req.user._id) {
      //   const receivedMatchRequest = await MatchRequest.findOne({
      //     sender: receiver,
      //     receiver: sender,
      //   });
      //   if (receivedMatchRequest) {
      //     await Users.findOneAndUpdate(
      //       { _id: sender },
      //       { $push: { matches: receiver } },
      //       { new: true }
      //     );
      //     await Users.findOneAndUpdate(
      //       { _id: receiver },
      //       { $push: { matches: sender } },
      //       { new: true }
      //     );
      //     await MatchRequest.findByIdAndDelete(receivedMatchRequest._id);
      //     return res.status(200).json({
      //       msg: "whooray, you are a match.",
      //     });
      //   }
      // }
      const newMatchRequest = await new MatchRequest({
        sender,
        receiver,
      }).save();
      console.log(newMatchRequest);

      return res.json({ msg: "Match Request has been sent" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },

  getSentMatchRequests: async (req, res) => {
    console.log(req.user);
    try {
      const features = new APIfeatures(
        MatchRequest.find({
          sender: req.user._id,
        }),
        req.query
      ).paginating();
      const matchRequests = await features.query.sort("-createdAt");
      return res.json({
        matchRequests,
        result: matchRequests.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getReceivedMatchRequests: async (req, res) => {
    console.log(req.user);
    try {
      const features = new APIfeatures(
        MatchRequest.find({
          receiver: req.user._id,
        }),
        req.query
      ).paginating();
      const matchRequests = await features.query.sort("-createdAt");
      return res.json({
        matchRequests,
        result: matchRequests.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getMatchRequestByUserIDs: async (req, res) => {
    const { sender, receiver } = req.query;
    console.log(sender, receiver)
    try {
      const matchRequest = await MatchRequest.findOne({
        sender,
        receiver,
      });
      if (matchRequest) {
        return res.json({
          matchRequest,
        });
      }
      return res
        .status(500)
        .json({ msg: "This connection Request does not exist anymore." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  

  getMatchRequestById: async (req, res) => {
    console.log(req.user);
    try {
      const matchRequest = await MatchRequest.findOne({
        _id: req.params.id,
      });
      if (matchRequest) {
        return res.json({
          matchRequest,
        });
      }
      return res
        .status(500)
        .json({ msg: "This connection Request does not exist anymore." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  AcceptMatchRequest: async (req, res) => {
    const { sender, receiver } = req.body;
    console.log(sender, receiver);
    try {
      // let matchRequest = await MatchRequest.findOne({
      //   sender: sender,
      //   receiver: receiver
      // });
      // if (!matchRequest) {
      //    matchRequest = await MatchRequest.findOne({
      //      sender: receiver,
      //      receiver: sender,
      //    });
      // }
        // if (matchRequest) {
          await Users.findOneAndUpdate(
            { _id: sender },
            { $push: { matches: receiver } },
            { new: true }
          );
          await Users.findOneAndUpdate(
            { _id: receiver },
            { $push: { matches: sender } },
            { new: true }
      );
      const conversation = new Conversations({
        recipients: [sender, receiver],
      });
      await conversation.save();
          return res.status(200).json({
            msg: "whooray, you are a match.",
          });
        // }
      // return res
      //   .status(500)
      //   .json({ msg: "This connection Request does not exist anymore." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  RejectMatchRequest: async (req, res) => {
    try {
      const matchRequest = await MatchRequest.findOne({
        _id: req.body.id,
      });
      if (matchRequest) {
        await MatchRequest.findByIdAndDelete(matchRequest._id);
        return res.status(200).json({
          msg: "Match declined. User can again send you connection request later.",
        });
      }
      return res
        .status(500)
        .json({ msg: "This connection Request does not exist anymore." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = MatchRequestCtrl;
