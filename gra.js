let gra = {
    //zmienne globalne
    //aktualnyX i Y określają gdzie znajduje się pusty klocek
    aktualnyX: 600,
    aktualnyY: 600,
    //teraz to globalna zmienna do przechowywania ile czasu upłynęło
    dopokazania: "",
    //czas to globalna zmienna interwału timera
    czas: 0,

    generuj: function () {
        let overlay = document.createElement("div");
        overlay.id = "overlay";
        overlay.style.display = "none";
        document.body.appendChild(overlay);

        let monit = document.createElement("div");
        monit.id = "monit";
        monit.style.display = "none";
        document.body.appendChild(monit);

        let tekstMonitu = document.createElement("p");
        tekstMonitu.id = "tekstMonitu";
        document.getElementById("monit").appendChild(tekstMonitu);

        let okButton = document.createElement("div");
        okButton.id = "okButton";
        okButton.innerText = "ok";
        okButton.addEventListener("click", function () {
            document.getElementById("overlay").style.display = "none";
            document.getElementById("monit").style.display = "none";
        });
        document.getElementById("monit").appendChild(okButton);



        let kontener = document.createElement("div");
        kontener.id = "obrazek";
        kontener.className = "kontener";
        document.body.appendChild(kontener);

        kontener = document.createElement("div");
        kontener.id = "guziki";
        kontener.className = "kontener";
        document.body.appendChild(kontener);

        kontener = document.createElement("div");
        kontener.id = "timer";
        kontener.className = "kontener";
        document.body.appendChild(kontener);

        kontener = document.createElement("div");
        kontener.id = "planszaKon";
        kontener.className = "kontener";
        document.body.appendChild(kontener);

        for (let i = 0; i < 12; i++) {
            let cyferka = document.createElement("img");
            cyferka.className = "cyferka";
            cyferka.ktora = i;
            if (i == 2 || i == 5) {
                cyferka.src = "cyferki/colon.gif";
            } else if (i == 8) {
                cyferka.src = "cyferki/dot.gif";
            } else {
                cyferka.src = "cyferki/c0.gif";
            }
            document.getElementById("timer").appendChild(cyferka);
        }

        let grafika = document.createElement("img");
        grafika.src = "grafika.jpg";
        grafika.id = "obrazekNaGorze";
        document.getElementById("obrazek").appendChild(grafika);

        let button = document.createElement("button");
        button.ktory = 3;
        button.className = "button";
        button.innerText = "3x3";
        button.addEventListener("click", function () {
            let ktory = this.ktory;
            gra.przetasowanie(ktory);
        });
        document.getElementById("guziki").appendChild(button);

        button = document.createElement("button");
        button.ktory = 4;
        button.className = "button";
        button.innerText = "4x4";
        button.addEventListener("click", function () {
            let ktory = this.ktory;
            gra.przetasowanie(ktory);
        });
        document.getElementById("guziki").appendChild(button);

        button = document.createElement("button");
        button.ktory = 5;
        button.className = "button";
        button.innerText = "5x5";
        button.addEventListener("click", function () {
            let ktory = this.ktory;
            gra.przetasowanie(ktory);
        });
        document.getElementById("guziki").appendChild(button);

        button = document.createElement("button");
        button.ktory = 6;
        button.className = "button";
        button.innerText = "6x6";
        button.addEventListener("click", function () {
            let ktory = this.ktory;
            gra.przetasowanie(ktory);
        });
        document.getElementById("guziki").appendChild(button);

        let plansza = document.createElement("div");
        plansza.id = "plansza";
        document.getElementById("planszaKon").appendChild(plansza);
    },

    przetasowanie: function (ktory) {
        const szerPlytki = 600 / ktory;
        gra.aktualnyX = 600 - szerPlytki;
        gra.aktualnyY = 600 - szerPlytki;
        let plytka;
        let x = 0;
        let y = 0;
        let numerek = 0;

        document.getElementById("plansza").innerHTML = "";
        clearInterval(gra.czas);

        for (let i = 0; i < ktory; i++) {
            for (let j = 0; j < ktory; j++) {
                if (i + 1 == ktory && j + 1 == ktory) {
                    break;
                }
                plytka = document.createElement("div");
                plytka.className = "plytka";
                plytka.style.width = szerPlytki + "px";
                plytka.style.height = szerPlytki + "px";
                plytka.style.left = x + "px";
                plytka.style.top = y + "px";

                plytka.style.backgroundPositionX = -x + "px";
                plytka.style.backgroundPositionY = -y + "px";

                plytka.onclick = function () {
                    let przesuniety = this;
                    gra.przesuniecie(przesuniety, szerPlytki, elem, ktory);
                };

                document.getElementById("plansza").appendChild(plytka);

                x += szerPlytki;
                numerek++;
            }
            x = 0;
            y += szerPlytki;
        }

        let elem = document.querySelectorAll(".plytka");

        let licznik = 0;
        let poprzedniRandom = 0;
        let przemieszanie = setInterval(function () {
            let random = Math.floor(Math.random() * 4) + 1;
            if (poprzedniRandom[0] == random) {
                random = 0;
            } else {
                poprzedniRandom = random;
            }

            switch (random) {
                case 0:
                    break;
                case 1:
                    if (gra.aktualnyY - szerPlytki < 0) {
                        break;
                    } else {
                        //gra.aktualnyY - szerPlytki
                        for (let i = 0; i < elem.length; i++) {
                            if (elem[i].style.left == gra.aktualnyX + "px" && elem[i].style.top == (gra.aktualnyY - szerPlytki) + "px") {
                                let plytka = elem[i];
                                plytka.style.left = gra.aktualnyX + "px";
                                plytka.style.top = gra.aktualnyY + "px";
                                gra.aktualnyY -= szerPlytki;
                                break;
                            }
                        }
                        licznik++;
                        break;
                    }
                case 2:
                    if (gra.aktualnyX + szerPlytki > 500) {
                        break;
                    } else {
                        //gra.aktualnyX + szerPlytki
                        for (let i = 0; i < elem.length; i++) {
                            if (elem[i].style.left == (gra.aktualnyX + szerPlytki) + "px" && elem[i].style.top == gra.aktualnyY + "px") {
                                let plytka = elem[i];
                                plytka.style.left = gra.aktualnyX + "px";
                                plytka.style.top = gra.aktualnyY + "px";
                                gra.aktualnyX += szerPlytki;
                                break;
                            }
                        }
                        licznik++;
                        break;
                    }
                case 3:
                    if (gra.aktualnyY + szerPlytki > 500) {
                        break;
                    } else {
                        //gra.aktualnyY + szerPlytki
                        for (let i = 0; i < elem.length; i++) {
                            if (elem[i].style.left == gra.aktualnyX + "px" && elem[i].style.top == (gra.aktualnyY + szerPlytki) + "px") {
                                let plytka = elem[i];
                                plytka.style.left = gra.aktualnyX + "px";
                                plytka.style.top = gra.aktualnyY + "px";
                                gra.aktualnyY += szerPlytki;
                                break;
                            }
                        }
                        licznik++;
                        break;
                    }
                case 4:
                    if (gra.aktualnyX - szerPlytki < 0) {
                        break;
                    } else {
                        //gra.aktualnyX - szerPlytki
                        for (let i = 0; i < elem.length; i++) {
                            if (elem[i].style.left == (gra.aktualnyX - szerPlytki) + "px" && elem[i].style.top == gra.aktualnyY + "px") {
                                let plytka = elem[i];
                                plytka.style.left = gra.aktualnyX + "px";
                                plytka.style.top = gra.aktualnyY + "px";
                                gra.aktualnyX -= szerPlytki;
                                break;
                            }
                        }
                        licznik++;
                        break;
                    }
            }
            if (licznik == (50 * (ktory - 1))) {
                clearInterval(przemieszanie);
                gra.timer();
            }
        }, 15);
    },

    timer: function () {
        let start = Date.now();
        let teraz;
        let cyferki = document.querySelectorAll(".cyferka");
        gra.czas = setInterval(function () {
            teraz = new Date(Date.now() - start);

            gra.doPokazania = (teraz.getHours() - 1) + ':' + teraz.getMinutes() + ':' + teraz.getSeconds() + '.' + teraz.getMilliseconds();

            for (let i = 0; i < gra.doPokazania.length; i++) {
                switch (gra.doPokazania[i]) {
                    case '0':
                        cyferki[i].src = "cyferki/c0.gif";
                        break;
                    case '1':
                        cyferki[i].src = "cyferki/c1.gif";
                        break;
                    case '2':
                        cyferki[i].src = "cyferki/c2.gif";
                        break;
                    case '3':
                        cyferki[i].src = "cyferki/c3.gif";
                        break;
                    case '4':
                        cyferki[i].src = "cyferki/c4.gif";
                        break;
                    case '5':
                        cyferki[i].src = "cyferki/c5.gif";
                        break;
                    case '6':
                        cyferki[i].src = "cyferki/c6.gif";
                        break;
                    case '7':
                        cyferki[i].src = "cyferki/c7.gif";
                        break;
                    case '8':
                        cyferki[i].src = "cyferki/c8.gif";
                        break;
                    case '9':
                        cyferki[i].src = "cyferki/c9.gif";
                        break;
                    case ':':
                        cyferki[i].src = "cyferki/colon.gif";
                        break;
                    case '.':
                        cyferki[i].src = "cyferki/dot.gif";
                        break;
                }
            }
        }, 100);
    },

    przesuniecie: function (przesuniety, szerPlytki, elem, ktory) {
        let x = przesuniety.style.left;
        x = parseInt(x.substr(0, x.length - 2));
        let y = przesuniety.style.top;
        y = parseInt(y.substr(0, y.length - 2));

        //sprawdza 4 płytki dookoła klikniętego bloku żeby sprawdzić czy któraś jest pusta
        if (x - szerPlytki == gra.aktualnyX && y == gra.aktualnyY) {
            przesuniety.style.left = gra.aktualnyX + "px";
            przesuniety.style.top = gra.aktualnyY + "px";
            gra.aktualnyX = x;
            gra.aktualnyY = y;
        } else if (x + szerPlytki == gra.aktualnyX && y == gra.aktualnyY) {
            przesuniety.style.left = gra.aktualnyX + "px";
            przesuniety.style.top = gra.aktualnyY + "px";
            gra.aktualnyX = x;
            gra.aktualnyY = y;
        } else if (x == gra.aktualnyX && y - szerPlytki == gra.aktualnyY) {
            przesuniety.style.left = gra.aktualnyX + "px";
            przesuniety.style.top = gra.aktualnyY + "px";
            gra.aktualnyX = x;
            gra.aktualnyY = y;
        } else if (x == gra.aktualnyX && y + szerPlytki == gra.aktualnyY) {
            przesuniety.style.left = gra.aktualnyX + "px";
            przesuniety.style.top = gra.aktualnyY + "px";
            gra.aktualnyX = x;
            gra.aktualnyY = y;
        }


        //sprawdzenie czy gracz wygrał
        x = 0;
        y = 0;
        let numerek = 0;
        let wypadZPetli = false;
        for (let i = 0; i < ktory; i++) {
            for (let j = 0; j < ktory; j++) {
                if (numerek == ktory * ktory - 1) {
                    wypadZPetli = true;
                    break;
                }
                if (elem[numerek].style.left == x + "px" && elem[numerek].style.top == y + "px") {
                } else {
                    wypadZPetli = true;
                    break;
                }
                x += szerPlytki;
                numerek++;
            }
            if (wypadZPetli) {
                break;
            }
            x = 0;
            y += szerPlytki;
        }

        if (numerek == (ktory * ktory - 1) && gra.aktualnyX == 600 - szerPlytki && gra.aktualnyY == 600 - szerPlytki) {
            document.getElementById("tekstMonitu").innerText = "Gratulacje! \n Twój wynik to: " + gra.doPokazania;
            document.getElementById("overlay").style.display = "block";
            document.getElementById("monit").style.display = "block";
            let cyferki = document.querySelectorAll(".cyferka");
            for (let i = 0; i < elem.length; i++) {
                elem[i].onclick = "";
            }
            clearInterval(gra.czas);
            for (let i = 0; i < 12; i++) {
                cyferki[i].src = "cyferki/c0.gif";
            }
        }
    },
};

gra.generuj();