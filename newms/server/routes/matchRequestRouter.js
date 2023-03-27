const router = require("express").Router();
const auth = require("../middleware/auth");
const matchRequestCtrl = require("../controllers/matchRequestCtrl");

router.post("/createrequest", auth, matchRequestCtrl.createMatchRequest);

router.get("/sentrequests", auth, matchRequestCtrl.getSentMatchRequests);

router.get(
  "/receivedrequests",
  auth,
  matchRequestCtrl.getReceivedMatchRequests
);

router.get("/request/:id", auth, matchRequestCtrl.getMatchRequestById);

router.get("/request", auth, matchRequestCtrl.getMatchRequestByUserIDs);

router.post("/acceptrequest", auth, matchRequestCtrl.AcceptMatchRequest);

router.post("/rejectrequest", auth, matchRequestCtrl.RejectMatchRequest);

module.exports = router;
