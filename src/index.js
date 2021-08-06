import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function NextStep(props) {
  const str = `Run step ${props}`;
  return <button>{str}</button>;
}

function Square(props) {
  return <button className="square">{props.value}</button>;
}

class MessageBoard extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.squares[i]} key={i} />;
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
    };
  }

  render() {
    return (
      <div className="hamming">
        <div className="hamming-board">
          <MessageBoard squares={this.state.squares} />
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
