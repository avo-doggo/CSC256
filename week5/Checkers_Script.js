const board = document.getElementById('gameBoard');
const gameStatus = document.getElementById('gameStatus');
const restartButton = document.getElementById('restartGame');
const rows = 8;
const cols = 8;
let selectedPiece = null;     // The piece currently selected by the player
let currentPlayer = 'red';    // Whose turn it is
let redPieces = 12;           // Remaining red pieces
let blackPieces = 12;         // Remaining black pieces

createBoard();
updateStatus();

restartButton.addEventListener('click', () => 
{
    redPieces = 12;
    blackPieces = 12;
    currentPlayer = 'red';
    selectedPiece = null;
    createBoard();
    updateStatus();
    restartButton.style.display = 'none';
});

function createBoard() 
{// Clear the board before making a new one
    board.innerHTML = '';
    for (let row = 0; row < rows; row++) 
    {
        for (let col = 0; col < cols; col++) 
        {// Create a square
            const square = document.createElement('div');
            square.classList.add('square');
            square.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
            square.dataset.row = row;
            square.dataset.col = col;
            board.appendChild(square);
// Add starting pieces to black squares only
            if ((row + col) % 2 !== 0 && (row < 3 || row > 4)) 
            {
                const piece = document.createElement('div');
                piece.classList.add('piece');
                piece.classList.add(row < 3 ? 'black' : 'red');
                piece.dataset.row = row;
                piece.dataset.col = col;
                square.appendChild(piece);
            }

            square.addEventListener('click', handleSquareClick);
        }
    }
}

function handleSquareClick(e) 
{
    const square = e.target.classList.contains('square') ? e.target : e.target.parentElement;
    const piece = square.querySelector('.piece');

    if (piece && piece.classList.contains(currentPlayer)) 
    {
        // Select a piece
        if (selectedPiece) selectedPiece.classList.remove('selected');
        selectedPiece = piece;
        selectedPiece.classList.add('selected');
    } 
    else if (selectedPiece && !piece) 
    {
        // Try to move
        const fromRow = parseInt(selectedPiece.dataset.row);
        const fromCol = parseInt(selectedPiece.dataset.col);
        const toRow = parseInt(square.dataset.row);
        const toCol = parseInt(square.dataset.col);

        if (isValidMove(selectedPiece, fromRow, fromCol, toRow, toCol)) 
        {
            movePiece(selectedPiece, square, fromRow, fromCol, toRow, toCol);
        }
    }
}
// Check if a move is valid and return move details
function isValidMove(piece, fromRow, fromCol, toRow, toCol) 
{
    const dr = toRow - fromRow;
    const dc = Math.abs(toCol - fromCol);

    // Movement direction
    let direction = piece.classList.contains('red') ? -1 : 1;
    let isKing = piece.classList.contains('king');

    // Must move diagonally
    if (dc !== Math.abs(dr)) return false;

    // Regular move (no capture)
    if (dc === 1 && ((dr === direction) || (isKing && Math.abs(dr) === 1))) 
    {
        return true;
    }

    // Capture move
    if (dc === 2) 
    {
        let midRow = (fromRow + toRow) / 2;
        let midCol = (fromCol + toCol) / 2;
        const middlePiece = document.querySelector(
            `.piece[data-row='${midRow}'][data-col='${midCol}']`
        );
        if 
        (// Only valid if there is an opponent's piece to capture
            middlePiece &&
            !middlePiece.classList.contains(currentPlayer)
        ) 
        {
            return true;
        }
    }
    return false;
}

function movePiece(piece, square, fromRow, fromCol, toRow, toCol) 
{
    //capture
    if (Math.abs(toRow - fromRow) === 2) 
    {
        let midRow = (fromRow + toRow) / 2;
        let midCol = (fromCol + toCol) / 2;
        const middlePiece = document.querySelector(
            `.piece[data-row='${midRow}'][data-col='${midCol}']`
        );
        if (middlePiece) 
        {
            middlePiece.remove();
            if (middlePiece.classList.contains('red')) 
            {
                redPieces--;
            } 
            else 
            {
                blackPieces--;
            }
        }
    }

    // Update dataset for piece
    piece.dataset.row = toRow;
    piece.dataset.col = toCol;
    piece.classList.remove('selected');

    square.appendChild(piece);
    selectedPiece = null;

    // King promotion
    if ((piece.classList.contains('red') && toRow === 0) ||
        (piece.classList.contains('black') && toRow === rows - 1)) 
    {
        piece.classList.add('king');
    }

    checkWin();
    switchTurn();
}
// Switch to the other player's turn
function switchTurn() 
{
    currentPlayer = currentPlayer === 'red' ? 'black' : 'red';
    updateStatus();
}
// Update the game status text
function updateStatus() 
{
    gameStatus.textContent = `${currentPlayer.toUpperCase()}'s turn.`;
}

// Check if either player has won
function checkWin() 
{
    if (redPieces === 0)
    {
        gameStatus.textContent = 'Black wins!';
        restartButton.style.display = 'block';
    } 
    else if (blackPieces === 0) 
    {
        gameStatus.textContent = 'Red wins!';
        restartButton.style.display = 'block';
    }
}