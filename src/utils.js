
const getRandomNumber = () => Math.floor(Math.random() * 9 + 1);

export function generateRandomNumber() {
    var arr = [];
    while(arr.length < 9){
        var r = getRandomNumber();
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
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