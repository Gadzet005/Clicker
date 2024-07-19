import React from "react";
import "./game.css";
import { Word } from "./Word";
import { Note } from "./Note";
import { Coins } from "../common/Coins";
import { Words } from "../common/Words";
import { store } from "../../store";
import { setProfileAction } from "../../store/userReducers";
import { getWords, type } from "../../api/gameApi";

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

  typeHandler = (success, completeWord) => {
    type(success, completeWord).then(
      ({ moneyChanging, coinCount, wordCount }) => {
        store.dispatch(
          setProfileAction({ coins: coinCount, words: wordCount })
        );
        this.setState((state) => ({
          notes: [
            ...state.notes,
            <Note key={this.noteId} value={moneyChanging} />,
          ],
        }));
        this.noteId++;
      }
    );
  };

  wordEnteredHandler = () => {
    this.typeHandler(true, true);

    this.setState((state) => ({
      curWordIdx: state.curWordIdx + 1,
    }));

    if (this.state.curWordIdx + 1 === this.state.wordList.length) {
      this.updateWordList();
    }
  };

  letterEnteredHandler = (success) => {
    this.typeHandler(success, false);
  };

  componentDidMount = () => {
    this.updateWordList();
  };

  render = () => {
    return (
      <div className="row h-100">
        <div className="col-2 ps-5">
          <Coins value={this.state.coins} />
          <Words value={this.state.words} />
        </div>

        <div className="col-8 h-75 d-flex justify-content-center align-items-center">
          <div>
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
      </div>
    );
  };
}
