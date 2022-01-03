const boardDisplay = document.querySelector('.board');
const endMessage = document.querySelector('.end-message');
const endResult = document.querySelector('#end-result');
const replayButton = document.querySelector('#replay-button');

let turn = 'x';

//empty board object
let board = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
]

//initial blank board
createBoard();

function createBoard() {
    i = 0;
    board.forEach(item => {
        let cell = document.createElement('div');
        cell.setAttribute('class', 'cell');
        cell.setAttribute('id', i);
        cell.addEventListener('click', function(){playTurn()}, false);
        i++;
        if (item === 'x') {
            cell.classList.add('x');
            boardDisplay.appendChild(cell);
        } else if (item === 'o') {
            cell.classList.add('o');
            boardDisplay.appendChild(cell);
        } else
            boardDisplay.appendChild(cell);
    })
};

//play
function playTurn() {
    const targetCell = event.srcElement;
    const i = targetCell.id
    if (targetCell.classList.contains('x') || targetCell.classList.contains('o')) {
        return;
    }
    boardDisplay.innerHTML='';
    board[i] = turn;
    if (turn === 'x') {
        turn = 'o';
    } else {
        turn = 'x'
    }
    createBoard();
    checkResult();
}

//determine outcome
function checkResult() {
    const totalXs = document.getElementsByClassName('x').length
    const totalOs = document.getElementsByClassName('o').length

    //winning combinations
    const winCombos = [
        //horizontal
        board.slice(0, 3),
        board.slice(3, 6),
        board.slice(6, 9),

        //vertical
        Array.from(board[0] + board[3] + board[6]),
        Array.from(board[1] + board[4] + board[7]),
        Array.from(board[2] + board[5] + board[8]),
        
        //diagonal
        Array.from(board[0] + board[4] + board[8]),
        Array.from(board[2] + board[4] + board[6])

    ];

    
    for (let j = 0; j < 8; j++) {
        let checkCombo = winCombos[j];
        if (checkCombo[0] === 'x' && checkCombo[1] === 'x' && checkCombo[2] === 'x') {
            endResult.textContent = 'X wins!';
            endMessage.setAttribute('style', 'display: flex');
            return;
        } else if (checkCombo[0] === 'o' && checkCombo[1] === 'o' && checkCombo[2] === 'o') {
            endResult.textContent = 'O wins!';
            endMessage.setAttribute('style', 'display: flex');
            return;
        } else if (totalXs + totalOs == 9) {
            endResult.textContent = 'Draw!';
            endMessage.setAttribute('style', 'display: flex');
        }
    }
}

//play again
replayButton.addEventListener('click', function(){replay()}, false);
function replay(){
    endMessage.setAttribute('style', 'display: none');
    board = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ]
    boardDisplay.innerHTML = '';
    createBoard();
};