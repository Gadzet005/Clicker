import React from "react";
import "./game.css";
import { Word } from "./Word";
import { Note } from "./Note";
import { Coins } from "../common/Coins";
import { Words } from "../common/Words";
import { store } from "../../store";
import { changeCoinsAction, changeWordsAction } from "../../store/userReducers";
import { getWords } from "../../api/gameApi";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: store.getState().user.profile.coins,
      words: store.getState().user.profile.words,

      notes: [],

      wordList: [],
      curWordIdx: 0,
    };

    store.subscribe(() => {
      this.setState({
        coins: store.getState().user.profile.coins,
        words: store.getState().user.profile.words,
      });
    });

    this.noteId = 0;
  }

  // TODO: Запрос на сервер
  getNewWordList = () => {
    getWords(100, 0.1).then((words) => {
      this.setState({ wordList: words });
    });
  };

  updateWordList = () => {
    this.getNewWordList();
    this.setState((state) => ({
      curWordIdx: 0,
    }));
  };

  getWord = () => {
    if (this.state.curWordIdx >= this.state.wordList.length) {
      return null;
    }
    return this.state.wordList[this.state.curWordIdx];
  };

  changeCoins = (value) => {
    store.dispatch(changeCoinsAction({ coins: value }));

    this.setState((state) => ({
      notes: [...state.notes, <Note key={this.noteId} value={value} />],
    }));
    this.noteId++;
  };

  changeWords = (value) => {
    store.dispatch(changeWordsAction({ words: value }));
  };

  wordEnteredHandler = () => {
    const coinsByWord = 100;

    this.changeCoins(coinsByWord);
    this.changeWords(1);
    this.setState((state) => ({
      curWordIdx: state.curWordIdx + 1,
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
