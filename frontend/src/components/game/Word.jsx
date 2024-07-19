import React from "react";

export class Word extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curLetterIdx: 0,
      lastWasWrong: false,
    };
  }

  keyDown = (event) => {
    if (!this.props.text || event.key.length > 1) {
      return;
    }

    const word = this.props.text;
    const expected = word.charAt(this.state.curLetterIdx);

    if (event.code === "Key" + expected.toUpperCase()) {
      if (this.state.curLetterIdx + 1 === word.length) {
        this.props.onWordEntered();
        this.setState((state) => ({
          curLetterIdx: 0,
          lastWasWrong: false,
        }));
      } else {
        this.props.onLetterEntered(true);
        this.setState((state) => ({
          curLetterIdx: state.curLetterIdx + 1,
          lastWasWrong: false,
        }));
      }
    } else {
      this.props.onLetterEntered(false);
      this.setState((state) => ({
        lastWasWrong: true,
      }));
    }
  };

  componentDidMount = () => {
    document.addEventListener("keydown", this.keyDown);
  };

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.keyDown);
  };

  getLetterStyleClass = (idx) => {
    const common = "d-inline fw-bold";
    if (idx === this.state.curLetterIdx && this.state.lastWasWrong) {
      return common + " text-danger big-word";
    } else if (idx === this.state.curLetterIdx) {
      return common + " text-primary big-word";
    } else if (idx < this.state.curLetterIdx) {
      return common + " text-success word";
    } else {
      return common + " text-secondary word";
    }
  };

  render = () => {
    if (!this.props.text) {
      return null;
    }

    let letters = [];
    for (let i = 0; i < this.props.text.length; i++) {
      let styleClass = this.getLetterStyleClass(i);
      letters.push(
        <p key={i} className={styleClass}>
          {this.props.text.charAt(i)}
        </p>
      );
    }

    return <div>{letters}</div>;
  };
}
