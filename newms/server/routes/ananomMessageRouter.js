const router = require("express").Router();
const auth = require("../middleware/auth");
const ananomMessageCtrl = require("../controllers/ananomMessageCtrl");

router.post(
  "/create_ananomconversation",
  auth,
  ananomMessageCtrl.createConversation
);

router.get("/ananomconversations", auth, ananomMessageCtrl.getConversations);

// router.get("/message/:id", auth, messageCtrl.getMessages);

module.exports = router;
