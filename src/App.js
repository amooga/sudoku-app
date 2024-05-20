import Row from "./Row";
import {ReactComponent as Undo} from "./undo.svg";
import {ReactComponent as Puzzle} from "./puzzle.svg";
import { generateRandomNumber, getNumNotInList, printSudoku, getRemainingNumber } from "./utils";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    // console.log("here")
      const arr1 = generateRandomNumber();
      const arr2 = generateRandomNumber();
      const arr3 = generateRandomNumber();
    
      // console.log(arr1, arr2, arr3);

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
      

      resolvedSudoku[0][3] = getNumNotInList([a00, a01, a02, a33, a43, a53], [a20, a21, a22]);
      resolvedSudoku[0][4] = getNumNotInList([a00, a01, a02, resolvedSudoku[0][3], a34, a44, a54], [a20, a21, a22]);
      resolvedSudoku[0][5] = getNumNotInList([a00, a01, a02, resolvedSudoku[0][3], resolvedSudoku[0][4], a35, a45, a55], [a20, a21, a22]);

      // resolvedSudoku[0][6] = getNumNotInList([...resolvedSudoku[0], a66, a76, a86]);
      // resolvedSudoku[0][7] = getNumNotInList([...resolvedSudoku[0], a67, a77, a87]);
      // resolvedSudoku[0][8] = getNumNotInList([...resolvedSudoku[0], a68, a78, a88]);

      resolvedSudoku[1][3] = getNumNotInList([...resolvedSudoku[1], resolvedSudoku[0][3], resolvedSudoku[0][4], resolvedSudoku[0][5],  a33, a43, a53], [a20, a21, a22]);
      resolvedSudoku[1][4] = getNumNotInList([...resolvedSudoku[1], resolvedSudoku[0][3], resolvedSudoku[0][4], resolvedSudoku[0][5], a34, a44, a54], [a20, a21, a22]);
      resolvedSudoku[1][5] = getNumNotInList([...resolvedSudoku[1], resolvedSudoku[0][3], resolvedSudoku[0][4], resolvedSudoku[0][5], a35, a45, a55], [a20, a21, a22]);

      resolvedSudoku[2][3] = getNumNotInList([a20, a21, a22, resolvedSudoku[0][3], resolvedSudoku[0][4], resolvedSudoku[0][5], resolvedSudoku[1][3], resolvedSudoku[1][4], resolvedSudoku[1][5], a33, a43, a53], [a20, a21, a22]);
      // console.log([...new Set([a20, a21, a22, resolvedSudoku[0][3], resolvedSudoku[0][4], resolvedSudoku[0][5], resolvedSudoku[1][3], resolvedSudoku[1][4], resolvedSudoku[1][5], resolvedSudoku[2][3], a34, a44, a54])])

      const [num1, num2] = getRemainingNumber([resolvedSudoku[0][3], resolvedSudoku[1][3], resolvedSudoku[2][3], resolvedSudoku[0][4], resolvedSudoku[0][5], resolvedSudoku[1][4], resolvedSudoku[1][5]]);

      if ( [resolvedSudoku[3][5], resolvedSudoku[4][5], resolvedSudoku[5][5]].includes(num1) ) {
        resolvedSudoku[2][5] = num2;
        resolvedSudoku[2][4] = num1;
      } else {
        resolvedSudoku[2][4] = num2;
        resolvedSudoku[2][5] = num1;
      }



      resolvedSudoku[6][0] = getNumNotInList([a00, a10, a20, a66, a67, a68], [a86, a87, a88]);
      resolvedSudoku[6][1] = getNumNotInList([a01, a11, a21, resolvedSudoku[6][0], a66, a67, a68], [a86, a87, a88]);
      resolvedSudoku[6][2] = getNumNotInList([a02, a12, a22, resolvedSudoku[6][0], resolvedSudoku[6][1], a66, a67, a68], [a86, a87, a88]);

      resolvedSudoku[7][0] = getNumNotInList([a00, a10, a20, resolvedSudoku[6][0], resolvedSudoku[6][1], resolvedSudoku[6][2], a76, a77, a78], [a86, a87, a88]);
      resolvedSudoku[7][1] = getNumNotInList([a01, a11, a21, resolvedSudoku[6][0], resolvedSudoku[6][1], resolvedSudoku[6][2], resolvedSudoku[7][0], a76, a77, a78], [a86, a87, a88]);
      resolvedSudoku[7][2] = getNumNotInList([a02, a12, a22, resolvedSudoku[6][0], resolvedSudoku[6][1], resolvedSudoku[6][2], resolvedSudoku[7][0], resolvedSudoku[7][1], a76, a77, a78], [a86, a87, a88]);


      resolvedSudoku[8][0] = getNumNotInList([a00, a10, a20, resolvedSudoku[6][0], resolvedSudoku[6][1], resolvedSudoku[6][2], resolvedSudoku[7][0], resolvedSudoku[7][1], resolvedSudoku[7][2], a86, a87, a88]);
      // resolvedSudoku[8][1] = getNumNotInList([a00, a10, a20, resolvedSudoku[6][0], resolvedSudoku[6][1], resolvedSudoku[6][2], resolvedSudoku[7][0], resolvedSudoku[7][1], resolvedSudoku[7][2], a86, a87, a88]);

      const [num3, num4] = getRemainingNumber([resolvedSudoku[6][0], resolvedSudoku[6][1], resolvedSudoku[6][2], resolvedSudoku[7][0], resolvedSudoku[7][1], resolvedSudoku[7][2], resolvedSudoku[8][0]]);

      console.log("num", num3, "nw", num4)

      if( [resolvedSudoku[8][6], resolvedSudoku[8][7], resolvedSudoku[8][8]].includes(num3) ) {
        // backtrack.
        if([ resolvedSudoku[6][1], resolvedSudoku[6][2], resolvedSudoku[7][1], resolvedSudoku[7][2] ].includes()) {

        }
      } else if ( [resolvedSudoku[8][6], resolvedSudoku[8][7], resolvedSudoku[8][8]].includes(num4) ) {


      }




      // resolvedSudoku[1][6] = getNumNotInList([...resolvedSudoku[1], resolvedSudoku[0][6], resolvedSudoku[0][7], resolvedSudoku[0][8], a66, a76, a86]);

      // console.log([...new Set([...resolvedSudoku[1], resolvedSudoku[0][6], resolvedSudoku[0][7], resolvedSudoku[0][8], a67, a77, a87])])
      // resolvedSudoku[1][7] = getNumNotInList([...resolvedSudoku[1], resolvedSudoku[0][6], resolvedSudoku[0][7], resolvedSudoku[0][8], a67, a77, a87]);

      // console.log([...new Set([...resolvedSudoku[1], resolvedSudoku[0][6], resolvedSudoku[0][7], resolvedSudoku[0][8], a68, a78, a88])])

      // resolvedSudoku[1][8] = getNumNotInList([...resolvedSudoku[1], resolvedSudoku[0][6], resolvedSudoku[0][7], resolvedSudoku[0][8], a68, a78, a88]);

      printSudoku(resolvedSudoku);
 
      // console.log("0", ...resolvedSudoku[0], "\n1", ...resolvedSudoku[1])

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
