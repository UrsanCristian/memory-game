var btnColors = ['red', 'blue', 'green', 'yellow'];

var keyPressed = false;

var orderOfColors = [];

var userClicksData = [];

var level = 0;

function nextOrder() {
    userClicksData = [];
    level++;
    $("h1").text("Level " + level);

    var randomValue = Math.floor(Math.random() * 4);
    var randomColor = btnColors[randomValue];
    orderOfColors.push(randomColor);
    
    
    flashButton(randomColor);
    playSound(randomColor);
    
    
}

function flashButton(name) {
    $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(name) {
    var btnId = name;
    var volumeLevel = 0.1;
    switch (btnId) {
        case "red":
            var red = new Audio("./sounds/red.mp3");
            red.volume = volumeLevel;
            red.play();
            break;
        case "green":
            var green = new Audio("./sounds/green.mp3");
            green.volume = volumeLevel;
            green.play();
            break;
        case "yellow":
            var yellow = new Audio("./sounds/yellow.mp3");
            yellow.volume = volumeLevel;
            yellow.play();
            break;
        case "blue":
            var blue = new Audio("./sounds/blue.mp3");
            blue.volume = volumeLevel;
            blue.play();
            break;
        default:
            console.log('Press On The Buttons');
    };
}


function clickAnimation(color) {
    $("#" + color).addClass("pressed");

    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel) {

    if (userClicksData[currentLevel] === orderOfColors[currentLevel]) {
        console.log("succes");
        if (userClicksData.length === orderOfColors.length) {
            setTimeout(function() {
                nextOrder();
            }, 1000);
        };
    }   else {
        console.log("wrong");

        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.volume = 0.1;
        wrong.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");

        restart()
    }

}


function restart() {
    level = 0;
    orderOfColors = [];
    keyPressed = false;
}


$(".btn").click(function() {
    userColor = $(this).attr('id');
    userClicksData.push(userColor);
    playSound(userColor);
    clickAnimation(userColor);
    checkAnswer(userClicksData.length - 1)
});


$(document).on("keydown", function() {

    if (!keyPressed) {
        $("h1").text("Level " + level);
        nextOrder();
        keyPressed = true;
    }
});


