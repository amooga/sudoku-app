
const getRandomNumber = () => Math.floor(Math.random() * 9 + 1);

export function generateRandomNumber() {
    var arr = [];
    while(arr.length < 9){
        var r = getRandomNumber();
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}

export function fillRandomBlockSudoku(sudoku, [startRowNum, startColNum]) {

    const getRowColNum = (num) => [startRowNum + Math.floor(num/3), Math.floor(startColNum + num%3)];

    const blockArrayIndex = (row,col) => (row-startRowNum)*3+(col-startColNum);

    const blockArray = generateRandomNumber();
    const colSudoku = [];

    console.log("sudoku", JSON.stringify(sudoku))
    console.log("blockArray", blockArray)
    for(let i = 8; i >= 0; i--) {
        colSudoku[8-i] = sudoku.map((row, index) => row[i]);
    }

    const swappedValues = [];

    for ( let number = 1; number <= 9; number ++) {
        // check valid;
        const [rowNum, colNum] = getRowColNum(blockArray.indexOf(number));

        const isAvailableRow = !!sudoku[rowNum].includes(number);
        const isAvailableCol = !!colSudoku[8-colNum].includes(number);

        // Number is unique to rows and cols, let's keep it.
        if (!isAvailableRow && !isAvailableCol) {
            swappedValues.push(number);
            continue;
        }

        let invalidValues = [...swappedValues];
        if (isAvailableRow) {
            invalidValues = [...invalidValues, ...sudoku[rowNum]];
        }

        if (isAvailableCol) {
            invalidValues = [...invalidValues, ...colSudoku[8-colNum]];
        }

        invalidValues = [...new Set(invalidValues)];

        const validValues = [];
        Array(9).fill(0).forEach((val, index) => {
            if(!invalidValues.includes(index+1)) validValues.push(index+1);
        });

        console.log(JSON.stringify({number, invalidValues, validValues}))

        function swapValues(values) {
            let isSwap = false;
            for (let val of values) {
                const [validNumRowLoc, validNumColLoc] = getRowColNum(blockArray.indexOf(val));
                // No Swaps if Number and validValue are in same row or column 
                if ((isAvailableCol && validNumColLoc === colNum) || (isAvailableRow && validNumRowLoc === rowNum)) {
                    continue;
                }

                // Swap only if our valid number is not available in both rows and columns, do only valid swaps.
                if ( !sudoku[validNumRowLoc].includes(number) && !colSudoku[8-validNumColLoc].includes(number) ) {
                    if( (val < number) && ( sudoku[rowNum].includes(val) || colSudoku[8-colNum].includes(val) ) ) {
                        continue;
                    }
                    blockArray[blockArrayIndex(rowNum, colNum)] = val;
                    blockArray[blockArrayIndex(validNumRowLoc, validNumColLoc)] = number;

                    console.log("swap", {number, val})
                    isSwap = true;
                    break;
                }
            }
            return isSwap;
        }


        const isSwap = swapValues(validValues);
        if (!isSwap && swappedValues.length !== 0) {
            const isSwapForSwappedValues = swapValues(swappedValues);
            console.log({number, isSwapForSwappedValues, R:"if false than no swapping possible and we have encountered an another corrupt case."})
        }
        swappedValues.push(number);
    }

    blockArray.forEach((value, index) => {
        const [row, col] = getRowColNum(index);
        sudoku[row][col] = value;
    });
}

export function fillRowsSudoku(sudoku, [startRowNum, startColumnNum]) {

    let rowNumber = startRowNum;
    while (rowNumber < startRowNum + 3) {

        let colSudoku = [];
        for(let i = 8; i >= 0; i--) {
            colSudoku[8-i] = sudoku.map((row, index) => row[i]);
        }

        const missingRowValues = [];
        Array(9).fill(0).forEach((val, index) => {
            if(!sudoku[rowNumber].includes(index+1)) missingRowValues.push(index+1);
        });

        let [first, second, third] = [startColumnNum, startColumnNum+1, startColumnNum+2];

        let colMapper = {};
        colMapper[first] = []
        colMapper[second] = []
        colMapper[third] = []

        let lengthArray = [0,0,0];


        for(let value of missingRowValues){
            if(!!!colSudoku[8-first].includes(value)) {
                colMapper[first].push(value);
                lengthArray[0]++;
            }

            if(!!!colSudoku[8-second].includes(value)) {
                colMapper[second].push(value);
                lengthArray[1]++;
            }

            if(!!!colSudoku[8-third].includes(value)) {
                colMapper[third].push(value);
                lengthArray[2]++;
            }
        }
        
        const colSequence = [first, second, third];

        while(!!colSequence.length) {
            const lowestIndex = getLowestAndRemove(lengthArray);
            
            for (let val of colMapper[colSequence[lowestIndex]]) {
                if ( !!!sudoku[rowNumber].includes(val) ) {
                    sudoku[rowNumber][colSequence[lowestIndex]] = val;
                    break;
                }
            }
            colSequence.splice(lowestIndex, 1);
            lengthArray.splice(lowestIndex, 1)
        }

        rowNumber ++;
    }

    let isAllFill = true;
    for ( let i = startRowNum; i < startRowNum + 3; i++ ) {
        for ( let j = startColumnNum; j < startColumnNum + 3; j++ ) {
            if( !!!sudoku[i][j] ) {
                isAllFill = false
                break;
            }
        }
    }
    return isAllFill
}

function getLowestAndRemove(values) {
    let lowest = values[0];
    let ind = 0;
    values.forEach((val, index) => {
        if(val < lowest) {
            lowest = val;
            ind = index;
        }
    });
    return ind;
}

export function printSudoku(sudoku) {
    for(let arr in sudoku){
        console.log(...sudoku[arr]+"\n");
    }
}

export function getRemainingNumber(arr) {
    const numList = generateRandomNumber()
    return numList.filter(num => arr.indexOf(num) === -1);
}