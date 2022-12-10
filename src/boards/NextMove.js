import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom/client";
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
// import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
// import ClickToMove from "./ClickToMove";
// import { Chessboard } from "react-chessboard";
import FenBoard from "./FenBoard";
import {render} from "react-dom";

import Chess from 'chess.js';

import  {Chessboard}  from 'react-chessboard';
// import { responsiveFontSizes } from "@mui/material";
// import {DataGrid} from '@mui/x-data-grid';
// import { FaLess } from "react-icons/fa";

export class NextMove extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			moveList: [],
			playerMessage: '',
			bestMove: '',
            fieldWhite: '',
			fieldBlack: '',
			gameStarted: false,
			fenString: '',
			// toggleTurn: true,
			isBlackTurn: true,
			asciiBoard: '',
			roomKey: 0
			// width: 530,
			// height: 315,
		}
	}

	sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

	// getBoard = () => {
	// 	fetch('/board').then(response => 
	// 		response.json().then(data => {
	// 			console.log(data);
	// 			this.setState({boardList: data.DC_Trinity})
	// 			// this.state.boardList = data.DC_Trinity;
	// 			console.log(this.state.moveList.length);
	// 		})
	// 	);
	// }

	startGame = () => {
		console.log("Starting")
		fetch('https://flask-bradley-chess.azurewebsites.net/startgame').then(response => 
			response.json().then(data => {
				console.log(data);
				this.setState({
							   moveList: data.legal_moves,
							//    playerMessage: data.player_turn,
							   gameStarted: data.gameStarted,
							   bestMove: data.best_move,
							   fenString: data.fen_string,
							   fieldWhite: data.best_move,
							   asciiBoard: data.ascii,
							   roomKey: data.roomKey
							   })
			})
		);
	}

	endGame = () => {
		fetch(`https://flask-bradley-chess.azurewebsites.net/${this.state.roomKey}/endgame`).then(response => 
			response.json().then(data => {
				console.log(data);
				this.setState({moveList: data.legal_moves,
							   playerMessage: data.player_turn,
                               isBlackTurn: true,
                               fieldBlack: '',
							   gameStarted: data.gameStarted
							   })
			})
		);
	}

	moveWhite = () => {
		const token = Cookies.get('XSRF-TOKEN');
		fetch(`https://flask-bradley-chess.azurewebsites.net/${this.state.roomKey}/movewhite`,
		  { 
			method: 'POST', 
			headers: { 'Content-Type': 'application/json',
					   'X-XSRF-TOKEN': token  }, 
					//    credentials: 'include',
			body: JSON.stringify(this.state.fieldWhite)
		  })
		.then(res => { 
			if (res.ok) {
			  this.setState({toggleTurn: !this.state.toggleTurn,
							 isBlackTurn: !this.state.isBlackTurn,
							 fieldWhite: ''
							});////
			  this.getMoves();
			  toast.success("Move has been sent", {
				  position: toast.POSITION.BOTTOM_LEFT
			  });
			} else {
			  toast.error("Error when adding", {
				  position: toast.POSITION.BOTTOM_LEFT
			  });
			  console.error('Post http status =' + res.status);
			}})
		.catch(err => {
		  toast.error("Error when adding", {
				position: toast.POSITION.BOTTOM_LEFT
			});
			console.error(err);
		})
	}

	// moveBlack = () => {
	// 	const token = Cookies.get('XSRF-TOKEN');
	// 	fetch('/moveblack',
	// 	  { 
	// 		method: 'POST', 
	// 		headers: { 'Content-Type': 'application/json',
	// 				   'X-XSRF-TOKEN': token  }, 
	// 				//    credentials: 'include',
	// 		body: JSON.stringify(this.state.fieldBlack)
	// 	  })
	// 	.then(res => { 
	// 		if (res.ok) {
	// 		  this.setState({
	// 						//  toggleTurn: !this.state.toggleTurn,
	// 						//  isBlackTurn: !this.state.isBlackTurn,
	// 						 fieldBlack: ''
	// 						});////
	// 		  this.getMoves();
	// 		//   this.getAgent();`
	// 		  toast.success("Move has been sent", {
	// 			  position: toast.POSITION.BOTTOM_LEFT
	// 		  });
	// 		} else {
	// 		  toast.error("Error when adding", {
	// 			  position: toast.POSITION.BOTTOM_LEFT
	// 		  });
	// 		  console.error('Post http status =' + res.status);
	// 		}})
	// 	.catch(err => {
	// 	  toast.error("Error when adding", {
	// 			position: toast.POSITION.BOTTOM_LEFT
	// 		});
	// 		console.error(err);
	// 	})
	// }

	moveBlack = () => {
		const token = Cookies.get('XSRF-TOKEN');
		fetch(`https://flask-bradley-chess.azurewebsites.net/${this.state.roomKey}/moveblack`,
		  { 
			method: 'POST', 
			headers: { 'Content-Type': 'application/json',
					   'X-XSRF-TOKEN': token  
					}, 
					//    credentials: 'include',
			body: JSON.stringify(this.state.fieldBlack)
		  })
		.then(res => { 
			if (res.ok) {
			  this.setState({
							//  toggleTurn: !this.state.toggleTurn,
							//  isBlackTurn: !this.state.isBlackTurn,
							 fieldBlack: ''
							});////
			  this.playerMoves();
			//   this.sleep(1500).then(r => {this.getMoves();})
			//   this.getMoves();
			} else {
			  console.error('Post http status =' + res.status);
			}}).then(this.sleep(1500).then(r => {this.getMoves();}))
	}

	moveBlackWithBtn = (move) => {
		const token = Cookies.get('XSRF-TOKEN');
		fetch(`https://flask-bradley-chess.azurewebsites.net/${this.state.roomKey}/moveblack`,
		  { 
			method: 'POST', 
			headers: { 'Content-Type': 'application/json',
					   'X-XSRF-TOKEN': token  
					}, 
					//    credentials: 'include',
			body: JSON.stringify(move)
		  })
		.then(res => { 
			if (res.ok) {
			  this.setState({
							//  toggleTurn: !this.state.toggleTurn,
							//  isBlackTurn: !this.state.isBlackTurn,
							 fieldBlack: ''
							});////
			  this.playerMoves();
			//   this.sleep(1500).then(r => {this.getMoves();})
			//   this.getMoves();
			} else {
			  console.error('Post http status =' + res.status);
			}}).then(this.sleep(1500).then(r => {this.getMoves();}))
	}

	// moveAgent = () => {
	// 	const token = Cookies.get('XSRF-TOKEN');
	// 	fetch('/moveagent',
	// 	  { 
	// 		method: 'POST', 
	// 		headers: { 'Content-Type': 'application/json',
	// 				   'X-XSRF-TOKEN': token  }, 
	// 				//    credentials: 'include',
	// 		body: JSON.stringify(this.state.fieldWhite)
	// 	  })
	// 	.then(res => { 
	// 		if (res.ok) {
	// 		  this.getMoves();
	// 		  toast.success("Move has been sent", {
	// 			  position: toast.POSITION.BOTTOM_LEFT
	// 		  });
	// 		} else {
	// 		  toast.error("Error when adding", {
	// 			  position: toast.POSITION.BOTTOM_LEFT
	// 		  });
	// 		  console.error('Post http status =' + res.status);
	// 		}})
	// 	.catch(err => {
	// 	  toast.error("Error when adding", {
	// 			position: toast.POSITION.BOTTOM_LEFT
	// 		});
	// 		console.error(err);
	// 	})
	// }
	
	getMoves = () => {
		fetch(`https://flask-bradley-chess.azurewebsites.net/${this.state.roomKey}/getmoves`).then(response => 
			response.json().then(data => {
				console.log(data);
				this.setState({
							   moveList: data.legal_moves,
							   bestMove: data.best_move,
							   fenString: data.fen_string,
							   asciiBoard: data.ascii
							   })
				// if(!this.state.isBlackTurn) this.setState({fieldBlack: data.best_move});
				// else this.setState({fieldWhite: data.best_move});
				this.setState({fieldWhite: data.best_move});
			})
		);
	}

	playerMoves = () => {
		fetch(`https://flask-bradley-chess.azurewebsites.net/${this.state.roomKey}/playermoves`).then(response => 
			response.json().then(data => {
				console.log(data);
				this.setState({
							   fenString: data.fen_string,
							   asciiBoard: data.ascii
							   })
				// if(!this.state.isBlackTurn) this.setState({fieldBlack: data.best_move});
				// else this.setState({fieldWhite: data.best_move});
				// this.setState({fieldWhite: data.best_move});
			})
		);
	}

    handleWhiteInput = (event) => {
        // const fieldInput = this.state.fieldInput;
        const modifiedValue = event.target.value;
        
        // fieldInput = modifiedValue;
		console.log(modifiedValue)
        this.setState({fieldWhite: modifiedValue});
    }

    handleBlackInput = (event) => {
        // const fieldInput = this.state.fieldInput;
        const modifiedValue = event.target.value;
        
        // fieldInput = modifiedValue;
		console.log(modifiedValue)
        this.setState({fieldBlack: modifiedValue});
    }

	pythonEngine = () => {
        const piece = this.state.asciiBoard;
		return (<div>
			{/* <div>
				<TextField fullWidth 
									// label="Moves for White"
									name="movesForW"
									color="success"
									value={this.state.fieldWhite.length>0 ? this.state.fieldWhite : ''}
									disabled={this.state.isBlackTurn}
									onChange={this.handleWhiteInput}  />
			</div>
			<div class="button-container2">
			<Button onClick={this.moveWhite} disabled={this.state.isBlackTurn} variant="outlined" color="primary">1st Player</Button>
			</div> */}
			<br/>

			<h4 class="players">The Agent has played: <span class="best-move">{this.state.bestMove}</span></h4>
			<br/>
			<br/>

			<div class="textfield">
				<TextField fullWidth 
									// label="Moves for Black"
									placeholder="Moves for Black"
									name="movesForB"
									color="info"
									value={this.state.fieldBlack.length>0 ? this.state.fieldBlack : ''}
									disabled={!this.state.isBlackTurn}
									onChange={this.handleBlackInput}  
									/>
			</div>
			<div class="button-container2">
			<Button onClick={this.moveBlack} disabled={!this.state.isBlackTurn} variant="outlined" color="primary">Process Move</Button>
			</div>
			<div>
				<br/>
				

				{/* {this.state.moveList.length>0 ? this.state.moveList : null} */}
				{/* <ul>
					{this.state.moveList.map(moves => (
						<li>{moves}</li>
					))}
				</ul> */}

				<h4 class="players">Player possible moves: </h4>
				<table id="possible-moves">
					{/* <tr>
					{this.state.moveList.map(moves => (
							<td>{moves}</td>
					))}
					</tr> */}
					<tr>
					{this.state.moveList.map((moves) =>
						<button class="moveBtn"
						onClick={() => this.moveBlackWithBtn(moves)}
						// style={btnStyle}
						>
						{moves}
						</button> 
					)}
					</tr>
				</table>
				<br/>
				<br/>
				<br/>
                {/* {this.props.ClickToMove.moveFrom} */}
                <br/>
                <br/>
			</div>

            {/* <ClickToMove fenString={this.state.fenString} /> */}

			<FenBoard fenString={this.state.fenString} toSquare={'e5'} fromSquare={'d4'}/>
      {/* <Chessboard
        width={400}
        position={this.state.fenString}/> */}

			{/* <ChessBoard fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"/> */}
    		{/* document.getElementById("your-react-root") */}
			{/* <ClickToMove boardWidth={chessboardSize} /> */}
			{/* <ClickToMove  /> */}
			</div>);
	}


	
	render() {
		// const isRunning = this.state.moveList.length != 0;
		const game = {
			moveList: this.state.moveList,
			playerMessage: this.state.playerMessage,
			bestMove: this.state.bestMove,
            fieldWhite: this.state.fieldWhite,
			fieldBlack: this.state.fieldBlack,
			isBlackTurn: this.state.isBlackTurn,
			asciiBoard: this.state.asciiBoard
		}

		return (<>
			<h1>Bradley Chess</h1>
			<br/>
			{/* <FenBoard/> */}
			<div class="button-container">
			<Button  onClick={this.startGame} variant="outlined" disabled={this.state.gameStarted} color="primary">Start Chess Game</Button>
			<div class="divider"/>
			<Button  onClick={this.endGame} variant="outlined" disabled={!this.state.gameStarted} color="primary">End Chess Game</Button>
			</div>
			<br/>
			<br/>
			{/* { this.state.gameStarted ? <PythonEngine/> : null} */}
			{ this.state.gameStarted && this.pythonEngine()}
			{/* <div className="text-center mt-4">
                <TextField fullWidth 
                                    label="Moves for White"
                                    name="movesForW"
									value={this.state.fieldWhite.length>0 ? this.state.fieldWhite : ''}
                                    onChange={this.handleWhiteInput}  />
			</div>
			<Button onClick={this.moveWhite} variant="outlined" color="primary">1st Player</Button>

			<br/>

            <div className="text-center mt-4">
                <TextField fullWidth 
                                    label="Moves for Black"
                                    name="movesForB" 
									value={this.state.fieldBlack.length>0 ? this.state.fieldBlack : ''}
                                    onChange={this.handleBlackInput}  />
			</div>
			<Button variant="outlined" color="primary">2nd Player</Button>

			
			<div>
			<br/>
				{this.state.playerMessage}
				<br/>
				{this.state.moveList.length>0 ? this.state.moveList : null}
				<br/>
				{this.state.bestMove}
				<br/>
				{this.state.asciiBoard}
				<br/>
			</div> */}

	</>)
	}
}

export default NextMove