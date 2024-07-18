const { Profile, User } = require("../db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const ApiError = require("../errors");
const Profile_dto = require("../dto/profile_dto");
const tokenService = require("../service/TokenService");
const upgradeList = require("../controller/UpgradeList.json");

// Return userId from accessToken, only if user authorised
userIdFromAccessToken = (accessToken) => {
  const userData = tokenService.validateAccessToken(accessToken);
  return userData.id;
};

class GameService {
  async type(accessToken, success, completeWord) {
    try {
      const userId = userIdFromAccessToken(accessToken);
      const profile = await Profile.findOne({ where: { userId } });
      const oldCoinCount = profile.coinCount;
      if (success) {
        profile.coinCount +=
          upgradeList.upgrades[1].effect[
            profile.dataValues.upgrades.arr[1].level
          ];

        if (completeWord) {
          profile.wordCount++;
          profile.coinCount +=
            upgradeList.upgrades[0].effect[
              profile.dataValues.upgrades.arr[0].level
            ];
        }
      } else {
        profile.coinCount -=
          upgradeList.upgrades[2].effect[
            profile.dataValues.upgrades.arr[2].level
          ];
      }
      profile.save();
      return {
        "moneyChanging": profile.coinCount - oldCoinCount,
        "coinCount": profile.coinCount,
        "wordCount": profile.wordCount
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async buyUpgrade(accessToken, upgradeId) {
    try {
      const userId = userIdFromAccessToken(accessToken);
      const profile = await Profile.findOne({ where: { userId } });
      profile.save;
      const upId = parseInt(upgradeId) - 1;

      if (
        profile.upgrades.arr[upId].level + 1 ==
        upgradeList.upgrades[upId].levels
      ) {
        throw new Error("Уже приобретен максимальный уровень улучшения");
      }

      if (
        profile.coinCount <
        upgradeList.upgrades[upId].costs[profile.upgrades.arr[upId].level + 1]
      ) {
        throw new Error("Недостаточно монет");
      }

      profile.coinCount -=
        upgradeList.upgrades[upId].costs[profile.upgrades.arr[upId].level + 1];

      profile.upgrades.arr[upId].level++;
      profile.changed("upgrades", true);
      profile.save();
    } catch (e) {
      throw new Error(e);
    }
  }
  async getProfile(accessToken) {
    try {
      const userId = userIdFromAccessToken(accessToken);
      const profile = await Profile.findOne({ where: { userId } });

      return profile.dataValues;
    } catch (e) {
      throw new Error(e);
    }
  }
  async getBestUsersByWord() {
    try {
      const arr = await Profile.findAll({});
      let users = [];
      for (const prof of arr) {
        const user = await User.findOne({
          where: { id: prof.dataValues.userId },
        });

        users.push({
          name: user.name,
          wordCount: prof.dataValues.wordCount,
        });
      }

      users.sort((a, b) => {
        if (a.wordCount > b.wordCount) {
          return -1;
        }
        if (a.wordCount < b.wordCount) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      return users;
    } catch (e) {
      throw new Error(e);
    }
  }
  async getBestUsersByCoin() {
    try {
      const arr = await Profile.findAll({});
      let users = [];
      for (const prof of arr) {
        const user = await User.findOne({
          where: { id: prof.dataValues.userId },
        });

        users.push({
          name: user.name,
          coinCount: prof.dataValues.coinCount,
        });
      }

      users.sort((a, b) => {
        if (a.coinCount > b.coinCount) {
          return -1;
        }
        if (a.coinCount < b.coinCount) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      return users;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getRatingPosition(accessToken) {
    try {
      const userId = userIdFromAccessToken(accessToken);
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = new GameService();
