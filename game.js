var buttonColours = ["red", "blue", "green", "yellow"]; //Array containing button colors
var gamePattern = [] //Array containg randomly generated game pattern
var userClickedPattern = [] ////Array containg user clicked pattern

//Selects the next color in the game pattern sequence
function nextSequence(){
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

var randomChosenColour = nextSequence();

//On click of buttons
$("#" + randomChosenColour).click(function(){  //On click of red button
    var userChosenColour = randomChosenColour  //variable to store id of button clicked
    userClickedPattern.push(userChosenColour); //Add new userChosenColour to the end of the user clicked pattern.

    playsounds(userChosenColour);  //play the sound for the button colour selected
    animatePress(userChosenColour);
})   




