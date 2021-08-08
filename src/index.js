import React from "react";
import ReactDOM from "react-dom";
import { generateMsg } from "./parity.js";
import "./index.css";

function NextStep(props) {
  const str = `Run step ${props}`;
  return <button>{str}</button>;
}

function Square(props) {
  let classes = `square ${props.classes}`;
  return <button className={classes}>{props.value}</button>;
}

class MessageBoard extends React.Component {
  renderSquare(i) {
    // what type of square is this?
    let classes = [];
    if (i === 0) {
      classes.push("zero");
    } else if ((Math.log(i) / Math.log(2)) % 1 === 0) {
      // is this a power of two? if so, mark it as a parity bit
      // ref. https://stackoverflow.com/questions/30924280/what-is-the-best-way-to-determine-if-a-given-number-is-a-power-of-two
      classes.push("parity");
    }
    // just leave the data blocks as they are

    return <Square classes={classes} value={this.props.msg[i]} key={i} />;
  }

  render() {
    const rowNum = Math.sqrt(this.props.squares.length);
    const colNum = rowNum;

    let domRows = [];

    let squareKey = 0;

    for (let i = 0; i < rowNum; i++) {
      let thisRow = [];
      for (let j = 0; j < colNum; j++) {
        thisRow.push(this.renderSquare(squareKey));
        squareKey += 1;
      }
      domRows.push(
        <div className="board-row" key={i}>
          {thisRow}
        </div>
      );
    }
    return <div>{domRows}</div>;
  }
}

/**
 * The hamming checker main app
 */
class Hamming extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(16).fill(null),
      step: 1,
      size: 4,
    };
  }

  render() {
    return (
      <div className="hamming">
        <div className="hamming-board">
          <MessageBoard
            squares={this.state.squares}
            msg={generateMsg(this.state.size)}
          />
        </div>
        <div className="hamming-info">
          <div>{NextStep(this.state.step)}</div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Hamming />, document.getElementById("root"));
