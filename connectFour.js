/*Connect Four. November 2015. Joe LaChance. v1.0*/

//GLOBAL VARIABLES
var divPrint = document.getElementById('gameBoard');
var counter = 0;
var columnHeader = '1234567' + '<br />'
var boardArray = [
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0], 
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0]
];

/* - 1 - PLAYER COUNTER - KEEPS TRACK OF WHOSE TURN IT IS */
function playerCounter() {
	counter += 1;
	switchPlayer();
}

/* - 2 - SWITCHES PLAYS BETWEEN PLAYER 1 & PLAYER 2. CHANGES PLAYER PROMPT */
function switchPlayer() {
	var playerPrompt = document.getElementById('playerPrompt');

	if (counter % 2 == 0) {
		playerPrompt.innerHTML = "PLAYER ONE'S TURN!";
	} else {
		playerPrompt.innerHTML = "PLAYER TWO'S TURN!"
	}

	playerPiece();
}

/* - 3 - TAKES USER INPUT AND PUSHES IT TO THE boardArray */
function playerPiece() {
	var input = document.getElementById('pOne_input');
	var col = parseInt(input.value) - 1;

	var row = nextRow(col);
	var player = 0;

	if (counter % 2 == 0) {
		player = 2;
		boardArray[row][col] = 2;
	} else {
		player = 1;
		boardArray[row][col] = 1;
	}
///////// IMPLEMENT PLAYER VAR FOR CHECK FUNCTIONS /////////////
	printScn();
	horizontalWin(row);
	verticalWin(col);
	diagonalWin(row, col)
	announceWin();
	
}

/* - 4 - (inside 3) LOOPS THROUGH boardArray COLUMNS TO FIND LOWEST OPEN SLOT */
function nextRow(x) {
	row = 0;
	while (row < boardArray.length && boardArray[row][x] == 0) {
		row += 1;
	}
	return row - 1;
}

/* - 5 - PRINTS CONNECT FOUR BOARD WHEN USER SUBMITS INPUT */
function printScn() {
	divPrint.innerHTML = printBoard();
}

/*  - 6 - (inside 5) PRINTS THE GAME BOARD */
function printBoard() {
	board = [];
	for (i = 0; i < boardArray.length; i++) {
		for (j = 0; j < boardArray[i].length; j++) {
				board += boardArray[i][j];
			}
		board += '<br />'
	}
	return columnHeader + board;
}

// HORIZONTAL. SHOULD WORK! 
function horizontalWin(row) {
	var hWins = false;
	var count = 0;

    for (j = 0; j < boardArray[row].length; j++) {
    	if (boardArray[row][j] == 1)
    		count += 1;
    	else
    		count = 0;
   
    	if (count >= 4) 
    		hWins = true;
    	else
    		hWins = false;
   	}
	return hWins;
}

//VERTICAL.
function verticalWin(col) {
	var vWins = false;
	var count = 0;

		for (i = 0; i < boardArray.length; i ++) {
			if (boardArray[i][col] == 1)
				count += 1;
			else
				count = 0;

			if (count >= 4) 
	    	vWins = true;
	    else
	    	vWins = false;
	  }
	return vWins;

}

//DIAGONAL.
function diagonalWin(row, col) {

	var m = math.min(row, col);
	var i = row - m;
	var j = col - m;

	var dWins = false;
	var count = 0;

	while (i < (boardArray.length - 1) && j < boardArray.length && !dWins) {

	if (boardArray[i][j] == 1)
		count += 1;
	else
		count = 0;

	if (count >= 4) 
	  dWins = true;
	else
	  dWins = false;

	i += 1;
	j += 1;

	}
	return dWins;
} 

function announceWin(hWins) {

	if (hWins || vWins || dWins)
		playerPrompt.innerHTML = 'PLAYER ONE WINS'
	else
		playerPrompt.innerHTML = 'DID NOT WIN'
}
