var buttonColours = ["red", "blue", "green", "yellow"]; //Array containing button colors
var gamePattern = []; //Array containg randomly generated game pattern
var userClickedPattern = []; ////Array containg user clicked pattern
var level = 0; //Current game level
var started = false;

//First keypress begins game
$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

//On click of buttons
$(".btn").click(function(){  //On click of red button
    var userChosenColour = $(this).attr("id");  //variable to store id of button clicked
    userClickedPattern.push(userChosenColour); //Add new userChosenColour to the end of the user clicked pattern.

    playsounds(userChosenColour);  //play the sound for the button colour selected
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1) //Pass in index of the last answer in user pattern
})   

//Selects the next color in the game pattern sequence
function nextSequence(){
    level++; //Increase the level by 1 every time nextSequence() is called.
    $("#level-title").text("Level " + level); //Updates the h1 with current value of level.

    var randomNum = Math.floor(Math.random() * 4); //generates random number between 0 and 3,
    var randomChosenColour = buttonColours[randomNum] //select random colour from the buttonColours array.
    gamePattern.push(randomChosenColour); // Add new randomChosenColour to the end of the gamePattern.

    playsounds(randomChosenColour);  //play the sound for the button colour selected
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100); //animate a flash to the button with the same id as the randomChosenColour with jQuery

    return randomChosenColour
}

//Play Sound
function playsounds(name){
    var colour = new Audio("sounds/" + name + ".mp3");
    colour.play();
}

//Animate Button for 100ms
function animatePress(currentColour){
    //Adds CSS style to element
    $("#" + currentColour).addClass("pressed");   
    //Removes CSS style to element after 100ms
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");  
    },  100);
}

//Checks user's answer
function checkAnswer(currentLevel){
    //If user gets pattern right
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){ 
        //check if userhas finished their sequence
        if(gamePattern.length === userClickedPattern.length){ 
            //After a 1000ms delay, call next color in the sequence
            setTimeout(function() { 
                nextSequence();
            },  1000);
            //reset user array for the next round
            userClickedPattern = [];
        }
    } else{ //If user fails to get pattern right
         //Play game over sound
        var fail = new Audio("sounds/wrong.mp3"); 
        fail.play();

        //Flash gameover screen for 200ms
        $("body").addClass("game-over");   
        setTimeout(function() {
            $("body").removeClass("game-over");  
        },  200);

        //Change header to failure state
        $("#level-title").text("Game Over, Press Any Key to Restart"); 

        //Restart Game
        startOver()
    }
}   

//Restart Game
function startOver(){
    //Reset Game variables
    gamePattern = []; 
    userClickedPattern = [];
    level = 0;
    started = false;
}

