import React from "react";
import {render} from "react-dom";
import {ChessBoard} from "react-fen-chess-board";

import { useRef, useState } from 'react';
import Chess from 'chess.js';

import { Chessboard } from "react-chessboard";
// import  Chessboard  from 'react-chessboard';
import IdleTimer from 'react-idle-timer';
// import React from "react";

const chess = new Chess();

export class FenBoard extends React.Component {
	constructor(props) {
		super(props)
	}

    render() {
        return (
            <div>
              <Chessboard
                width={400}
                animationDuration={1000}
                position={this.props.fenString}
              />
            </div>
          );
    }

}

export default FenBoard

// export default function FenBoard({fenString}) {
//     // const chessboardRef = useRef();
//     // const [game, setGame] = useState(new Chess());
  
//     // const [moveFrom, setMoveFrom] = useState('');
  
//     // const [rightClickedSquares, setRightClickedSquares] = useState({});
//     // const [moveSquares, setMoveSquares] = useState({});
//     // const [optionSquares, setOptionSquares] = useState({});
  
//     return (
//       <div>
  
//         <Chessboard
//           id="ClickToMove"
//           animationDuration={200}
//           draggable={false}
//           position={fenString}/>
//       </div>
//     );
//   }
  