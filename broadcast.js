<script type="text/javascript">
  "use strict";
            (function() {
                //.....................................................
                var ws;
                var paragraphServerGesetzt = false;

                //.....................................................
                function $(id) {
                    return document.getElementById(id);
                }

                //.....................................................
                // vor dem firstChild text-Element und <br> einfügen:
                function schreib(text) {
                    $("outputID").insertBefore(document.createElement("BR"), $("outputID").firstChild);
                    $("outputID").insertBefore(document.createTextNode(text), $("outputID").firstChild);
                }

                //.....................................................
                function init() {
                    $("inputID").value = "";
                    $("inputID").focus();
                    paragraphServerGesetzt = false;

                    try {
                        ws = new WebSocket("localhost:8080");

                        ws.onopen = function() {
                            schreib("verbunden, readyState: " + this.readyState);
                            ws.send("gibUrlUndPort");
                        };
                        ws.onmessage = function(e) {

                            schreib("<-- empfangen: " + e.data);

                            if(!paragraphServerGesetzt)
                                setServerUndPortInParagraph(e.data);
                        };
                        ws.onclose = function() {
                            schreib("Verbindung beendet, readyState: " + this.readyState);
                            $("pServerID").textContent = "keine Verbindung";
                        };
                    }
                    catch(e) {
                        schreib(e.message)
                    }

                    document.getElementById("buttSendenID").addEventListener("click", senden, false);
                    document.getElementById("buttVerbindungBeendenID").addEventListener("click", verbindungBeenden, false);
                    document.getElementById("buttNeuVerbindenID").addEventListener("click", neuVerbinden, false);

                    document.getElementById("inputID").addEventListener("keydown", tasteImInputGedrueckt, false);
                }

                //.....................................................
                function senden() {
                    if(ws === null || ws.readyState != WebSocket.OPEN) {
                        schreib("Verbindung beendet oder noch nicht geöffnet.");
                        return;
                    }

                    var inputBox, nachricht;
                    inputBox = $("inputID");
                    nachricht = inputBox.value;

                    if(!nachricht) {
                        alert("Nachricht ist leer.");
                        $("inputID").focus();
                        return;
                    }
                    decode(nachricht);
                    inputBox.value = "";
                    inputBox.focus();

                    try {


                        ws.send(nachricht);
                        schreib('--> gesendet: ' + nachricht);
                    }
                    catch(e) {
                        schreib(e.message);
                    }
                }

                //.....................................................
                function verbindungBeenden() {
                    if(ws != null)
                        ws.close();
                    ws = null;
                }

                //.....................................................
                function setServerUndPortInParagraph(nachricht) {
                    var urlUndPort = "";
                    try {
                        if(nachricht.substr(0, 3) === "+++")
                            nachricht = nachricht.substring(3);

                        urlUndPort = JSON.parse(nachricht);
                        $("pServerID").textContent = "ws://" + urlUndPort.url + ":" + urlUndPort.port;
                        paragraphServerGesetzt = true;
                    }
                    catch(e) {
                    }
                }
                function decode(nachricht){
                   for(var i=0;i<nachricht.length;i++){

                  }
                }

                window.addEventListener("load", init, false);
