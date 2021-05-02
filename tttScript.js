console.log("TicTacToe Script Initialized!")

const btn_submit = document.querySelector('#submitBtn');
const dvSetup = document.querySelector('.setup');
const dvGameContainer = document.querySelector('.gameContainer');
const pbtn1 = document.querySelector("#btn1");
const pbtn2 = document.querySelector("#btn2");
let gridItems = document.querySelectorAll('.ticGridItem');
let player1 = {name:"", choice:"", turn:false};
let player2 = {name:"", choice:"", turn:false};
let gameGrid = [];
//init
document.querySelector('#nPlayer1').value="";
document.querySelector('#nPlayer2').value="";

//listeners
for(let i=0; i<gridItems.length; i++){
    gridItems[i].addEventListener(
        'click', function(){
            let gid = gridItems[i].classList[1];
            gamePlacer(gid);
        }
    );
}

btn_submit.addEventListener(
    'click', function(){
        getPlayersData();
    }
);

pbtn1.addEventListener(
    'click', function(){
        if(pbtn1.value==="X"||pbtn1.value==="x"){
            pbtn1.value="O";
            pbtn2.value="X";
        }
        else{
            pbtn1.value="X";
            pbtn2.value="O";
        }
    }
);

pbtn2.addEventListener(
    'click', function(){
        if (pbtn2.value==="X"||pbtn2.value==="x"){
            pbtn2.value="O";
            pbtn1.value="X";
        }
        else{
            pbtn2.value="X";
            pbtn1.value="O";
        }
    }
);

btn_submit.addEventListener(
    'click', function(){
        getPlayersData();
    }
);

//functions
function getPlayersData(){
    //getting the player names and x/o
    player1.choice = pbtn1.value;
    player2.choice = pbtn2.value;
    //puting the names
    player1.name = document.querySelector('#nPlayer1').value;
    player2.name = document.querySelector('#nPlayer2').value;
    if(player1.name===""){
        player1.name = "Player 1";
    }
    if(player2.name===""){
        player2.name = "Player 2";
    }
    document.querySelector('.player1 h1').innerHTML=player1.name;
    document.querySelector('.player2 h1').innerHTML=player2.name;
    //Hiding the setup div and showing game div
    dvSetup.style = "display: none;";
    dvGameContainer.style = "display: grid;";
    //who's turn is it? the player who chose X will be the first.
    if(player1.choice=="X"){
        document.querySelector('.gameStatus h1').innerHTML = player1.name+"'s Turn!";
        player1.turn=true;
    }
    else{
        document.querySelector('.gameStatus h1').innerHTML = player2.name+"'s Turn!";
        player2.turn=true;
    }
}

function gamePlacer(grid){
    if(document.querySelector('.'+grid.toString()).innerHTML==""){
        let adrs = grid.slice(-1);
        if(player1.turn===true){
            document.querySelector('.'+grid.toString()).innerHTML=player1.choice;
            gameGrid[adrs]=player1.choice;
            player1.turn=false;
            player2.turn=true;
            document.querySelector('.gameStatus h1').innerHTML = player2.name+"'s Turn!";
        }
        else if(player2.turn===true){
            document.querySelector('.'+grid.toString()).innerHTML=player2.choice;
            gameGrid[adrs]=player2.choice;
            player1.turn=true;
            player2.turn=false;
            document.querySelector('.gameStatus h1').innerHTML = player1.name+"'s Turn!";
        }
    }
    gameState();
}

function gameState(){
   const winStates = [
       [0,1,2],
       [3,4,5],
       [6,7,8],
       [0,3,6],
       [1,4,7],
       [2,5,8],
       [0,4,8],
       [6,4,2],
   ];
   let same3;
   //winner?
   for(wsi=0; wsi<winStates.length; wsi++){
       same3="";
       for(adz=0; adz<3; adz++){
            same3 += gameGrid[winStates[wsi][adz]];
       }
        if(same3 === player1.choice.repeat(3)){
            document.querySelector('.gameStatus h1').innerHTML = player1.name+" WINS!";
            let gridChilds = document.querySelector('.ticGameContainer').children;
            for(let i=0; i<gridChilds.length; i++){
                gridChilds[i].style.pointerEvents="none";
            }
            break;
        }
        else if(same3 === player2.choice.repeat(3)){
            document.querySelector('.gameStatus h1').innerHTML = player2.name+" WINS!";
            let gridChilds = document.querySelector('.ticGameContainer').children;
            for(let i=0; i<gridChilds.length; i++){
                gridChilds[i].style.pointerEvents="none";
            }
            break;
       }
       else{
            //draw
            let counter=0;
            for(i=0; i<gameGrid.length; i++){
                if(gameGrid[i]==="X" || gameGrid[i]==="O"){
                    counter++;
                }
            }
            if(counter===9){
                document.querySelector('.gameStatus h1').innerHTML ="GAME OVER!";
            }
        }
   }
   
}