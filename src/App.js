import { useState } from 'react';

function Square({value, onSquareClick}){
  return <button className='square' onClick={onSquareClick}>{value}</button>
}

function Board({isNextMove, squares, onPlay}){

  function onHandleClick(i){
    if(squares[i] || CalculateWinner(squares)){
      return;
    }

    const newSqares = squares.slice();
    if(isNextMove){
      newSqares[i] = 'X';
    }else{
      newSqares[i] = 'O';
    }

    onPlay(newSqares);
  }

  let winner = CalculateWinner(squares);
  let status;
  if (winner){
    status = 'Winner: ' + winner;
  }else{
    status = 'Next Player: ' + ((isNextMove)? 'X' : 'O');
  }

  return (
    <>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => onHandleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => onHandleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => onHandleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => onHandleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => onHandleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => onHandleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => onHandleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => onHandleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => onHandleClick(8)} />
      </div>
    </>
  );
}

export default function Game(){
  // const[nextmove, setNextMove] = useState(true);
  const[history, setHistory] = useState([Array(9).fill(null)]);
  const[currentMove, setCurrentMove] = useState(0);
  const nextmove = currentMove % 2 === 0;

  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    // setNextMove(!nextmove);
  }

  function jumpTo(move){
    setCurrentMove(move);
    // setNextMove(move % 2 === 0);
  }

  const moves = history.map((squares, index) => {
    let description;
    if(index > 0){
      description = "Go to move #" + index;
    }else{
      description = "Go to game start";
    }

    return (
      <li key={index}>
      <button onClick={()=>jumpTo(index)}>{description}</button>
    </li>
    )
  });

  return (
    <div className='game'>
      <div className='game-board'>
      <Board isNextMove={nextmove} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className='game-info'>
        {moves}
      </div>
    </div>
  )
}

function CalculateWinner(squares){
  const winnerList = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  for (let i = 0; i<winnerList.length; i++){
    const [a,b,c] = winnerList[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}