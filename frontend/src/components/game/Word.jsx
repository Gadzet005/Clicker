import React from "react";

export class Word extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curCharIdx: 0,
      lastWasWrong: false,
    };
  }

  keyDown = (event) => {
    if (event.key.length > 1) {
      return;
    }

    const word = this.props.text;
    const expected = word.charAt(this.state.curCharIdx);

    if (event.key === expected) {
      if (this.state.curCharIdx + 1 === word.length) {
        this.props.onComplete();
        this.setState((state) => ({
          curCharIdx: 0,
          lastWasWrong: false,
        }));
      } else {
        this.props.onCharComplete(true);
        this.setState((state) => ({
          curCharIdx: state.curCharIdx + 1,
          lastWasWrong: false,
        }));
      }
    } else {
      this.props.onCharComplete(false);
      this.setState({
        lastWasWrong: true,
      });
    }
  };

  componentDidMount = () => {
    document.addEventListener("keydown", this.keyDown);
  };

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.keyDown);
  };

  getLetterClass = (idx) => {
    if (idx === this.state.curCharIdx && this.state.lastWasWrong) {
      return "d-inline fw-bold text-danger big-word";
    } else if (idx === this.state.curCharIdx) {
      return "d-inline fw-bold text-primary big-word";
    } else if (idx < this.state.curCharIdx) {
      return "d-inline fw-bold text-success word";
    } else {
      return "d-inline fw-bold text-secondary word";
    }
  };

  render = () => {
    let letters = [];
    for (let i = 0; i < this.props.text.length; i++) {
      let className = this.getLetterClass(i);
      letters.push(
        <p key={i} className={className}>
          {this.props.text.charAt(i)}
        </p>
      );
    }

    return <div>{letters}</div>;
  };
}
