
const getRandomNumber = () => Math.floor(Math.random() * 9 + 1);

export function generateRandomNumber() {
    var arr = [];
    while(arr.length < 9){
        var r = getRandomNumber();
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}

  
export function getRowColPosition(sudoku, [startRow, startCol], number) {
    const endRow = startRow + 2;
    const endCol = startCol + 2;

    const validRowList = [];
    const validColList = [];
    const rejectColList = [];

    // Find number in all of the sudoku.
    let counter = 0;
    while (counter <= 8) {
        let colLocation = sudoku[counter].indexOf(number);
        if( colLocation !== -1 ) {
            rejectColList.push(colLocation);
        } else {
            if (counter >= startRow && counter <= endRow) {
                validRowList.push(counter);
            }
        }
        counter ++;
    }

    const validLocations = [];

    counter = startCol;
    while (counter <= endCol) {
        const isAvailable = rejectColList.includes(counter);
        if ( !isAvailable ) {
            validColList.push(counter);
        }
        counter ++;
    }
    
    validRowList.forEach(rowNumber => validColList.forEach(colNumber => {
        if ( sudoku[rowNumber][colNumber] === 0 ) validLocations.push([rowNumber, colNumber])
    }));

    if(validLocations.length < 3) return validLocations[0];

    let randomNumber = validLocations.length + 1;
    while(randomNumber >= validLocations.length) {
        randomNumber = getRandomNumber();
    }

    return validLocations[randomNumber - 1];
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