const { SortWords } = require("../service/WordService/WordGetterService.js");
const { validationResult } = require("express-validator");
const ApiError = require("../errors");

class WordGetterController {
  wordsList;

  constructor() {
    this.wordsList = SortWords();
  }

  /*
    expects:
    req.body.wordAmount (amount of words to get) < 1e5
    req.body.maxWordHardness double [0, 1]
    return:
    res(body) = {words:[]string}
    */
  getNRandomWords = (amount, maxIndex) => {
    let toRet = new Array(amount);
    for (let i = 0; i < amount; i++) {
      toRet[i] = this.wordsList[Math.floor(Math.random() * maxIndex)];
    }
    return toRet;
  };

  GetWords = async (req, resp, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return next(ApiError.badRequest(JSON.stringify(errors.mapped())));

      const { wordAmount, maxWordHardness } = req.query;
      resp.json({
        words: this.getNRandomWords(
          wordAmount,
          Math.floor(maxWordHardness * this.wordsList.length)
        ),
      });
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = { WordGetterController: new WordGetterController() };
