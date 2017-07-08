var player;
    var players;
    var moves = 0;
    var bx;
    var by;
    var boxArray = [];

    function blowUp (x, y) {
        box = boxes[y][x];
        audio = document.createElement("audio");
        audio.setAttribute("src", "app/assets/2cylableExplosion.ogg");
        audio.setAttribute("autoplay", "autoplay");
        audio.setAttribute("style", "display:none;");
        explosion = document.createElement("img");
        explosion.setAttribute("src", "app/assets/explosion_animated_gif.gif");
        explosion.setAttribute("class", "explosion");
        box.innerHTML = "";
        box.appendChild(explosion);
        box.appendChild(audio);
        setTimeout(function () {
            box.removeChild(explosion);
        }, 800);
        //setTimeout(function(){box.removeChild(audio);},2500);
    }


    function switchPlayers (e) {
        console.log(e.target);
        players = e.target.options[e.target.selectedIndex].value
    }

    function click (x, y) {
        if (boxes[y][x].children[0].getAttribute("value") == " ") {
            moves++;
            if (player == "player1") {
                boxes[y][x].children[0].setAttribute("value", "X");
                bombCheck(x, y);
                if (players == 1) {
                    player = "computer";
                    if (moves < 9) {
                        cx = Math.ceil(Math.random() * 2);
                        cy = Math.ceil(Math.random() * 2);
                        //console.log(boxes);
                        while (boxes[cy][cx].children[0].getAttribute("value") != " ") {
                            cx = Math.round(Math.random() * 2);
                            cy = Math.round(Math.random() * 2);
                        }
                        click(cx, cy);
                    }
                    player = "player1";
                } else {
                    player = "player2";
                }
                //bombCheck(cx,cy);
            } else {
                bombCheck(x, y);
                boxes[y][x].children[0].setAttribute("value", "O");

                player = "player1";
            }

        }
    }

    function buttonClick (e) {
        x = e.target.getAttribute("x");
        y = e.target.getAttribute("y");
        click(x, y);
    }

    function introAnimate (x) {
        boxArray[x].setAttribute("style", "transform:perspective(550px) translateZ(12px) rotate3d(1,0,0,16deg);-moz-transform:perspective(550px) translateZ(12px) rotate3d(1,0,0,16deg);-webkit-transform:perspective(550px) translateZ(12px) rotate3d(1,0,0,16deg);");
        x++;
        if (x < 9) {
            setTimeout(function () {
                introAnimate(x);
            }, 130);
        }
    }

    function initGame () {
        bx = Math.round(Math.random() * 2);
        by = Math.round(Math.random() * 2);
        console.log([bx, by]);
        player = "player1"; // or "computer" or "player2"
        players = 2;
        document.getElementById("playersSelect").onchange = switchPlayers;
        mainContainer = document.getElementById("container");
        boxes = [];
        for (y = 0; y < 3; y++) {
            boxes[y] = [];
            for (x = 0; x < 3; x++) {
                box = document.createElement("div");
                boxArray.push(box); // for animation
                box.setAttribute("class", "box");
                box.innerHTML = "";
                button = document.createElement("input");
                button.setAttribute("type", "button");
                button.setAttribute("x", x);
                button.setAttribute("y", y);
                button.setAttribute("value", " ");
                button.onclick = buttonClick;
                box.appendChild(button);
                mainContainer.appendChild(box);
                boxes[y][x] = box;

            }
            if (y < 2) {
                br = document.createElement("br");
                br.setAttribute("style", "clear:both;");
                mainContainer.appendChild(br);
            }
            setTimeout(function () {
                introAnimate(0);
            }, 130);
        }

    }


    function bombCheck(x, y, player) {
        if (bx == x && by == y) {
            boxes[y][x].setAttribute("style", "background:url(app/assets/impact.png);background-size:100% 100%;");
            blowUp(x, y);
        }
    }
