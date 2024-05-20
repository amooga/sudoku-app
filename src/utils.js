
const getRandomNumber = () => Math.floor(Math.random() * 9 + 1);

export function generateRandomNumber() {
    var arr = [];
    while(arr.length < 9){
        var r = getRandomNumber();
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}

export function getNumNotInList(arr, priorityList = []) {
    const numList = generateRandomNumber()
    const uniqArr = [...new Set(arr)].filter(num => num);
    const validNumList = numList.filter(num => uniqArr.indexOf(num) === -1)
    const validPriorityList = priorityList.filter(num => uniqArr.indexOf(num) === -1)

    console.log("valid", validPriorityList)
    if (validPriorityList.length > 0 ) {
        return validPriorityList[0]
    }

    console.log("valid num", validNumList)

    if ( validNumList.length > 0) return validNumList[0]
    let randomIndex = getRandomNumber();
    while(randomIndex > validNumList.length) {
         randomIndex = getRandomNumber();
    }
    return validNumList[randomIndex - 1]
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