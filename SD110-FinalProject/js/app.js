/*
 * Create a list that holds all of your cards
 */
let listOfCards = document.querySelectorAll('.card');
let list = document.querySelector('.deck');
let cards = document.getElementsByClassName('card');
let numOfMoves = document.querySelector('.moves'); 
let matched = document.getElementsByClassName('match');
let restart = document.querySelector('.restart');
let moves = 0;
let stars = document.querySelectorAll(".fa fa-star");
let totalStars = document.querySelectorAll(".stars");
let openCards = []; //an empty array to hold the open cards
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML {to the page
 */   

for(let card of listOfCards){
    list.removeChild(card);
};
for(let card of shuffle(Array.from(listOfCards))){
    list.appendChild(card);
};
list.addEventListener('click',openCard);             
    
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
//Increments the no. of moves as the pair of cards is checked for match
function movesChecker() {
    moves = moves + 1;
    numOfMoves.textContent = moves;
     
}
/* A function that ckecks match and no-match conditions for the two opened cards.
*/
function openCard(e) {
    if ((openCards.length <= 2) && !(e.target.classList.contains('open', 'show')) && !(e.target.classList.contains('match'))) {
        e.target.classList.add('open', 'show');
        openCards.push(e.target);
    }if (openCards.length == 2) {
        movesChecker();
        starsUpdate(); 
        if (openCards[0].innerHTML === openCards[1].innerHTML) {
           makethematch()
           endGame()
        }else {
            setTimeout(function(){
                openCards[0].classList.remove("show", "open"); 
                openCards[1].classList.remove("show", "open"); 
                openCards = [];  
            }, 300);
        }
       
    }
}
/*
A function to check if the two opened cards match then add the match 
 class and remove both show and open classes to keep the cards open. 
*/
function makethematch() {
    openCards[0].classList.add("match");
    openCards[0].classList.remove("show", "open");
    openCards[1].classList.add("match");
    openCards[1].classList.remove("show", "open");
    openCards = [];
}
function endGame(){
    if (matched.length === 12) {
        moves++
        swal(
          'Good job!',
          'YOU WIN',
          'success'
        )  
    }
}
/* update the stars according to the moves */
function starsUpdate(){
    if(moves <= 20 && moves > 12){
        totalStars.innerHTML = stars + stars;
    }else if (moves > 20){
        totalStars.innerHTML = stars;
    }else{
        totalStars.innerHTML = stars + stars + stars;
    };
 };
/*
A reset function which resets the game*/
function restarted(){
    moves = 0;
    numOfMoves.textContent = moves;
    totalStars.innerHTML = stars + stars + stars;
    for(let card of listOfCards){
        card.classList.remove('open','match','show');

    }     
}
restart.addEventListener('click',restarted);