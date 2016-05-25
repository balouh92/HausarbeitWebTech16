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
                }
window.addEventListener("load", init);
        //Login Klasse
        class Login {
        constructor(username, toggleArea){
        this.username = username;
                this.toggleArea = toggleArea;
        }
        setUsername(){
            //Hat der Spieler überhaupt einen Usernamen eingegeben
        if (this.username == "")
        {
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
        document.getElementById("mainWrapper").style.display = "none";
}
showLoginArea(){
document.getElementById("memberArea").style.display = "none";
        document.getElementById("mainWrapper").style.display = "block";
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