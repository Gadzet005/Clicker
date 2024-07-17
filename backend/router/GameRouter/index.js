const express = require("express");
const { body } = require("express-validator");
const gameController = require("../../controller/GameController.js");
const authMiddleware = require("../../middleware/authMiddleware.js");
const { getRatingPosition } = require("../../controller/GameController.js");
const router = express.Router();

router.post(
  "/type",
  //authMiddleware,
  body("userId").isString(),
  body("success").isBoolean(),
  body("completeWord").isBoolean(),
  gameController.type
);

router.post(
  "/getProfile",
  //authMiddleware,
  body("userId").isString(),
  gameController.getProfile
);

router.post(
  "/buyUpgrade",
  //authMiddleware,
  body("upgradeId").isString(),
  gameController.buyUpgrade
);

router.post( ///
    "/getRatingPosition",
    //authMiddleware,
    body("userId").isString(),
    getRatingPosition
  );

router.get("/getAllUpgrades", gameController.getAllUpgrades);

router.get("/getBasicIndicators", gameController.getBasicIndicators);


router.get("/getBestUsersByWord", gameController.getBestUsersByWord);

router.get("/getBestUsersByCoin", gameController.getBestUsersByCoin);



module.exports = router;
