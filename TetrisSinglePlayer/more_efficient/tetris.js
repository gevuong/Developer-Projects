const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d"); 
// provides a 2d context for the drawing surface of a canvas element. Used to draw rectangles, text, images, or other objects onto canvas element

ctx.scale(20, 20);

ctx.fillStyle = "#000"; // fill ctx with black background
ctx.fillRect(0, 0, canvas.width, canvas.height); 
// draw rectangle: ctx.fillRect(x, y, width, height), where (x, y) are components of rectangle's starting point

// represent tetrominoes as a 2d matrix. We have extra row to rotate about the center piece. It would be difficult if it was only two rows.  
const shapeT = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
];

const shapeO = [
    [1, 1],
    [1, 1],
];

const playerPos = {
    x: 5, 
    y: 0,
};

// board is meant to keep track of location of droppedPieces
function drawBoard(width, height) {
    const board = [];
    for (let row = 0; row < height; row++) {
        board.push(new Array(width).fill(0));
    }
    console.log(board);
} 


function drawPiece(matrix, pos) {
    matrix.forEach((row, rowIdx) => {
        row.forEach((col, colIdx) => {
            if (col !== 0) {
                ctx.fillStyle = "red";
                ctx.fillRect(colIdx + pos.x, rowIdx + pos.y, 1, 1); // iterate through x-comp (colIdx) first to fillStyle red.
            }
        });
    });
}
// alternative #drawMatrix()
// function drawMatrix() {
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
    playerPos.y++;
}


document.addEventListener("keydown", event => {
    console.log(event.keyCode);
    if (event.keyCode === 37) {
        playerPos.x--;
    } else if (event.keyCode === 39) {
        playerPos.x++;
    } else if (event.keyCode === 40) {
        dropPiece();
    }
});
// function collide(matrix) {
//     var dropAllowed = true;
//     for (let row = 0; row < matrix.length; row++) {
//         for (let col = 0; col < matrix[row].length; col++) {
//             // check if we're looking at currentPiece
//             if (matrix[row][col] !== 0) {
//                 // check if element beneath currentPiece is zero, if not, drop is not allowed
//                 if (matrix[row + 1][col] !== 0) {
//                     dropAllowed = false;
//                 }
//             }
//         }
//     }
//     console.log(dropAllowed);
    
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
    
    ctx.fillStyle = "#000"; // fill ctx with black background
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
    drawPiece(shapeT, playerPos);
    dropPiece(playerPos);
    setTimeout(gameLoop, 1000);
}

// drawPiece(shapeT, playerPos);
// dropPiece(shapeT);
gameLoop();



