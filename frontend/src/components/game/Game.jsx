import React from "react";
import "./game.css";
import { Word } from "./Word";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curWordIdx: 0,
      score: 0,
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
    }));
  };

  render = () => {
    return (
      <div className="grid">
        <div className="center-block">
          <p className="m-5">Score: {this.state.score}</p>
        </div>
        <div className="center-block">
          <div className="word fw-bold">
            <Word text={this.getWord()} onComplete={this.toNextWord} />
          </div>
        </div>
      </div>
    );
  };
}
