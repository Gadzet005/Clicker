const { Profile } = require("../db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const ApiError = require("../errors");
const Profile_dto = require("../dto/profile_dto");
const tokenService = require("../service/TokenService");
const upgradeList = require("../controller/UpgradeList.json");

class GameService {
  async type(userId, success, completeWord) {
    try {
      

      const profile = await Profile.findOne({ where: { userId } });

      

      if (success) {
        profile.coinCount +=
          upgradeList.upgrades[1].effect[profile.dataValues.upgrades[1].level];

        if (completeWord) {
          profile.wordCount++;
          profile.coinCount +=
            upgradeList.upgrades[0].effect[
              profile.dataValues.upgrades[0].level
            ];
            
        }
      } else {
        profile.coinCount -=
          upgradeList.upgrades[2].effect[profile.dataValues.upgrades[2].level];
      }
      profile.save();
    } catch (e) {
      throw new Error(e);
    }
  }

  async buyUpgrade(userId, upgradeId) {
    try {
        const profile = await Profile.findOne({ where: { userId } });
    } catch (e) {
      throw new Error(e);
    }
  }
  async getProfile(userId) {
    try {
        const profile = await Profile.findOne({ where: { userId } });
        
        return profile.dataValues
    } catch (e) {
      throw new Error(e);
    }
  }
  async getBestUsersByWord() {
    try {
        
      const tmp = Profile.findAll({});
      //console.log(tmp);
      tmp.then((arr) => {
        console.log(arr);
        for(const prof of arr){
            prof.dataValues.wordCount;
            
        }
      })
      
      
    } catch (e) {
      throw new Error(e);
    }
  }
  async getBestUsersByCoin() {
    try {
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = new GameService();
