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
      curWordIdx: 0,
      score: 0,
      wordCount: 0,
      notes: [],
    };
    this.words = this.getWords();
  }

  // TODO: Запрос на сервер
  getWords = () => {
    return ["hello", "world", "bye"];
  };

  getWord = () => {
    if (this.state.curWordIdx === this.words.length) {
      this.setState((state) => ({
        curWordIdx: 0,
      }));
      this.words = this.getWords();
      return this.words[0];
    }

    return this.words[this.state.curWordIdx];
  };

  wordComplete = () => {
    const wordCompleteScore = 100;

    this.setState((state) => ({
      curWordIdx: state.curWordIdx + 1,
      score: state.score + wordCompleteScore,
      wordCount: state.wordCount + 1,
      notes: [
        ...state.notes,
        <div className="note">
          <Note score={wordCompleteScore} />
        </div>,
      ],
    }));
  };

  charComplete = (success) => {
    const charCompleteScore = 10;
    const scoreChange = success ? charCompleteScore : -charCompleteScore;

    this.setState((state) => ({
      notes: [
        ...state.notes,
        <div className="note">
          <Note score={scoreChange} />
        </div>,
      ],
      score: state.score + scoreChange,
    }));
  };

  render = () => {
    return (
      <div className="d-flex">
        <div className="d-flex flex-column ms-5">
          <Coins quantity={this.state.score} />
          <Words quantity={this.state.wordCount} />
        </div>

        <div className="d-flex flex-column mx-auto mt-5">
          <Word
            text={this.getWord()}
            onComplete={this.wordComplete}
            onCharComplete={this.charComplete}
          />
          <div className="d-flex justify-content-center">
            {this.state.notes}
          </div>
        </div>
      </div>
    );
  };
}
