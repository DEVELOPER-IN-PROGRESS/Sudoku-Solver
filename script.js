let r =  1 , c = 1 ;

let cells = document.querySelectorAll('.inner-box .cell') ;
let sudoku = [
    [".",".","4",".",".",".",".",".","."],
    [".",".",".",".",".",".",".",".","."],
    [".",".",".",".",".",".",".",".","."],
    [".",".",".",".",".",".",".",".","."],
    [".",".",".",".",".",".",".",".","."],
    [".",".",".",".",".",".","5",".","."],
    [".",".",".",".",".",".",".",".","."],
    [".",".",".",".",".",".",".",".","."],
    [".",".",".",".",".","7",".",".","."]
]

var solveSudoku = function(board) {

    function isValid(grid, row, col, k) {
     for (let i = 0; i < 9; i++) {
         const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
         const n = 3 * Math.floor(col / 3) + i % 3;
         if (grid[row][i] == k || grid[i][col] == k || grid[m][n] == k) {
           return false;
         }
     }
     return true;
 }

 function solve(grid) {

   for (let i = 0; i < 9; i++) {
     for (let j = 0; j < 9; j++) {

       if (grid[i][j] == '.') {

         for (let k = 1; k <= 9; k++) {

           if (isValid(grid, i, j, k)) {
              grid[i][j] = `${k}`;
           if (solve(grid)) {
            return true;
           } else {
            grid[i][j] = '.';
           }
          }
        }

        return false;
      }
    }
  }
      return true;
  }
     solve(board)
     return board ;
};

function populate(board){
    // debugger
    let box = 1;
    for(let i = 0 ; i < 9 ;i++){
        for(let j = 0 ; j < 9 ;j++){
            if(board[i][j] == "."){
                document.querySelector(`.main-wrap .inner-box:nth-child(${box}) .cell:nth-child(${j+1})`).value = ''
            }else{
            document.querySelector(`.main-wrap .inner-box:nth-child(${box}) .cell:nth-child(${j+1})`).value = board[i][j]
            }
        }
        box++;
    }
}

function resetboard(){
    sudoku = [
        [".",".",".",".",".",".",".",".","."],
        [".",".",".",".",".",".",".",".","."],
        [".",".",".",".",".",".",".",".","."],
        [".",".",".",".",".",".",".",".","."],
        [".",".",".",".",".",".",".",".","."],
        [".",".",".",".",".",".",".",".","."],
        [".",".",".",".",".",".",".",".","."],
        [".",".",".",".",".",".",".",".","."],
        [".",".",".",".",".",".",".",".","."]
    ]
    document.querySelector(`.main-wrap .inner-box:nth-child(${r}) .cell:nth-child(${c})`).style.backgroundColor = '#FFFFFF'
    populate(sudoku)
}

var isValidSudoku = function(board) {

    let i , j ;
        let check = new Set();
        for(i = 0 ; i < board.length ; i++){

             for(j = 0 ; j< board[0].length ; j++){
                    let curr = board[i][j] ;
                 if(curr !== '.'){
                if(check.has(`${curr} row ${i}`) ||
                   check.has(`${curr} col ${j}`) ||
                   check.has(`${curr} subbox ${Math.floor(i/3)} ${Math.floor(j/3)}`) ){
                    return false;
                }
                 }
                 check.add(`${curr} row ${i}`);
                 check.add(`${curr} col ${j}`);
                 check.add(`${curr} subbox ${Math.floor(i/3)} ${Math.floor(j/3)}`);
            }
        }

        return true ;
};

function selectCell(e){
    let prevcell = document.querySelector(`.main-wrap .inner-box:nth-child(${r}) .cell:nth-child(${c})`) || null ;
    cellid = (e.target.id).split("-")
    r = Number(cellid[0]) + 1
    c = Number(cellid[1]) + 1
    prevcell.style.backgroundColor = '#FFFFFF';
    prevcell.style.color = '#000000';
    document.querySelector(`.main-wrap .inner-box:nth-child(${r}) .cell:nth-child(${c})`).style.backgroundColor = '#0bff0b';
    document.querySelector(`.main-wrap .inner-box:nth-child(${r}) .cell:nth-child(${c})`).style.color = '#FFFFFF';
}

function solvePuzzle(){
    // debugger;
    // console.log('click')
   let sol =  solveSudoku(sudoku);
   populate(sol)
}

function addContent(e){
    // document.getElementById(`${r-1}-${c-1}`).value = '';
    let digit= e.data
    // console.log(e)
    if (digit > 0 && digit < 10){
        // console.log(`yes  ${r} ${c} ${sudoku[r-1][c-1]}`)
        document.querySelector(`.main-wrap .inner-box:nth-child(${r}) .cell:nth-child(${c})`).style.color = 'blue';
        document.getElementById(`${r-1}-${c-1}`).value = digit;
        sudoku[r-1][c-1] = digit;
        // debugger
        if(!isValidSudoku(sudoku)){
            alert('This Board has no solution change the last entered input')
            document.querySelector(`.main-wrap .inner-box:nth-child(${r}) .cell:nth-child(${c})`).value = '' ;
            document.querySelector(`.main-wrap .inner-box:nth-child(${r}) .cell:nth-child(${c})`).style.color = '#FFFFFF';
            sudoku[r-1][c-1] = ".";
            document.getElementById(`${r-1}-${c-1}`).value = ''
        }
    }else{
        if(sudoku[r-1][c-1] != ".")
        document.getElementById(`${r-1}-${c-1}`).value = sudoku[r-1][c-1]
    }
}

function loadcontent(){

    let box = 1;
    for(let i = 0 ; i < 9 ;i++){
        for(let j = 0 ; j < 9 ;j++){
            let cell = document.querySelector(`.main-wrap .inner-box:nth-child(${box}) .cell:nth-child(${j+1})`)
            if (sudoku[i][j] != "."){
                cell.value = sudoku[i][j]
            }
            cell.addEventListener('click',selectCell)
            cell.addEventListener('input', addContent )
            cell.id = `${i}-${j}` ;
        }
        box++;
    }
}

document.getElementById('clear').addEventListener('click' , resetboard)
document.getElementById('solve').addEventListener('click' , solvePuzzle )
document.addEventListener('DOMContentLoaded', loadcontent);
