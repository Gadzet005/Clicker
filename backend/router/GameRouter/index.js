const express = require("express");
const { body } = require("express-validator");
const gameController = require("../../controller/GameController.js");
const authMiddleware = require("../../middleware/authMiddleware.js");
const { getRatingPosition } = require("../../controller/GameController.js");
const router = express.Router();

router.post(
  "/type",
  //authMiddleware,
  body("success").isBoolean(),
  body("completeWord").isBoolean(),
  gameController.type
);

router.post(
  "/buyUpgrade",
  //authMiddleware,
  body("upgradeId").isString(),
  gameController.buyUpgrade
);

router.get(
  "/getProfile",
  //authMiddleware,
  gameController.getProfile
);

router.get( ///
    "/getRatingPosition",
    //authMiddleware,
    getRatingPosition
  );

router.get("/getAllUpgrades", gameController.getAllUpgrades);

router.get("/getBasicIndicators", gameController.getBasicIndicators);


router.get("/getBestUsersByWord", gameController.getBestUsersByWord);

router.get("/getBestUsersByCoin", gameController.getBestUsersByCoin);



module.exports = router;
