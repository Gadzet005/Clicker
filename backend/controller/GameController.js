const { validationResult } = require("express-validator");
const ApiError = require("../errors");
const gameService = require("../service/GameService");
const upgradeList = require("UpgradeList.json");
const GameService = require("../service/GameService");

class GameController {
  async type(req, res, next) {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return next(ApiError.badRequest(JSON.stringify(errors.mapped()))); 
      }

      const { accessToken, success, completeWord} = req.body;
      gameService.type(accessToken, success, completeWord);
      
      return res.status(200).end();
    
    } catch (e) {
      next(e);
    }
  }

  async buyUpgrade(req, res, next) {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return next(ApiError.badRequest(JSON.stringify(errors.mapped()))); 
      }

      const { upgradeId, accessToken } = req.body;
      gameService.buyUpgrade(accessToken, upgradeId);

      return res.status(200).end();

    } catch (e) {
      next(e);
    }
  }

  async getProfile(req, res, next) {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return next(ApiError.badRequest(JSON.stringify(errors.mapped()))); 
      }

      const { accessToken } = req.body;
      const { profile} = gameService.getProfile(accessToken);
      return res.json({
        profile
      })
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
      const { users } = GameService.getBestUsersByWord();
      return res.json({
        users
      });
    } catch (e) {
      next(e);
    }
  }

  async getBestUsersByCoin(req, res, next) {
    try {
      const { users } = GameService.getBestUsersByCoin();
      return res.json({
        users
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new GameController();
