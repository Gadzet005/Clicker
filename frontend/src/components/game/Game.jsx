import React from "react";
import "./game.css";
import { Word } from "./Word";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curWordIdx: 0,
      score: 0,
      wordCount: 0,
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

  toNextWord = () => {
    this.setState((state) => ({
      curWordIdx: state.curWordIdx + 1,
      score: state.score + 100,
      wordCount: state.wordCount + 1,
    }));
  };

  render = () => {
    return (
      <div className="grid">
        <div className="d-flex flex-column">
          <p className="d-flex justify-content-center">
            Счет: {this.state.score}
          </p>
          <p className="d-flex justify-content-center">
            Слов напечатано: {this.state.wordCount}
          </p>
        </div>
        <div className="d-flex justify-content-center mt-5">
          <div className="word fw-bold">
            <Word text={this.getWord()} onComplete={this.toNextWord} />
          </div>
        </div>
      </div>
    );
  };
}
