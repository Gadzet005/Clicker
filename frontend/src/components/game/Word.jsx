import React from "react";
import "./game.css";

export class Word extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curCharIdx: 0,
    };

    document.addEventListener("keydown", this.keyDown);
  }

  keyDown = (event) => {
    const word = this.props.text;
    const expected = word.charAt(this.state.curCharIdx);

    if (event.key === expected) {
      if (this.state.curCharIdx + 1 === word.length) {
        this.setState((state) => ({
          curCharIdx: 0,
        }));
        this.props.onComplete();
      } else {
        this.setState((state) => ({
          curCharIdx: state.curCharIdx + 1,
        }));
      }
    }
  };

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.keyDown);
  };

  render = () => {
    let letters = [];
    for (let i = 0; i < this.props.text.length; i++) {
      let className = "d-inline";
      if (i < this.state.curCharIdx) {
        className += " text-danger";
      }
      letters.push(
        <p key={i} className={className}>
          {this.props.text.charAt(i)}
        </p>
      );
    }

    return <div className="word fw-bold">{letters}</div>;
  };
}
