const doorImage1 = document.getElementById('door1');
const doorImage2 = document.getElementById('door2');
const doorImage3 = document.getElementById('door3');

let startButton = document.getElementById('start');
let counter = document.getElementById('counter');
let winning = 0;

counter.classList.add('initial-counter');

const botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
const beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
const spaceDoorPath  = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";

let numClosedDoors = 3;

let closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";

let currentlyPlaying = true;

let openDoor1;
let openDoor2;
let openDoor3;

let isBot = door => {
    if(door.src === botDoorPath){
        return true;
    } else {
        return false;
    }
}

let isClicked = door => {
    if(door.src === closedDoorPath){
        return false;
    } else {
        return true;
    }
};

let playDoor = door => {
    numClosedDoors--;
    if(numClosedDoors === 0){
        gameOver('win');
    } else if (isBot(door)) {
        gameOver();
    };
};

let randomChoreDoorGenerator = () => {
    let choreDoor = Math.floor(Math.random() * numClosedDoors)
    if (choreDoor === 0){
        openDoor1 = botDoorPath;
        openDoor2 = spaceDoorPath;
        openDoor3 = beachDoorPath;
    } else if (choreDoor === 1){
        openDoor2 = botDoorPath;
        openDoor3 = spaceDoorPath;
        openDoor1 = beachDoorPath;
    } else {(choreDoor === 2)
        openDoor3 = botDoorPath;
        openDoor1 = spaceDoorPath;
        openDoor2 = beachDoorPath;
    };
};


doorImage1.onclick = () => {
    if(currentlyPlaying && !isClicked(doorImage1)) {     
        doorImage1.src = openDoor1;
        playDoor(doorImage1);
    };
};

doorImage2.onclick = () =>{
    if(currentlyPlaying && !isClicked(doorImage2)) {     
        doorImage2.src = openDoor2;
        playDoor(doorImage2);
    };
};

doorImage3.onclick = () =>{
    if(currentlyPlaying && !isClicked(doorImage3)) {     
        doorImage3.src = openDoor3;
        playDoor(doorImage3);
    };
};

startButton.onclick = () => {
    if(currentlyPlaying === false){
        startRound();
    };
};

let startRound = () => {
    numClosedDoors = 3;
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    startButton.innerHTML = "Good Luck!";
    currentlyPlaying = true;
    startButton.classList.add('initial-button');
    startButton.classList.remove('loosing-button');
    startButton.classList.remove('winning-button');
    randomChoreDoorGenerator();
}

let gameOver = status => {
    if(status === 'win'){
        startButton.classList.remove('initial-button');
        startButton.classList.remove('loosing-button');
        startButton.classList.add('winning-button');
        startButton.innerHTML = "You win! Press to play again.";
        winning += 1;
        counter.innerHTML = `Your winning streak is: ${winning}`;
        
    } else {
        winning = 0;
        startButton.classList.remove('initial-button');
        startButton.classList.remove('winning-button');
        startButton.classList.add('loosing-button');
        startButton.innerHTML = "Game over! Press to play again.";
        counter.innerHTML = 'Your winning streak is: 0';
    }
    currentlyPlaying = false;
};

startRound();