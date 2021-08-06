import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

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

    for(let i = 0; i < rowNum; i++) {
      let thisRow = [];
      for(let j = 0; j < colNum; j++) {
        thisRow.push(this.renderSquare(i + j));
      }
      domRows.push(<div className="board-row" key={i}>{thisRow}</div>);
    }
    return (
      <div>{domRows}</div>
    );
  }
}

/**
 * The hamming checker main app
 */
class Hamming extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares : Array(16).fill(null),
    };
  }

  render() {
    return (
      <div className="hamming">
        <div className="hamming-board">
          <MessageBoard
            squares={this.state.squares}
          />
        </div>
        <div className="hamming-info">
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Hamming />, document.getElementById("root"));
