"use strict";
        function init(){
        var toggleArea = new ToggleMemberArea();
                if (localStorage.getItem("localUser") != null){
        toggleArea.showMemberArea();
        }

        var ws = new WebSocket("ws://borsti.inf.fh-flensburg.de:8080");
                //verbindung zum Websocket
                ws.onopen = function() {
                //1 = Verbunden
                console.log(this.readystate);
                }
        //reaktionen auf empfangener Daten des Clients
        ws.onmessage = function(e) {
        console.log(e.data);
                //  var otherUser = localStorage.getItem("neueruser");
                var str = e.data;
                var res = str.charAt(0);
                // Filterungen
                if (res != "+"){
                  //Wenn an erster Position eine 1 steht hat sich ein neuer user eingeloggt
                  if (res === "1"){
                    console.log("Neuer user eingeloggt: " + e.data);
                    var userOnline = localStorage.getItem("userCurrentlyOnline");
                    //  document.getElementById("memberArea").style.display = "block";
                    var toggleMArea = new toggleMemberArea();
                    localStorage.setItem("userCurrentlyOnline", parseInt(userOnline) + 1);
                    localStorage.setItem("neueruser", e.data);
                    //alert("neuer User ist beigetreten");
                    }
                  }
                }



        //Login User
        document.getElementById("playBTN").addEventListener("click", function(){
        var username = document.getElementById("usernameIN").value;
                var login = new Login(username, toggleArea);
                login.setUsername();
        });
                function time() {
                var now = new Date();
                        var hours = now.getHours();
                        var minutes = now.getMinutes();
                        var seconds = now.getSeconds();
                        var thetime = (hours < 10) ? "0" + hours + ":" : hours + ":";
                        thetime += (minutes < 10) ? "0" + minutes + ":" : minutes + ":";
                        thetime += (seconds < 10) ? "0" + seconds : seconds;
                        var clockDIV = document.getElementById("clock");
                        clockDIV.innerHTML = thetime;
                        var t = setTimeout(function(){ time() }, 500);
                }
        document.getElementById("logout").addEventListener("click", function(){
        var logout = new Logout(toggleArea);
                logout.logoutPlayer();
        });
        document.getElementById("singlePlayer").addEventListener("click",function(){
          //  checkActiveGame();
            var createGameBoard = new GameBoard("singlePlayer");
            document.getElementById("singlePlayer").setAttribute("class", "btnActive");
            createGameBoard.singlePlayer();

          });
        document.getElementById("multiPlayer").addEventListener("click",function(){
          var createGameBoard = new GameBoard("multiPlayer");
          document.getElementById("multiPlayer").setAttribute("class", "btnActive");
          createGameBoard.multiPlayer();
        });
}
window.addEventListener("load", init);
        //Login Klasse
class Login {
  constructor(username, toggleArea){
    this.username = username;
    this.toggleArea = toggleArea;
}
setUsername(){
//Hat der Spieler �berhaupt einen Usernamen eingegeben
if (this.username == ""){
  alert("Sie haben keinen Usernamen eingeben!");
}
else{
  if (localStorage.getItem("localUser") != null){
    this.toggleArea.showMemberArea();
  }
  else{
    localStorage.setItem("localUser", this.username);
    this.toggleArea.showMemberArea();
  }
}
}
        getUsername(){
          return this.username;
          }
        }
//Anzeigen des Login Feldes bzw. der MemberArea
class ToggleMemberArea{
constructor(){
}
showMemberArea(){
  document.getElementById("memberArea").style.display = "block";
  document.getElementById("loginArea").style.display = "none";
  var displayUserELement = document.getElementById("showUsername");
  var displayUsername = document.createTextNode(localStorage.getItem("localUser"));
  displayUserELement.appendChild(displayUsername);
}
showLoginArea(){
  document.getElementById("memberArea").style.display = "none";
  document.getElementById("loginArea").style.display = "block";
}

}
//logout Klasse
class Logout {
constructor(toggleArea) {
  this.toggleArea = toggleArea;
}
logoutPlayer(){
  localStorage.removeItem("localUser");
  this.toggleArea.showLoginArea();
}
}
class GameBoard{
  constructor(gameStyle){
    this.gameStyle = gameStyle;
    console.log(this.gameStyle);
    var documentFragement = document.createDocumentFragment();
    var gameBoard = document.createElement("TABLE");
    gameBoard.setAttribute("class",this.gameStyle);
    for(var i = 0; i<8;i++){
      var tableRow = document.createElement("TR");
      for(var j=0;j<5;j++){
        var tableData = document.createElement("TD");
        tableData.setAttribute("align","center");
        var roundDiv = document.createElement("DIV");
        roundDiv.style.border = "1px solid black";
        roundDiv.style.height = "30px";
        roundDiv.style.width = "30px";
        roundDiv.style.borderRadius  = "100%";
        tableData.appendChild(roundDiv);
        tableRow.appendChild(tableData);
      }
        documentFragement.appendChild(tableRow);

      }
      gameBoard.appendChild(documentFragement);
      document.getElementById("gameBoard").appendChild(gameBoard);
    }


  singlePlayer(){
    alert("Ein Neues Einzelspieler Modus Spiel wird erzeugt, bitte haben sie geduld");
    localStorage.setItem("gameActive","singlePlayer");
  }
  multiPlayer(){
    alert("Ein Neues Multispieler Modus Spiel wird erzeugt, bitte haben sie geduld");
    localStorage.setItem("gameActive","multiPlayer");
  }
}
