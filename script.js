//Take initial snapshot of scoresheet and dice to reset later on when New Game button is clicked
var initialScoresheet = document.getElementById("scoresheet").innerHTML;
var initialDiceImage = document.getElementById("diceContainer").innerHTML;

//Variable to temporarily hold selected radio button value
var selectedValue;

//Variable to hold green check mark image
var checkmark = "<img src='images/checkmark.png'>";

//Variables that refer to the button IDs
var roll = document.getElementById("btRoll");
var newGame = document.getElementById("btNewGame");
var keepScore = document.getElementById("btKeepScore");

//Variable for all radio buttons
var radioButtons = document.getElementsByName("score");

//Array to hold random numbers
var randomArr = [];

//Array to keep track of occurrence of each number in random array
var countArr = [0,0,0,0,0,0];

//Array to hold sorted values
var sortedArr = [];

//Variable that keeps track of dice rolls per round
var count;

//Variable that keeps track of total number of rounds--when max is reached, game is over
var totalRounds = 0;

//Variables to hold score values
var upperTotalScore = 0;
var lowerTotalScore = 0;
var grandTotalScore = 0;

//Keeps track of whether upper bonus has already been applied
var hasUpperBonus = 0;

//Keeps track of whether Yahtzee was reached
var hasYahtzee = false;


//Array of image elements on page
var imgElements = [document.getElementById("firstDice"),
    document.getElementById("secondDice"),
    document.getElementById("thirdDice"),
    document.getElementById("fourthDice"),
    document.getElementById("fifthDice")];


//Event listeners for buttons
roll.addEventListener("click", rollDice);
keepScore.addEventListener("click", keepSelectedScore);
newGame.addEventListener("click", resetGame);

//Function that's called when New Game button is clicked
function resetGame() {
    //Reset variables
    count = 0;
    totalRounds = 0;
    upperTotalScore = 0;
    lowerTotalScore = 0;
    grandTotalScore = 0;
    hasUpperBonus = 0;
    hasYahtzee = false;
    
    //Restore scoreesheet and dice images to original/initial state
    document.getElementById("scoresheet").innerHTML = initialScoresheet;
    
    for(var i = 0; i < imgElements.length; i++) {
        imgElements[i].src = setImgSource(i + 1);
    }
    }

//Get five random numbers for the dice and store in randomArr array
function getRandomNum() {
    for(var i = 0; i < 5; i++) {
        //Generate a random number between 1 and 6
        randomArr[i] = Math.ceil(Math.random() * 6);
    }
       //Reset the countArr array before calling it again
       countArr = [0,0,0,0,0,0];
       sortedArr = [];
        

       return randomArr;    
}

//This function counts the occurence of each number in the randomArr and is used as part of the sorting method
//And also helps determing if a fullhouse exists
function getNumCount() {
    for (var i = 0; i < randomArr.length; i++) {
        var tempNum = randomArr[i] - 1;
        ++countArr[tempNum];
    }    
}

//Function that sorts array, using the count array
function sortArray() {
    for(var i = 0; i < countArr.length; i++) {
        var counter = 0;
        while(counter < countArr[i]) {
            if(countArr[i] > 0) {
                sortedArr.push((i + 1));
            }
            counter++;
        }
    }
}



//Assign image src based on random number passed to the function
function setImgSource(value) {
    switch(value) {
        case 1:
            return "images/1.png";
        case 2:
            return "images/2.png";
        case 3:
            return "images/3.png";
        case 4:
            return "images/4.png";
        case 5:
            return "images/5.png";
        case 6:
            return "images/6.png";
        default:
            break;
    }
}

