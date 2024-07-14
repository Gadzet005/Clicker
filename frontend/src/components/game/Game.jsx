import React from "react";
import "./game.css";
import { Word } from "./Word";
import { Note } from "./Note";
import { Coins } from "../common/Coins";
import { Words } from "../common/Words";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: 0,
      words: 0,

      notes: [],

      wordList: [],
      curWordIdx: 0,
    };

    this.noteId = 0;
  }

  // TODO: Запрос на сервер
  getNewWordList = () => {
    return ["hello", "world", "bye"];
  };

  updateWordList = () => {
    this.setState((state) => ({
      wordList: this.getNewWordList(),
      curWordIdx: 0,
    }));
  };

  getWord = () => {
    if (this.state.curWordIdx >= this.state.wordList.length) {
      return null;
    }
    return this.state.wordList[this.state.curWordIdx];
  };

  changeCoins(value) {
    this.setState((state) => ({
      coins: state.coins + value,
      notes: [...state.notes, <Note key={this.noteId} value={value} />],
    }));
    this.noteId++;
  }

  wordEnteredHandler = () => {
    const coinsByWord = 100;

    this.changeCoins(coinsByWord);
    this.setState((state) => ({
      curWordIdx: state.curWordIdx + 1,
      words: state.words + 1,
    }));

    if (this.state.curWordIdx + 1 === this.state.wordList.length) {
      this.updateWordList();
    }
  };

  letterEnteredHandler = (success) => {
    const coinsByLetterSuccess = 10;
    const coinsByLetterFailure = -50;

    const value = success ? coinsByLetterSuccess : coinsByLetterFailure;
    this.changeCoins(value);
  };

  componentDidMount = () => {
    this.updateWordList();
  };

  render = () => {
    return (
      <div className="d-flex">
        <div className="d-flex flex-column ms-5">
          <Coins value={this.state.coins} />
          <Words value={this.state.words} />
        </div>

        <div className="d-flex flex-column mx-auto mt-5">
          <Word
            text={this.getWord()}
            onWordEntered={this.wordEnteredHandler}
            onLetterEntered={this.letterEnteredHandler}
          />
          <div className="d-flex justify-content-center">
            {this.state.notes}
          </div>
        </div>
      </div>
    );
  };
}
