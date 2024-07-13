import React from "react";
import "./game.css";
import { Word } from "./Word";
import { Note } from "./Note";

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
      <div>
        <div className="d-flex flex-column">
          <p className="d-flex justify-content-center fs-1">
            Счет: {this.state.score}
          </p>
          <p className="d-flex justify-content-center fs-1">
            Слов напечатано: {this.state.wordCount}
          </p>
        </div>

        <div className="d-flex justify-content-center mt-5">
          <Word
            text={this.getWord()}
            onComplete={this.wordComplete}
            onCharComplete={this.charComplete}
          />
        </div>
        <div className="d-flex justify-content-center mt-5">
          {this.state.notes}
        </div>
      </div>
    );
  };
}
