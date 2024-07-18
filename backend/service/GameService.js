const { Profile, User } = require("../db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const ApiError = require("../errors");
const Profile_dto = require("../dto/profile_dto");
const tokenService = require("../service/TokenService");
const upgradeList = require("../controller/UpgradeList.json");
const basicIndicators = require("../controller/basicIndicators.json");

// Return userId from accessToken, only if user authorised
userIdFromAccessToken = (accessToken) => {
  const userData = tokenService.validateAccessToken(accessToken);
  return userData.id;
};

class GameService {
  async type(accessToken, success, completeWord) {
    const userId = userIdFromAccessToken(accessToken);
    const profile = await Profile.findOne({ where: { userId } });
    const oldCoinCount = profile.coinCount;
    if (success) {
      profile.coinCount +=
        basicIndicators["coinsPerLetter"] *
        upgradeList.upgrades[1].effect[
          profile.dataValues.upgrades.arr[1].level
        ];

      if (completeWord) {
        profile.wordCount++;
        profile.coinCount +=
          basicIndicators["coinsPerWord"] *
          upgradeList.upgrades[0].effect[
            profile.dataValues.upgrades.arr[0].level
          ];
      }
    } else {
      profile.coinCount -=
        basicIndicators["FailtureTax"] *
        upgradeList.upgrades[2].effect[
          profile.dataValues.upgrades.arr[2].level
        ];
      profile.coinCount = Math.max(profile.coinCount, 0);
    }
    profile.save();
    return {
      moneyChanging: profile.coinCount - oldCoinCount,
      coinCount: profile.coinCount,
      wordCount: profile.wordCount,
    };
  }

  async buyUpgrade(accessToken, upgradeId) {
    const userId = userIdFromAccessToken(accessToken);
    const profile = await Profile.findOne({ where: { userId } });
    profile.save;
    const upId = parseInt(upgradeId) - 1;

    if (
      profile.upgrades.arr[upId].level + 1 ==
      upgradeList.upgrades[upId].levels
    ) {
      throw ApiError.badRequest(
        "Уже приобретен максимальный уровень улучшения"
      );
    }

    if (
      profile.coinCount <
      upgradeList.upgrades[upId].costs[profile.upgrades.arr[upId].level + 1]
    ) {
      throw ApiError.badRequest("Недостаточно монет");
    }

    profile.coinCount -=
      upgradeList.upgrades[upId].costs[profile.upgrades.arr[upId].level + 1];

    profile.upgrades.arr[upId].level++;
    profile.changed("upgrades", true);
    profile.save();
  }

  async getProfile(accessToken) {
    const userId = userIdFromAccessToken(accessToken);
    const profile = await Profile.findOne({ where: { userId } });

    return profile.dataValues;
  }

  async getBestUsersByWord() {
    const arr = await Profile.findAll({});
    let users = [];
    for (const prof of arr) {
      const user = await User.findOne({
        where: { id: prof.dataValues.userId },
      });

      users.push({
        id: user.id,
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
  }
  async getBestUsersByCoin() {
    const arr = await Profile.findAll({});
    let users = [];
    for (const prof of arr) {
      const user = await User.findOne({
        where: { id: prof.dataValues.userId },
      });

      users.push({
        id: user.id,
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
  }

  async getRatingPosition(accessToken) {
    const id = userIdFromAccessToken(accessToken);

    const userName = (await User.findOne({ where: { id } })).name;

    const users = await this.getBestUsersByWord();
    let positionCoin = 0;
    let positionWord = 0;
    let i = 0;
    for (const user of users) {
      i++;
      if (user.name === userName) {
        positionWord = i;
        break;
      }
    }

    const users_2 = await this.getBestUsersByCoin();

    i = 0;
    for (const user of users_2) {
      i++;
      if (user.name === userName) {
        positionCoin = i;
        break;
      }
    }

    return { positionWord, positionCoin };
  }
}

module.exports = new GameService();
