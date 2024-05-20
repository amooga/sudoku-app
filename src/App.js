import Row from "./Row";
import {ReactComponent as Undo} from "./undo.svg";
import {ReactComponent as Puzzle} from "./puzzle.svg";
import { generateRandomNumber, getRowColPosition, printSudoku } from "./utils";
import { useEffect } from "react";

function App() {

  useEffect(() => {
      const arr1 = generateRandomNumber();
      const arr2 = generateRandomNumber();
      const arr3 = generateRandomNumber(); 

      const [a00, a01, a02, a10, a11, a12, a20, a21, a22] = arr1;
      const [a33, a34, a35, a43, a44, a45, a53, a54, a55] = arr2;
      const [a66, a67, a68, a76, a77, a78, a86, a87, a88] = arr3;

      let resolvedSudoku = [];
      resolvedSudoku.push(
        [a00, a01, a02, 0, 0, 0, 0, 0, 0],
        [a10, a11, a12, 0, 0, 0, 0, 0, 0],
        [a20, a21, a22, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, a33, a34, a35, 0, 0, 0],
        [0, 0, 0, a43, a44, a45, 0, 0, 0],
        [0, 0, 0, a53, a54, a55, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, a66, a67, a68],
        [0, 0, 0, 0, 0, 0, a76, a77, a78],
        [0, 0, 0, 0, 0, 0, a86, a87, a88],
      );

      // printSudoku(resolvedSudoku);
      
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
    
      // Rows and Columns for 3rd block.
      for(let number=1; number<=6; number++) {
        const [rowFor3, colFor3] = getRowColPosition(resolvedSudoku, rowColForBlocks[2], number);
        resolvedSudoku[rowFor3][colFor3] = number;
      }

      console.log("getting new line");

      printSudoku(resolvedSudoku);
  }, [])


  return (
    <div className="app">
      <div className="sudoku">
        {Array(9).fill(0).map((p, index) => <Row key={index} />)}
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
