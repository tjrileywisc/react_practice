import React from "react";
import ReactDOM from "react-dom";
import {
  generateMsg,
  getBlock,
  getBlockIndexes,
  getBlockParity,
} from "./parity.js";
import "./index.css";

function NextStep(step) {
  const str = `Run step ${step}`;
  return <button>{str}</button>;
}

function CycleBlocks(blockNumber) {
  const str = `Get block ${blockNumber}`;
  return <button>{str}</button>;
}

function Square(props) {
  let classes = `square ${props.classes.join(" ")}`;
  return <button className={classes}>{props.value}</button>;
}

class MessageBoard extends React.Component {
  renderSquare(i, highlight, corrupted) {
    // what type of square is this?
    let classes = [];
    if (i === 0) {
      classes.push("zero");
    } else if ((Math.log(i) / Math.log(2)) % 1 === 0) {
      // is this a power of two? if so, mark it as a parity bit
      // ref. https://stackoverflow.com/questions/30924280/what-is-the-best-way-to-determine-if-a-given-number-is-a-power-of-two
      classes.push("parity");
    }

    if (highlight) classes.push("highlighted");

    if (corrupted) classes.push("corrupted");
    // just leave the data blocks as they are

    return (
      <Square
        classes={classes}
        value={this.props.msg[i]}
        key={i}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  highlightBlock(i) {
    const indexes = getBlockIndexes(this.props.msg, this.props.activeBlock);

    return indexes.includes(i);
  }

  render() {
    const rowNum = Math.sqrt(this.props.squares.length);
    const colNum = rowNum;

    let domRows = [];

    let squareKey = 0;

    for (let i = 0; i < rowNum; i++) {
      let thisRow = [];
      for (let j = 0; j < colNum; j++) {
        const highlight =
          this.props.activeBlock === 0 ? this.highlightBlock(i) : false;
        const corrupted = this.props.corruptedSquares.includes(i) ? true : false;
        thisRow.push(this.renderSquare(squareKey, highlight, corrupted));
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
      nextStep: 1,
      size: 4,
      activeBlock: 0,
      corruptedSquares: [],
    };
  }

  corruptSquare(i) {
    let current = this.state.squares;
    current[i] = !current[i];
    let currentCorrupted = this.state.corruptedSquares;
    if(currentCorrupted.includes(i)) {
      currentCorrupted.filter((value, index) => index !== i);
    } else {
      currentCorrupted.push(i);
    }
    this.setState({
      squares: current,
      corruptedSquares: currentCorrupted,
    });
  }

  render() {
    return (
      <div className="hamming">
        <div className="hamming-board">
          <MessageBoard
            squares={this.state.squares}
            activeBlock={this.state.activeBlock}
            msg={generateMsg(this.state.size)}
            onClick={(i) => this.corruptSquare(i)}
            corruptedSquares={this.state.corruptedSquares}
          />
        </div>
        <div className="hamming-info">
          <div>{NextStep(this.state.nextStep)}</div>
          <div>{CycleBlocks(this.state.activeBlock)}</div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Hamming />, document.getElementById("root"));