//Function that's called with Roll button is clicked
function rollDice() {
    //If user has reached max rolls for that turn or finished the game, do nothing and exit function
    if(count >= 3 || totalRounds >= 13)
        return;

    //Fill randomArr array with new random numbers and then sort array and get counts
    getRandomNum();
    getNumCount();
    sortArray();
    
    //Iterate through the imgElements array and assign each image src to a number in the array of random images
    for(var i = 0; i < imgElements.length; i++) {
        imgElements[i].src = setImgSource(randomArr[i]);
    }

    //Increment count
    count++;

  
}

  //Get the value of the selected radio button
  function getSelectedValue() {
    for(var i = 0; i < radioButtons.length; i++) {
        if(radioButtons[i].checked) {
            //Store the value of the selected rb in the selectedValue var
            selectedValue = radioButtons[i].value;

           // return selectedValue;
        }
    }
}

//Function that calculates score
function keepSelectedScore() {
    //Reset roll count 
    count = 0;


    getSelectedValue();

    if(selectedValue == "1")
    {
        document.getElementById("ones").innerHTML = checkmark;
        document.getElementById("ones_points").innerHTML = calculateUpperScore(1);
    } else if(selectedValue == "2")
    {
        document.getElementById("twos").innerHTML = checkmark;
        document.getElementById("twos_points").innerHTML = calculateUpperScore(2);
    } else if(selectedValue == "3")
    {
        document.getElementById("threes").innerHTML = checkmark;
        document.getElementById("threes_points").innerHTML = calculateUpperScore(3);
    } else if(selectedValue == "4")
    {
        document.getElementById("fours").innerHTML = checkmark;
        document.getElementById("fours_points").innerHTML = calculateUpperScore(4);
    } else if(selectedValue == "5")
    {
        document.getElementById("fives").innerHTML = checkmark;
        document.getElementById("fives_points").innerHTML = calculateUpperScore(5);
    } else if(selectedValue == "6")
    {
        document.getElementById("sixes").innerHTML = checkmark;
        document.getElementById("sixes_points").innerHTML = calculateUpperScore(6);
    } else if(selectedValue == "threeOfAKind")
    {
        document.getElementById("threeKind").innerHTML = checkmark;
        calculateLowerScore(selectedValue); 
    } else if(selectedValue == "fourOfAKind")
    {
        document.getElementById("fourKind").innerHTML = checkmark;
        calculateLowerScore(selectedValue);
    } else if(selectedValue == "fullhouse")
    {
        document.getElementById("fullhouse").innerHTML = checkmark;
        calculateLowerScore(selectedValue);
    } else if(selectedValue == "smStraight")
    {
        document.getElementById("smStraight").innerHTML = checkmark;
        calculateLowerScore(selectedValue);
    } else if(selectedValue == "lgStraight")
    {
        document.getElementById("lgStraight").innerHTML = checkmark;
        calculateLowerScore(selectedValue);
    } else if(selectedValue == "yahtzee")
    {
        document.getElementById("yahtzee").innerHTML = checkmark;
        calculateLowerScore(selectedValue);
    } else if(selectedValue == "chance")
    {
        document.getElementById("chance").innerHTML = checkmark;
        calculateLowerScore(selectedValue);
    }
    
    //Increase total rounds
    totalRounds++;

    if(totalRounds == 13) {
        document.getElementById("diceContainer").innerHTML = "Game Over! <br>" + 
            "Final Score: " + grandTotalScore + "<br>" +
             "Click New Game to start a new game";
    }

}



function calculateUpperScore(value) {
    var sum = 0;
    console.log("value: " + value);
    for(var i = 0; i < randomArr.length; i++) {
        if(randomArr[i] == value) {
            sum += value;
        }       
    }
    //Update total of upper score
    upperTotalScore += sum;
    document.getElementById("upperSubTotal").innerHTML = upperTotalScore;

    if(upperTotalScore > 63) {
        if(hasUpperBonus == 0) {
            document.getElementById("upperBonusCheck").innerHTML = checkmark;
            document.getElementById("upperBonus").innerHTML = 35;
            upperTotalScore += 35;
        }
        hasUpperBonus++;       
    }

    //Calculate overall total score
    grandTotalScore += upperTotalScore;
    document.getElementById("grandTotal").innerHTML = grandTotalScore;
    return sum;
}

