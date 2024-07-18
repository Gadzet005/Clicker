const { validationResult } = require("express-validator");
const ApiError = require("../errors");
const gameService = require("../service/GameService");
const upgradeList = require("./UpgradeList.json");
const basicIndicators = require("./basicIndicators.json");
const GameService = require("../service/GameService");

// Return accessToken from request, only if user authorised
accessTokenFromReq = (req) => {
  const authorizationHeader = req.headers.authorization;

  const accessToken = authorizationHeader.split(" ")[1];

  return accessToken;
};

class GameController {
  async type(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest(JSON.stringify(errors.mapped())));
      }
      const accessToken = accessTokenFromReq(req);
      const { success, completeWord } = req.body;

      const { moneyChanging, coinCount, wordCount } = await gameService.type(
        accessToken,
        success,
        completeWord
      );

      return res.status(200).json({
        moneyChanging,
        coinCount,
        wordCount,
      });
    } catch (e) {
      next(e);
    }
  }

  async buyUpgrade(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest(JSON.stringify(errors.mapped())));
      }
      const accessToken = accessTokenFromReq(req);
      const { upgradeId } = req.body;
      await gameService.buyUpgrade(accessToken, upgradeId);

      return res.status(200).end();
    } catch (e) {
      next(e);
    }
  }

  async getProfile(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest(JSON.stringify(errors.mapped())));
      }

      const accessToken = accessTokenFromReq(req);

      let result = gameService.getProfile(accessToken);

      result.then((profile) => {
        return res.json({ profile });
      });
    } catch (e) {
      next(e);
    }
  }

  async getAllUpgrades(req, res, next) {
    try {
      return res.json(upgradeList);
    } catch (e) {
      next(e);
    }
  }

  async getBestUsersByWord(req, res, next) {
    try {
      const users = await GameService.getBestUsersByWord();
      return res.json({
        users,
      });
    } catch (e) {
      next(e);
    }
  }

  async getBestUsersByCoin(req, res, next) {
    try {
      const users = await GameService.getBestUsersByCoin();

      return res.json({
        users,
      });
    } catch (e) {
      next(e);
    }
  }

  async getRatingPosition(req, res, next) {
    try {
      const accessToken = accessTokenFromReq(req);
      const { positionWord, positionCoin } =
        await GameService.getRatingPosition(accessToken);
      return res.json({
        positionWord,
        positionCoin,
      });
    } catch (e) {
      next(e);
    }
  }

  async getBasicIndicators(req, res, next) {
    try {
      return res.json(basicIndicators);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new GameController();
