"use strict";
function init(){

  //Wenn ein Spieler auf Pause drückt, werden die Drag Events gelöscht
  document.getElementById("break").addEventListener("click",function(){
    document.getElementById("rot").setAttribute("ondragstart","return false");
    document.getElementById("gelb").setAttribute("ondragstart","return false");
    document.getElementById("grün").setAttribute("ondragstart","return false");
    document.getElementById("lila").setAttribute("ondragstart","return false");
    document.getElementById("blau").setAttribute("ondragstart","return false");
    document.getElementById("braun").setAttribute("ondragstart","return false");
    var tds = document.getElementsByTagName("TD")
    for(var i=0;i<tds.length;i++){
      tds[i].setAttribute("class","notactive");
    }
  });
  //Wenn der Spieler auf start drückt werden die Drag events zurück geschrieben
  document.getElementById("start").addEventListener("click",function(){
    document.getElementById("rot").setAttribute("ondragstart","ziehen(event)");
    document.getElementById("gelb").setAttribute("ondragstart","ziehen(event)");
    document.getElementById("grün").setAttribute("ondragstart","ziehen(event)");
    document.getElementById("lila").setAttribute("ondragstart","ziehen(event)");
    document.getElementById("blau").setAttribute("ondragstart","ziehen(event)");
    document.getElementById("braun").setAttribute("ondragstart","ziehen(event)");
    var tds = document.getElementsByTagName("TD")
    for(var i=0;i<tds.length;i++){
      tds[i].removeAttribute("class","notactive");
    }
  });
  var check = 0;

  document.getElementById("check").addEventListener("click",function(){
    check = check+1;
    var checkstring = "row"+check;
    document.getElementById("activeRow").removeAttribute("ondragover");
    var nextRow = document.getElementById(check);
    nextRow.setAttribute("id","activeRow");
    nextRow.setAttribute("ondragover","ablegenErlauben(event)")
    nextRow.setAttribute("ondrop","ablegen(event)");
    console.log(check);
  })
  var ws = new WebSocket("ws://borsti.inf.fh-flensburg.de:8080");
  //verbindung zum Websocket
    ws.onopen = function() {
      //1 = Verbunden
      console.log(this.readystate);
  }
  //reagtionen auf empfangener Daten des Clients
  ws.onmessage = function(e) {
    console.log(e.data);
    //  var otherUser = localStorage.getItem("neueruser");
    var str = e.data;
    var res = str.charAt(0);
    // Filterungen
    if(res != "+"){
      //Wenn an erster Position eine 1 steht hat sich ein neuer user eingeloggt
      if(res === "1"){
        console.log("Neuer user eingeloggt: " + e.data);
          var userOnline = localStorage.getItem("userCurrentlyOnline");
          localStorage.setItem("userCurrentlyOnline",parseInt(userOnline)+1);
          localStorage.setItem("neueruser",e.data);
          //alert("neuer User ist beigetreten");
      }
    }
  };
  //Abfrage ob schon ein von dem Browser schon eingeloggt wurde
  if(localStorage.getItem("username") != null){
      console.log("Es ist bereits ein user eingeloggt");
      console.log("Eingeloggter User: " + localStorage.getItem("username"));
      //template memberArea laden
      showMemberArea();
      //ausblenden des Login Feldes
      document.getElementById("loginField").style.display = "none";
      //einblenden der Member Area
      document.getElementById("memberArea").style.display = "block";
      time();
  }
  //wenn noch kein username im Webstorage ist wird die Eingabe bearbeitet
  else{
    document.getElementById("playBTN").addEventListener("click",function(){
      var username = document.getElementById("usernameIN").value;
      //Eingeloggten Username in den localStorage speichern
      localStorage.setItem("username",username);
      ws.send("1"+username);
      //abfragen wie viele user online sind
      var userOnline = localStorage.getItem("userCurrentlyOnline");
      if(userOnline === null){
      console.log("Es ist gerade kein weiterer User online");
      localStorage.setItem("userCurrentlyOnline",1);
      }
      else{
        localStorage.setItem("userCurrentlyOnline",parseInt(userOnline)+1);
        console.log("es sind bereits" + localStorage.getItem("userCurrentlyOnline") + "dabei");
        }
        console.log("User ist nicht vorhanden und wird nun in den Webstorage gespeichert");
        //template memberArea laden
        showMemberArea();
        //ausblenden des Login Feldes
        document.getElementById("modal").style.display = "none";
        //einblenden der memberArea
        document.getElementById("memberArea").style.display = "block";
        time();
    });
  }
  function getUsername(){
    var username = localStorage.getItem("username");
    return username;
  }
  function showMemberArea(){
    document.getElementById("showUsername").innerHTML = getUsername();
    document.getElementById("nbrUserOnline").innerHTML = localStorage.getItem("userCurrentlyOnline");
  }
  function gameboard(){

  }
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
  document.getElementById("logout").addEventListener("click",function(){
    ws.send("ausloggen " + localStorage.getItem("username"));
    localStorage.removeItem("username");
    document.getElementById("modal").style.display = "flex";
    document.getElementById("memberArea").style.display = "none";
  })
}
window.addEventListener("load",init);