function calculateLowerScore(value){
    if(value == "threeOfAKind") {
        for(var i = 0; i < countArr.length; i++) {
            if(countArr[i] >= 3) {
                var sum = 0;
                for(var j = 0; j < randomArr.length; j++) {
                    sum += randomArr[j];
                }
                    lowerTotalScore += sum;
                    document.getElementById("threeKindTotal").innerHTML = sum;
                    grandTotalScore +=  lowerTotalScore;
                    document.getElementById("grandTotal").innerHTML = grandTotalScore;
                    document.getElementById("lowerTotal").innerHTML = lowerTotalScore;
                    return;
             } 
             document.getElementById("threeKindTotal").innerHTML = 0;
        }
    } 

    if(value == "fourOfAKind") { 
        for(var i = 0; i < countArr.length; i++) { 
            console.log(countArr[i]);
            if(countArr[i] >= 4) {
                var sum = 0;
                for(var j = 0; j < randomArr.length; j++) {
                    sum += randomArr[j];
                }
                    lowerTotalScore += sum;
                    document.getElementById("fourKindTotal").innerHTML = sum;
                    grandTotalScore +=  lowerTotalScore;
                    document.getElementById("grandTotal").innerHTML = grandTotalScore;
                    document.getElementById("lowerTotal").innerHTML = lowerTotalScore;
                    return
             } 
                document.getElementById("fourKindTotal").innerHTML = 0;          
        }
    }

    if(value=="smStraight") { 
        var counter = 0;
        for(var i = 0; i < sortedArr.length - 1; i++) {
            if((sortedArr[i + 1]) - sortedArr[i] == 1) {
                counter++;
            }
        } 
        if(counter >= 3) {
            lowerTotalScore += 30;
            document.getElementById("smStraightTotal").innerHTML = 30;
        } else {
            document.getElementById("smStraightTotal").innerHTML = 0;
        }
    }

    if(value=="lgStraight") {
        var counter = 0;
        for(var i = 0; i < sortedArr.length - 1; i++) {
            if((sortedArr[i + 1]) - sortedArr[i] == 1) {
                counter++;
            }
        } 
        if(counter >= 4) {
            lowerTotalScore += 40;
            document.getElementById("lgStraightTotal").innerHTML = 40;
        } else {
            document.getElementById("lgStraightTotal").innerHTML = 0;
        }
    }

    if(value == "fullhouse") {
        var hasThreeSet = false;
        var hasTwoSet = false;
        for(var i = 0; i < countArr.length; i++) {
            if(countArr[i] == 3)
                hasThreeSet = true;
            if(countArr[i] == 2)
                hasTwoSet = true;
        }
        if(hasThreeSet && hasTwoSet) {
            document.getElementById("fullhouseTotal").innerHTML = 25;
            lowerTotalScore += 25;
        } else {
            document.getElementById("fullhouseTotal").innerHTML = 0;
        }            
    }

    if(value == "chance") {
        var sum = 0;
        for(var i = 0; i < randomArr.length; i++) {
            sum += randomArr[i];
        }

        lowerTotalScore += sum;
        document.getElementById("chanceTotal").innerHTML = sum;
    }
    
    if(value == "yahtzee") {
        var sample = randomArr[0];
        for(var i = 0; i < randomArr.length; i++) {
            if (randomArr[i] != sample) {
                document.getElementById("yahtzeeTotal").innerHTML = 0;
                hasYahtzee = false;
                return;
            } else {
                hasYahtzee = true;
            }

            if(hasYahtzee) {
                document.getElementById("yahtzeeTotal").innerHTML = 50;
                lowerTotalScore += 50;
            }
        }
    }

    //Calculate overall total score
    grandTotalScore +=  lowerTotalScore;
    document.getElementById("grandTotal").innerHTML = grandTotalScore;
    document.getElementById("lowerTotal").innerHTML = lowerTotalScore;
}

