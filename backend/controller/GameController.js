const { validationResult } = require("express-validator");
const ApiError = require("../errors");
const gameService = require("../service/GameService");
const upgradeList = require("./UpgradeList.json");
const basicIndicators = require("./basicIndicators.json")
const GameService = require("../service/GameService");


class GameController {
  async type(req, res, next) {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return next(ApiError.badRequest(JSON.stringify(errors.mapped()))); 
      }
      const { userId, success, completeWord} = req.body;
      
      gameService.type(userId, success, completeWord);
      
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
      
      const { userId } = req.body;
      const { upgradeId } = req.body;
      gameService.buyUpgrade(userId, upgradeId);

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

      const { userId } = req.body;
      let result = gameService.getProfile(userId);
      
      result.then((profile) => {
        return res.json({profile})
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
      const users = await GameService.getBestUsersByWord();
      return res.json({
        users
      });
    } catch (e) {
      next(e);
    }
  }

  async getBestUsersByCoin(req, res, next) {
    try {
      const users = await GameService.getBestUsersByCoin();
      
      
      return res.json({
        users
      });
    } catch (e) {
      next(e);
    }
  }
  
  async getRatingPosition(req, res, next) {
    try {
      const users = await GameService.getBestUsersByCoin();
      
      return res.json({
        users
      });
    } catch (e) {
      next(e);
    }
  }

  async getBasicIndicators(req, res, next){
    try {
      return res.json(basicIndicators);
    } catch (e) {   
      next(e);
    } 
  }
}

module.exports = new GameController();
