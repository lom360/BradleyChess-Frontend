import React from "react";
import {render} from "react-dom";
import {ChessBoard} from "react-fen-chess-board";

import { useRef, useState } from 'react';
import Chess from 'chess.js';

import { Chessboard } from "react-chessboard";
// import  Chessboard  from 'react-chessboard';
import IdleTimer from 'react-idle-timer';
// import React from "react";

// const chess = new Chess();

// export class FenBoard extends React.Component {
// 	constructor(props) {
// 		super(props)
// 	}


//     render() {
//         return (
//             <div>
//               <Chessboard
//                 id="ClickToMove"
//                 width={400}
//                 animationDuration={1000}
//                 arePiecesDraggable={false}
//                 position={this.props.fenString}
//               />
//             </div>
//           );
//     }

// }

// export default FenBoard


export default function ClickToMove({fenString, toSquare, fromSquare}) {
  const chessboardRef = useRef();
  const [game, setGame] = useState(new Chess());

  const [moveFrom, setMoveFrom] = useState('');
  const [boardOrientation, setBoardOrientation] = useState('black')
  const [rightClickedSquares, setRightClickedSquares] = useState({});
  const [moveSquares, setMoveSquares] = useState({});
  const [optionSquares, setOptionSquares] = useState({});

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function getMoveOptions(square) {
    const moves = game.moves({
      square,
      verbose: true
    });
    if (moves.length === 0) {
      return;
    }

    const newSquares = {};
    moves.map((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) && game.get(move.to).color !== game.get(square).color
            ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
            : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
        borderRadius: '50%'
      };
      return move;
    });
    newSquares[square] = {
      background: 'rgba(255, 255, 0, 0.4)'
    };
    setOptionSquares(newSquares);
  }


  function onSquareClick(square) {
    setRightClickedSquares({});

    function resetFirstMove(square) {
      setMoveFrom(square);
      getMoveOptions(square);
    }

    // from square
    if (!moveFrom) {
      resetFirstMove(square);
      return;
    }

    // attempt to make move
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: moveFrom,
      to: square,
      promotion: 'q' // always promote to a queen for example simplicity
    });
    setGame(gameCopy);

    // if invalid, setMoveFrom and getMoveOptions
    if (move === null) {
      resetFirstMove(square);
      return;
    }

    // setTimeout(makeRandomMove, 300);
    setMoveFrom('');
    setOptionSquares({});
  }

  function onSquareRightClick(square) {
    const colour = 'rgba(0, 0, 255, 0.4)';
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square] && rightClickedSquares[square].backgroundColor === colour
          ? undefined
          : { backgroundColor: colour }
    });
  }

  function customDropSquareStyle(square) {
    const colour = 'rgba(0, 0, 255, 0.4)';
    square = toSquare
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square] && rightClickedSquares[square].backgroundColor === colour
          ? undefined
          : { backgroundColor: colour }
    });
  }

  return (
    <div>
      <Chessboard
        id="ClickToMove"
        animationDuration={750}
        arePiecesDraggable={false}
        boardOrientation={boardOrientation}
        position={fenString}
        onSquareClick={onSquareClick}
        onSquareRightClick={onSquareRightClick}
        customDropSquareStyle={customDropSquareStyle}
        customBoardStyle={{
          borderRadius: '4px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
        }}
        customSquareStyles={{
          ...moveSquares,
          ...optionSquares,
          ...rightClickedSquares
        }}
        ref={chessboardRef}
      />
      <button
        className="rc-button"
        onClick={() => {
          if(boardOrientation == 'black') setBoardOrientation('white');
          else setBoardOrientation('black');
        }}
      >
        Flip Board
      </button>
      {/* <button
        className="rc-button"
        onClick={() => {
          safeGameMutate((game) => {
            game.undo();
          });
          chessboardRef.current.clearPremoves();
          setMoveSquares({});
        }}
      >
        undo
      </button> */}
    </div>
  );
}