import Row from "./Row";
import {ReactComponent as Undo} from "./undo.svg";
import {ReactComponent as Puzzle} from "./puzzle.svg";
import { generateRandomNumber, fillRandomBlockSudoku, fillRowsSudoku, printSudoku } from "./utils";
import { useEffect, useState } from "react";

function App() {

  const [sudoku, setSudoku] = useState([]); 

  // Use to fill out the sudoku.
  useEffect(() => {
    let isRepeat = true;
    do{
      const arr1 = generateRandomNumber();
      const arr2 = generateRandomNumber();
      const arr3 = generateRandomNumber(); 

      const [a00, a01, a02, a10, a11, a12, a20, a21, a22] = arr1;
      const [a33, a34, a35, a43, a44, a45, a53, a54, a55] = arr2;
      const [a66, a67, a68, a76, a77, a78, a86, a87, a88] = arr3;

      let sudoku = [];
      const rowColForBlocks = [
        [0,0],
        [0,3],
        [0,6],
        [3,0],
        [3,3],
        [3,6],
        [6,0],
        [6,3],
        [6,6]
      ];

      const colForBlocks = [
        [0,0],
        [0,3],
        [0,6],
        [3,0],
        [3,3],
        [3,6],
        [6,0],
        [6,3],
        [6,6]
      ];
        sudoku = [
          [a00, a01, a02, 0, 0, 0, 0, 0, 0],
          [a10, a11, a12, 0, 0, 0, 0, 0, 0],
          [a20, a21, a22, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, a33, a34, a35, 0, 0, 0],
          [0, 0, 0, a43, a44, a45, 0, 0, 0],
          [0, 0, 0, a53, a54, a55, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, a66, a67, a68],
          [0, 0, 0, 0, 0, 0, a76, a77, a78],
          [0, 0, 0, 0, 0, 0, a86, a87, a88],
        ];
        fillRandomBlockSudoku(sudoku, rowColForBlocks[2]);

        const isAllFillUntil1 = fillRowsSudoku(sudoku, rowColForBlocks[1]);
        console.log({isAllFillUntil1})

        if ( !isAllFillUntil1 ) {
          continue;
        }

        let colSudoku = [];
        for(let i = 8; i >= 0; i-- ) {
          colSudoku[8-i] = sudoku.map((row) => row[i]);
        }
        const isAllFillUntil7 = fillRowsSudoku(colSudoku, colForBlocks[5]);
        console.log({isAllFillUntil7})
        if ( !isAllFillUntil7 ) {
          continue;
        }

        for(let i = 0; i <= 8; i++ ) {
          sudoku[i] = colSudoku.map(rows => rows[i]).reverse();
        }

        const isAllFillUntil6 = fillRowsSudoku(sudoku, rowColForBlocks[6]);
        console.log({isAllFillUntil6})
        if ( !isAllFillUntil6 ) {
          continue;
        }

        colSudoku = [];
        for(let i = 8; i >= 0; i-- ) {
          colSudoku[8-i] = sudoku.map((row) => row[i]);
        }

        const isAllFillUntil33 = fillRowsSudoku(colSudoku, colForBlocks[7]);
        if ( !isAllFillUntil33 ) {
          continue;
        }

        const isAllFillUntil11 = fillRowsSudoku(colSudoku, colForBlocks[1]);
        if ( !isAllFillUntil11 ) {
          continue;
        }


        for(let i = 0; i <= 8; i++ ) {
          sudoku[i] = colSudoku.map(rows => rows[i]).reverse();
        }
        console.log("getting new line");
        printSudoku(sudoku);

        setSudoku(sudoku);
        isRepeat = false;

      }while(isRepeat)
      
  }, [])


  return (
    <div className="app">
      <div className="sudoku">
        {sudoku.map((numList, index) => <Row numList={numList} key={index} />)}
      </div>
      <div className="btnContainer">
        <Undo className="svg" alt="Undo" />
        <div className="svg">
          <Puzzle alt="New"  />
        </div>
      </div>
    </div>
  );
}

export default App;
