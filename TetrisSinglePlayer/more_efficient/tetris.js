const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d"); 
// provides a 2d context for the drawing surface of a canvas element. Used to draw rectangles, text, images, or other objects onto canvas element

ctx.scale(20, 20); // scale drawing by (x, y)

function clearCanvas() {
    ctx.fillStyle = "#000"; // fill ctx with black background
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
    // draw rectangle: ctx.fillRect(x, y, width, height), where (x, y) are components of rectangle's starting point
}

// represent tetrominoes as a 2d matrix. We have extra row to rotate about the center piece. It would be difficult if it was only two rows.  
const Tshape = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
];

const Oshape = [
    [1, 1],
    [1, 1],
];

const currentPos = {
    x: 5, 
    y: 0,
};

// board is meant to save location of dropped tetrominoes
function createMatrix(width, height) {
    const matrix = [];
    for (let row = 0; row < height; row++) {
        matrix.push(new Array(width).fill(0));
    }
    return matrix;
} 

const board = createMatrix(12, 20);
console.log(board);

function drawTetromino(matrix, pos) {
    matrix.forEach((row, rowIdx) => {
        row.forEach((col, colIdx) => {
            if (col !== 0) {
                ctx.fillStyle = "red";
                ctx.fillRect(colIdx + pos.x, rowIdx + pos.y, 1, 1); // iterate through x-comp (colIdx) first to fillStyle red.
            }
        });
    });
}
// alternative #drawTetromino()
// function drawTetromino() {
//     for (let row = 0; row < matrix.length; row++) {
//         for (let col = 0; col < matrix[row].length; col++) {
//             if (matrix[row][col] !== 0) {
//                 ctx.fillStyle = "red";
//                 ctx.fillRect(col, row, 1, 1);
//             }
//         }
//     }
// }

// Check for collision before allowing drop. If subsequent [row + 1][col] contains a non-zero value, then piece cannot be dropped.
function dropPiece() {
    if (collision(Tshape)) {
        freeze();
    } else {
        currentPos.y++;
    }
}

function moveDir(pos) {
    if (pos === 1) {
        currentPos.x += 1;
    } else {
        currentPos.x -= 1;
    }
}


document.addEventListener("keydown", event => {
    console.log(event.keyCode);
    if (event.keyCode === 37) {
        moveDir(-1);
    } else if (event.keyCode === 39) {
        moveDir(1);
    } else if (event.keyCode === 40) {
        dropPiece();
    }
    // clear canvas when key is pressed and renders updated location of tetromino
    clearCanvas();
    drawTetromino(Tshape, currentPos);
});


// 
function collision(matrix) {
    var moveAllowed = true;
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            // check if we're looking at currentPiece because we're iterating from top to bottom, left to right
            if (matrix[row][col] !== 0) {
                // check if element beneath currentPiece is zero, if not, move is not allowed
                if (row === matrix.length - 1 || matrix[row + 1][col] !== 0) {
                    moveAllowed = false;
                    freeze();
                }
            }
        }
    }
    console.log("moveAllowed", moveAllowed);
}

function freeze() {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] === 1) {
                board[row][col] = 2;
            }
        }
    }
}
//     if (dropAllowed) {
//         for (let row = matrix.length - 1; row >= 0; row--) {
//             for (let col = 0; col < matrix[row].length; col++) {
//                 matrix[row + 1][col] = matrix[row][col];
//                 matrix[row][col] = 0;
//             }
//         }
//     }
// }


function gameLoop() {
    console.log("gameloop");
    // clear context background
    clearCanvas();

    drawTetromino(Tshape, currentPos);
    dropPiece();
    setTimeout(gameLoop, 1000);
}

// drawTetromino(shapeT, currentPos);
// dropPiece();
gameLoop();
