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
    var documentFragement = document.createDocumentFragment();
    var gameBoard = document.createElement("TABLE");

    gameBoard.setAttribute("class",this.gameStyle);
    gameBoard.style.borderSpacing ="0px";
    for(var i = 0; i<8;i++){
      var tableRow = document.createElement("TR");
      for(var j=0;j<4;j++){
        var tableData = document.createElement("TD");
        var bowls = document.createElement("DIV");
        bowls.setAttribute("class","bowls");
        tableData.setAttribute("class","gameData")
        tableData.setAttribute("id",i + ""+j)
        tableData.setAttribute("align","center");
        tableData.appendChild(bowls);
        tableRow.appendChild(tableData);
      }
        documentFragement.appendChild(tableRow);
      }

      gameBoard.appendChild(documentFragement);
      document.getElementById("gameBoard").appendChild(gameBoard);
      var indikatorBoard = document.createElement("TABLE");
      indikatorBoard.style.borderSpacing = "0px"
      for(var i=0;i<16;i++){
        var indikatorRow = document.createElement("TR");
        for(var j=0;j<2;j++){
          var indikatorData = document.createElement("TD");
          var indikatorBowls = document.createElement("DIV");
          indikatorBowls.setAttribute("class","indikatorBowls");
          indikatorData.setAttribute("align","center");
          indikatorData.setAttribute("id",i + ""+j)
          indikatorData.setAttribute("class","indikatorData");
          indikatorData.appendChild(indikatorBowls);
          indikatorBoard.appendChild(indikatorRow);
          indikatorRow.appendChild(indikatorData);
          document.getElementById("gameBoard").appendChild(indikatorBoard);
        }
      }

    }
  singlePlayer(){
    localStorage.setItem("gameActive","singlePlayer");
    var tds = document.getElementsByTagName('td');

  for (var i = 0; i < tds.length; i++) {
      tds[i].addEventListener("click",clickHandler);
  }

  function clickHandler(event) {
      alert(event.target.innerHTML = "dies");
  }
}





  multiPlayer(){


    localStorage.setItem("gameActive","multiPlayer");
  }
}
