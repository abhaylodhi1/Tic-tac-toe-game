console.log("Tic Tac Toe") 
// Initial variables
let turn = "X" // The player who will start, "X" goes first
let isgameover = false // A flag to check if the game is over or not

// Function to switch between players "X" and "O"
const changeTurn = ()=> {
    return turn === "X" ? "0" : "X"; // If it's "X", change to "0", else change to "X"
}

// Function to check if a player has won
const checkWin = ()=> {
    let boxtext = document.getElementsByClassName('boxtext'); // Get all the box text elements
    // Define winning combinations
    let wins = [
        [0, 1, 2, 5, 5, 0],   
        [3, 4, 5, 5, 15, 0],  
        [6, 7, 8, 5, 25, 0],  
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90], 
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45], 
        [2, 4, 6, 5, 15, 135] 
    ];

    // Loop through all the winning combinations
    wins.forEach(e => {
        // Check if the three boxes in the combination have the same text and are not empty
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && 
           (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && 
           (boxtext[e[0]].innerText !== "")) {
            // If there is a winner  display the winner and update the game state
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won"; // Show the winner's name
            isgameover = true; // Set the game over flag to true
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px"; // Show an image (winner's gif)
            // Add a visual line indicating the winning combination
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw"; // Adjust the width of the line
        }
    })
}

// Game Logic
// Get all the boxes (9 in total)
let boxes = document.getElementsByClassName("b");

// Loop through each box and add a click event listener
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext'); // Get the text element inside the box

    // When a player clicks on a box, this function runs
    element.addEventListener('click', ()=> {
        // If the box is empty, fill it with the current player's symbol
        if(boxtext.innerText === '') {
            boxtext.innerText = turn; // Set the box's text to the current player's symbol
            turn = changeTurn(); // Change the turn to the other player
            
            checkWin(); // Check if there's a winner after the move
            // If the game is still ongoing, display the current player's turn
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
            }
        }
    })
})

// Add onclick listener to reset button to restart the game
reset.addEventListener('click', ()=> {
    let boxtexts = document.querySelectorAll('.boxtext'); // Get all the box text elements
    // Reset the game by clearing the text in all the boxes
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    // Reset the game state
    turn = "X"; // Start with player "X"
    isgameover = false; // Game is not over
    document.querySelector(".line").style.width = "0vw"; // Hide the winning line
    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn; // Display the current player's turn
})
