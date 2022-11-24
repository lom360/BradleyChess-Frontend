import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom/client";

import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
// import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import ClickToMove from "./ClickToMove";
import { Chessboard } from "react-chessboard";
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
			toggleTurn: true,
			isBlackTurn: false,
			fenString: '',
			asciiBoard: ''
			// width: 530,
			// height: 315,
		}
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
		fetch('/startgame').then(response => 
			response.json().then(data => {
				console.log(data);
				this.setState({
							   moveList: data.legal_moves,
							//    playerMessage: data.player_turn,
							   gameStarted: data.gameStarted,
							   bestMove: data.best_move,
							   fieldWhite: data.best_move,
							   fenString: data.fen_string,
							   asciiBoard: data.ascii
							   })
			})
		);
	}

	endGame = () => {
		fetch('/endgame').then(response => 
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
		fetch('/movewhite',
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

	moveBlack = () => {
		const token = Cookies.get('XSRF-TOKEN');
		fetch('/moveblack',
		  { 
			method: 'POST', 
			headers: { 'Content-Type': 'application/json',
					   'X-XSRF-TOKEN': token  }, 
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
	
	getMoves = () => {
		fetch('/getmoves').then(response => 
			response.json().then(data => {
				console.log(data);
				this.setState({
							   moveList: data.legal_moves,
							   bestMove: data.best_move,
							   asciiBoard: data.ascii
							   })
				// if(!this.state.isBlackTurn) this.setState({fieldBlack: data.best_move});
				// else this.setState({fieldWhite: data.best_move});
				this.setState({fieldWhite: data.best_move});
			})
		);
	}

	// getMovesBlack = () => {
	// 	fetch('/getmoves').then(response => 
	// 		response.json().then(data => {
	// 			console.log(data);
	// 			this.setState({
	// 						   moveList: data.legal_moves,
	// 						   fieldWhite: data.bestMove,
	// 						   bestMove: data.best_move,
	// 						   asciiBoard: data.ascii
	// 						   })
	// 		})
	// 	);
	// }
	// componentDidMount() {
	// 	document.title = "Bradley Chess"
	// 	window.addEventListener("resize", this.resize);
	// 	this.resize();
	// }
	// resize = () => {
	// 	let display = document.getElementsByClassName("home-wrapper")[0]
	//     this.setState({
	//     	width: display.offsetWidth, height: display.offsetWidth/1.7777
	//     });
	// }
	// componentWillUnmount() {
	// 	window.removeEventListener("resize", this.resize);
	// }

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
		// const [chessboardSize, setChessboardSize] = useState(undefined);

		// useEffect(() => {
		// 	function handleResize() {
		// 	  const display = document.getElementsByClassName("container")[0];
		// 	  setChessboardSize(display.offsetWidth - 20);
		// 	}
		
		// 	window.addEventListener("resize", handleResize);
		// 	handleResize();
		// 	return () => window.removeEventListener("resize", handleResize);
		//   }, []);
        console.log(this.props.ClickToMove);
        const piece = this.state.asciiBoard;
		return (<div>
			<div>
				<TextField fullWidth 
									label="Moves for White"
									name="movesForW"
									value={this.state.fieldWhite.length>0 ? this.state.fieldWhite : ''}
									disabled={!this.state.isBlackTurn}
									onChange={this.handleWhiteInput}  />
			</div>
			<Button onClick={this.moveWhite} disabled={!this.state.isBlackTurn} variant="outlined" color="primary">1st Player</Button>

			<br/>

			<div>
				<TextField fullWidth 
									label="Moves for Black"
									name="movesForB" 
									value={this.state.fieldBlack.length>0 ? this.state.fieldBlack : ''}
									disabled={this.state.isBlackTurn}
									onChange={this.handleBlackInput}  />
			</div>
			<Button onClick={this.moveBlack} disabled={this.state.isBlackTurn} variant="outlined" color="primary">2nd Player</Button>
		
			<div>
				<br/>
				{/* {this.state.playerMessage} */}
				{this.state.toggleTurn ? <h5>It is White's Turn. Below are available moves:</h5> : <h5>It is Black's Turn. Below are available moves:</h5>}
				<br/>
				{this.state.moveList.length>0 ? this.state.moveList : null}
				<br/>
				{this.state.bestMove}
				<br/>
				{/* {this.state.asciiBoard} */}
				{this.state.fenString}
                <table>
                    <tr>
                        <td>{piece[0]}</td>
                        <td>{piece[1]}</td>
                        <td>{piece[2]}</td>
                        <td>{piece[3]}</td>
                        <td>{piece[4]}</td>
                        <td>{piece[5]}</td>
                        <td>{piece[6]}</td>
                        <td>{piece[7]}</td>
                        <td>{piece[8]}</td>
                        <td>{piece[9]}</td>
                        <td>{piece[10]}</td>
                        <td>{piece[11]}</td>
                        <td>{piece[12]}</td>
                        <td>{piece[13]}</td>
                        <td>{piece[14]}</td>
                        <td>{piece[15]}</td>
                    </tr>
                    <tr>
                        <td>{piece[0+16]}</td>
                        <td>{piece[1+16]}</td>
                        <td>{piece[2+16]}</td>
                        <td>{piece[3+16]}</td>
                        <td>{piece[4+16]}</td>
                        <td>{piece[5+16]}</td>
                        <td>{piece[6+16]}</td>
                        <td>{piece[7+16]}</td>
                        <td>{piece[8+16]}</td>
                        <td>{piece[9+16]}</td>
                        <td>{piece[10+16]}</td>
                        <td>{piece[11+16]}</td>
                        <td>{piece[12+16]}</td>
                        <td>{piece[13+16]}</td>
                        <td>{piece[14+16]}</td>
                        <td>{piece[15+16]}</td>
                    </tr>
                    <tr>
                        <td>{piece[0+32]}</td>
                        <td>{piece[1+32]}</td>
                        <td>{piece[2+32]}</td>
                        <td>{piece[3+32]}</td>
                        <td>{piece[4+32]}</td>
                        <td>{piece[5+32]}</td>
                        <td>{piece[6+32]}</td>
                        <td>{piece[7+32]}</td>
                        <td>{piece[8+32]}</td>
                        <td>{piece[9+32]}</td>
                        <td>{piece[10+32]}</td>
                        <td>{piece[11+32]}</td>
                        <td>{piece[12+32]}</td>
                        <td>{piece[13+32]}</td>
                        <td>{piece[14+32]}</td>
                        <td>{piece[15+32]}</td>
                    </tr>
                    <tr>
                        <td>{piece[0+48]}</td>
                        <td>{piece[1+48]}</td>
                        <td>{piece[2+48]}</td>
                        <td>{piece[3+48]}</td>
                        <td>{piece[4+48]}</td>
                        <td>{piece[5+48]}</td>
                        <td>{piece[6+48]}</td>
                        <td>{piece[7+48]}</td>
                        <td>{piece[8+48]}</td>
                        <td>{piece[9+48]}</td>
                        <td>{piece[10+48]}</td>
                        <td>{piece[11+48]}</td>
                        <td>{piece[12+48]}</td>
                        <td>{piece[13+48]}</td>
                        <td>{piece[14+48]}</td>
                        <td>{piece[15+48]}</td>
                    </tr>
                    <tr>
                        <td>{piece[0+64]}</td>
                        <td>{piece[1+64]}</td>
                        <td>{piece[2+64]}</td>
                        <td>{piece[3+64]}</td>
                        <td>{piece[4+64]}</td>
                        <td>{piece[5+64]}</td>
                        <td>{piece[6+64]}</td>
                        <td>{piece[7+64]}</td>
                        <td>{piece[8+64]}</td>
                        <td>{piece[9+64]}</td>
                        <td>{piece[10+64]}</td>
                        <td>{piece[11+64]}</td>
                        <td>{piece[12+64]}</td>
                        <td>{piece[13+64]}</td>
                        <td>{piece[14+64]}</td>
                        <td>{piece[15+64]}</td>
                    </tr>
                    <tr>
                        <td>{piece[0+80]}</td>
                        <td>{piece[1+80]}</td>
                        <td>{piece[2+80]}</td>
                        <td>{piece[3+80]}</td>
                        <td>{piece[4+80]}</td>
                        <td>{piece[5+80]}</td>
                        <td>{piece[6+80]}</td>
                        <td>{piece[7+80]}</td>
                        <td>{piece[8+80]}</td>
                        <td>{piece[9+80]}</td>
                        <td>{piece[10+80]}</td>
                        <td>{piece[11+80]}</td>
                        <td>{piece[12+80]}</td>
                        <td>{piece[13+80]}</td>
                        <td>{piece[14+80]}</td>
                        <td>{piece[15+80]}</td>
                    </tr>
                    <tr>
                        <td>{piece[0+96]}</td>
                        <td>{piece[1+96]}</td>
                        <td>{piece[2+96]}</td>
                        <td>{piece[3+96]}</td>
                        <td>{piece[4+96]}</td>
                        <td>{piece[5+96]}</td>
                        <td>{piece[6+96]}</td>
                        <td>{piece[7+96]}</td>
                        <td>{piece[8+96]}</td>
                        <td>{piece[9+96]}</td>
                        <td>{piece[10+96]}</td>
                        <td>{piece[11+96]}</td>
                        <td>{piece[12+96]}</td>
                        <td>{piece[13+96]}</td>
                        <td>{piece[14+96]}</td>
                        <td>{piece[15+96]}</td>
                    </tr>
                    <tr>
                        <td>{piece[0+112]}</td>
                        <td>{piece[1+112]}</td>
                        <td>{piece[2+112]}</td>
                        <td>{piece[3+112]}</td>
                        <td>{piece[4+112]}</td>
                        <td>{piece[5+112]}</td>
                        <td>{piece[6+112]}</td>
                        <td>{piece[7+112]}</td>
                        <td>{piece[8+112]}</td>
                        <td>{piece[9+112]}</td>
                        <td>{piece[10+112]}</td>
                        <td>{piece[11+112]}</td>
                        <td>{piece[12+112]}</td>
                        <td>{piece[13+112]}</td>
                        <td>{piece[14+112]}</td>
                        <td>{piece[15+112]}</td>
                    </tr>
                </table>
				<br/>
                {/* {this.props.ClickToMove.moveFrom} */}
                <br/>
                <br/>
			</div>

            <ClickToMove bestMove={this.state.bestMove} hello={'hello'} />
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
			<br/>
			<Button onClick={this.startGame} variant="outlined" disabled={this.state.gameStarted} color="primary">Start Chess Predictor</Button>
			<Button onClick={this.endGame} variant="outlined" disabled={!this.state.gameStarted} color="primary">End Chess Predictor</Button>

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