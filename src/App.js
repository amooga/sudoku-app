import Row from "./Row";
import {ReactComponent as Undo} from "./undo.svg";
import {ReactComponent as Puzzle} from "./puzzle.svg";

function App() {


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
