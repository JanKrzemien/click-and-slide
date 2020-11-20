let gra = {
    //zmienne globalne
    //aktualnyX i Y określają gdzie znajduje się pusty klocek
    aktualnyX: 600,
    aktualnyY: 600,
    //teraz to globalna zmienna do przechowywania ile czasu upłynęło
    dopokazania: "",
    //czas to globalna zmienna interwału timera
    czas: 0,
    //zmienna czy wyświetlić ranking
    czyPokazac: false,
    //tablica z najlepszymi wynikami na początku wypełniona przykładowymi wynikami dla każdej kategorii
    bestRecordsExample: [
        { nick: "anon1", czas: "00:10:01.000" },
        { nick: "anon2", czas: "00:10:02.000" },
        { nick: "anon3", czas: "00:10:03.000" },
        { nick: "anon4", czas: "00:10:04.000" },
        { nick: "anon5", czas: "00:10:05.000" },
        { nick: "anon6", czas: "00:10:06.000" },
        { nick: "anon7", czas: "00:10:07.000" },
        { nick: "anon8", czas: "00:10:08.000" },
        { nick: "anon9", czas: "00:10:09.000" },
    ],
    bestRecords3: [],
    bestRecords4: [],
    bestRecords5: [],
    bestRecords6: [],
    //ktora tablica jest używana
    ktory: 3,
    //obrót slidera
    obrot: 2,
    //obrazek użyty w układance
    obrazek: "",

    //funkcja dynamicznie generująca wszystkie elementy
    generuj: function () {
        //szary div zasłaniający ekran podczas wyświetlania monitu
        let overlay = document.createElement("div");
        overlay.id = "overlay";
        overlay.style.display = "none";
        document.body.appendChild(overlay);

        //monit wyświetlany po wygranej
        let monit = document.createElement("div");
        monit.id = "monit";
        monit.style.display = "none";
        document.body.appendChild(monit);

        //tekst na monicie
        let tekstMonitu = document.createElement("p");
        tekstMonitu.id = "tekstMonitu";
        document.getElementById("monit").appendChild(tekstMonitu);

        //input na wprowadzanie nicku gracza
        let input = document.createElement("input");
        input.id = "input";
        document.getElementById("monit").appendChild(input);

        //przycisk ok zamykający monit i overlay
        let okButton = document.createElement("div");
        okButton.id = "okButton";
        okButton.innerText = "ok";
        okButton.addEventListener("click", function () {
            document.getElementById("overlay").style.display = "none";
            document.getElementById("monit").style.display = "none";
            let d = new Date();
            d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
            d = "expires=" + d.toUTCString();
            console.log(encodeURIComponent(document.getElementById("input").value), decodeURIComponent(document.getElementById("input").value))
            cookie = document.cookie + '|' + encodeURIComponent(document.getElementById("input").value) + "|" + gra.doPokazania + "|" + gra.ktory + ";" + d + ";";
            document.cookie = cookie;
            document.getElementById("input").value = "";
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
        grafika.src = "arrow-left.png";
        grafika.addEventListener("click", function () {
            gra.arrowLeft();
        });
        document.getElementById("obrazek").appendChild(grafika);

        let overflowHidden = document.createElement("div");
        overflowHidden.id = "overflow";

        grafika = document.createElement("img");
        grafika.src = "grafika1.jpg";
        grafika.id = "img1";
        grafika.className = "obrazekNaGorze";
        overflowHidden.appendChild(grafika);

        grafika = document.createElement("img");
        grafika.src = "grafika2.jpg";
        grafika.id = "img2";
        grafika.className = "obrazekNaGorze";
        gra.obrazek = grafika;
        overflowHidden.appendChild(grafika);

        grafika = document.createElement("img");
        grafika.src = "grafika3.jpg";
        grafika.id = "img3";
        grafika.className = "obrazekNaGorze";
        overflowHidden.appendChild(grafika);

        document.getElementById("obrazek").appendChild(overflowHidden);

        grafika = document.createElement("img");
        grafika.src = "arrow-right.png";
        grafika.addEventListener("click", function () {
            gra.arrowRight();
        });
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

        let ranking = document.createElement("div");
        ranking.id = "ranking";

        //nagłówek w karcie rankingów mówiący jakiej kategorii wyniki są wyświetlane
        let naglowek = document.createElement("p");
        naglowek.innerText = "Najlepsze Wyniki 3x3";
        naglowek.id = "rankingNaglowek";
        ranking.appendChild(naglowek);

        let pojemnikNaGoziki = document.createElement("div");
        pojemnikNaGoziki.id = "pojemnikNaGoziki"
        pojemnikNaGoziki.className = "kontener";

        button = document.createElement("button");
        button.ktory = 3;
        button.className = "button";
        button.innerText = "3x3";
        button.addEventListener("click", function () {
            let ktory = this.ktory;
            gra.wypiszRanking(ktory);
        });
        pojemnikNaGoziki.appendChild(button);

        button = document.createElement("button");
        button.ktory = 4;
        button.className = "button";
        button.innerText = "4x4";
        button.addEventListener("click", function () {
            let ktory = this.ktory;
            gra.wypiszRanking(ktory);
        });
        pojemnikNaGoziki.appendChild(button);

        button = document.createElement("button");
        button.ktory = 5;
        button.className = "button";
        button.innerText = "5x5";
        button.addEventListener("click", function () {
            let ktory = this.ktory;
            gra.wypiszRanking(ktory);
        });
        pojemnikNaGoziki.appendChild(button);

        button = document.createElement("button");
        button.ktory = 6;
        button.className = "button";
        button.innerText = "6x6";
        button.addEventListener("click", function () {
            let ktory = this.ktory;
            gra.wypiszRanking(ktory);
        });

        pojemnikNaGoziki.appendChild(button);
        button = document.createElement("button");
        button.ktory = "wyjscie";
        button.className = "button";
        button.innerText = "wyjście";
        button.onclick = function () {
            document.getElementById("ranking").style.display = "none";
            czyPokazac = false;
        };
        pojemnikNaGoziki.appendChild(button);

        ranking.appendChild(pojemnikNaGoziki);

        let tabelaWynikow = document.createElement("table");
        tabelaWynikow.id = "tabelaWynikow";
        ranking.appendChild(tabelaWynikow);

        document.body.appendChild(ranking);


        let plansza = document.createElement("div");
        plansza.id = "plansza";
        document.getElementById("planszaKon").appendChild(plansza);

        button = document.createElement("button");
        button.className = "button";
        button.ktory = "ranking";
        button.innerText = "Ranking";
        button.onclick = function () {
            document.getElementById("ranking").style.display = "block";
            gra.wypiszRanking(3);
            czyPokazac = true;
        }
        document.getElementById("guziki").appendChild(button);
    },

    //funkcja dzieląca grafike na części i randomo je przetasowująca
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
                plytka.style.backgroundImage = `url(` + gra.obrazek.src.substr(gra.obrazek.src.length - 12, gra.obrazek.src.length) + `)`;
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

    //nazwa mówi sama za siebie
    timer: function () {
        let start = Date.now();
        let teraz;
        let cyferki = document.querySelectorAll(".cyferka");
        gra.czas = setInterval(function () {
            teraz = new Date(Date.now() - start);

            if (teraz.getMinutes() < 10 && teraz.getSeconds() < 10) {
                gra.doPokazania = "0" + (teraz.getHours() - 1) + ':' + '0' + teraz.getMinutes() + ':' + '0' + teraz.getSeconds() + '.' + teraz.getMilliseconds();
            } else if (teraz.getSeconds() < 10) {
                gra.doPokazania = "0" + (teraz.getHours() - 1) + ':' + teraz.getMinutes() + ':' + '0' + teraz.getSeconds() + '.' + teraz.getMilliseconds();
            } else if (teraz.getMinutes() < 10) {
                gra.doPokazania = "0" + (teraz.getHours() - 1) + ':' + '0' + teraz.getMinutes() + ':' + teraz.getSeconds() + '.' + teraz.getMilliseconds();
            } else {
                gra.doPokazania = "0" + (teraz.getHours() - 1) + ':' + teraz.getMinutes() + ':' + teraz.getSeconds() + '.' + teraz.getMilliseconds();
            }


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

    //funckja definniująca co się dzieje po naciśnięciu płytki z grafiką
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
            for (let i = 0; i < elem.length; i++) {
                elem[i].onclick = "";
            }
            clearInterval(gra.czas);
            gra.ktory = ktory;
        }
    },

    wypiszRanking: function (ktory) {
        document.getElementById("rankingNaglowek").innerText = "Najlepsze Wyniki " + ktory + "x" + ktory;


        //uzupełnienie tablicy z rekordami o wpisy z ciasteczek
        gra.bestRecords3 = [];
        gra.bestRecords4 = [];
        gra.bestRecords5 = [];
        gra.bestRecords6 = [];

        let cookies = document.cookie.split('|');
        cookies = cookies.splice(1, cookies.length);
        for (let i = 0; i < cookies.length; i += 3) {
            let doTablicy = { nick: cookies[i], czas: cookies[i + 1] };
            if (cookies[i + 2] == 3) {
                gra.bestRecords3.push(doTablicy);
            } else if (cookies[i + 2] == 4) {
                gra.bestRecords4.push(doTablicy);
            } else if (cookies[i + 2] == 5) {
                gra.bestRecords5.push(doTablicy);
            } else if (cookies[i + 2] == 6) {
                gra.bestRecords6.push(doTablicy);
            }
        }


        //wypisanie rekordów
        if (ktory == 3) {
            gra.bestRecords3 = gra.bestRecords3.concat(gra.bestRecordsExample);
            gra.bestRecords3.sort(function (a, b) {
                return parseFloat(a.czas.replace(/:/g, "")) - parseFloat(b.czas.replace(/:/g, ""));
            });
            gra.bestRecords3 = gra.bestRecords3.splice(0, 10);
            document.getElementById("tabelaWynikow").innerHTML = "";
            for (let i = -1; i < 10; i++) {
                if (i >= gra.bestRecords3.length) {
                    break;
                }
                let tr = document.createElement("tr");
                for (let j = 0; j < 3; j++) {
                    let td = document.createElement("td");
                    if (i == -1) {
                        if (j == 0) {
                            td.innerText = "miejsce";
                        } else if (j == 1) {
                            td.innerText = "nick";
                        } else {
                            td.innerText = "czas";
                        }
                    } else {
                        if (j == 0) {
                            td.innerText = i + 1;
                        } else if (j == 1) {
                            td.innerText = decodeURIComponent(gra.bestRecords3[i].nick);
                        } else {
                            td.innerText = gra.bestRecords3[i].czas;
                        }
                    }
                    tr.appendChild(td);
                }
                document.getElementById("tabelaWynikow").appendChild(tr);
            }
        } else if (ktory == 4) {
            gra.bestRecords4 = gra.bestRecords4.concat(gra.bestRecordsExample);
            gra.bestRecords4.sort(function (a, b) {
                return parseFloat(a.czas.replace(/:/g, "")) - parseFloat(b.czas.replace(/:/g, ""));
            });
            gra.bestRecords4 = gra.bestRecords4.splice(0, 10);
            document.getElementById("tabelaWynikow").innerHTML = "";
            for (let i = -1; i < 10; i++) {
                if (i >= gra.bestRecords4.length) {
                    break;
                }
                let tr = document.createElement("tr");
                for (let j = 0; j < 3; j++) {
                    let td = document.createElement("td");
                    if (i == -1) {
                        if (j == 0) {
                            td.innerText = "miejsce";
                        } else if (j == 1) {
                            td.innerText = "nick";
                        } else {
                            td.innerText = "czas";
                        }
                    } else {
                        if (j == 0) {
                            td.innerText = i + 1;
                        } else if (j == 1) {
                            td.innerText = decodeURIComponent(gra.bestRecords4[i].nick);
                        } else {
                            td.innerText = gra.bestRecords4[i].czas;
                        }
                    }
                    tr.appendChild(td);
                }
                document.getElementById("tabelaWynikow").appendChild(tr);
            }
        } else if (ktory == 5) {
            gra.bestRecords5 = gra.bestRecords5.concat(gra.bestRecordsExample);
            gra.bestRecords5.sort(function (a, b) {
                return parseFloat(a.czas.replace(/:/g, "")) - parseFloat(b.czas.replace(/:/g, ""));
            });
            gra.bestRecords5 = gra.bestRecords5.splice(0, 10);
            document.getElementById("tabelaWynikow").innerHTML = "";
            for (let i = -1; i < 10; i++) {
                if (i >= gra.bestRecords5.length) {
                    break;
                }
                let tr = document.createElement("tr");
                for (let j = 0; j < 3; j++) {
                    let td = document.createElement("td");
                    if (i == -1) {
                        if (j == 0) {
                            td.innerText = "miejsce";
                        } else if (j == 1) {
                            td.innerText = "nick";
                        } else {
                            td.innerText = "czas";
                        }
                    } else {
                        if (j == 0) {
                            td.innerText = i + 1;
                        } else if (j == 1) {
                            td.innerText = decodeURIComponent(gra.bestRecords5[i].nick);
                        } else {
                            td.innerText = gra.bestRecords5[i].czas;
                        }
                    }
                    tr.appendChild(td);
                }
                document.getElementById("tabelaWynikow").appendChild(tr);
            }
        } else if (ktory == 6) {
            gra.bestRecords6 = gra.bestRecords6.concat(gra.bestRecordsExample);
            gra.bestRecords6.sort(function (a, b) {
                return parseFloat(a.czas.replace(/:/g, "")) - parseFloat(b.czas.replace(/:/g, ""));
            });
            gra.bestRecords6 = gra.bestRecords6.splice(0, 10);
            document.getElementById("tabelaWynikow").innerHTML = "";
            for (let i = -1; i < 10; i++) {
                if (i >= gra.bestRecords6.length) {
                    break;
                }
                let tr = document.createElement("tr");
                for (let j = 0; j < 3; j++) {
                    let td = document.createElement("td");
                    if (i == -1) {
                        if (j == 0) {
                            td.innerText = "miejsce";
                        } else if (j == 1) {
                            td.innerText = "nick";
                        } else {
                            td.innerText = "czas";
                        }
                    } else {
                        if (j == 0) {
                            td.innerText = i + 1;
                        } else if (j == 1) {
                            td.innerText = decodeURIComponent(gra.bestRecords6[i].nick);
                        } else {
                            td.innerText = gra.bestRecords6[i].czas;
                        }
                    }
                    tr.appendChild(td);
                }
                document.getElementById("tabelaWynikow").appendChild(tr);
            }
        }
    },

    arrowLeft: function () {
        let img1;
        let img2;
        let img3;
        if (gra.obrot == 3) {
            document.getElementById("img1").style.left = "0px";
            document.getElementById("img2").style.left = "200px";
            document.getElementById("img3").style.left = "-200px";
            img1 = 0;
            img2 = 200;
            img3 = -200;
        } else if (gra.obrot == 2) {
            document.getElementById("img1").style.left = "-200px";
            document.getElementById("img2").style.left = "0px";
            document.getElementById("img3").style.left = "200px";
            img1 = -200;
            img2 = 0;
            img3 = 200;
        } else if (gra.obrot == 1) {
            document.getElementById("img1").style.left = "200px";
            document.getElementById("img2").style.left = "-200px";
            document.getElementById("img3").style.left = "0px";
            img1 = 200;
            img2 = -200;
            img3 = 0;
        }
        let slider = setInterval(function () {
            if (gra.obrot == 2) {
                img2 -= 4;
                img3 -= 4;
                document.getElementById("img2").style.left = img2 + "px";
                document.getElementById("img3").style.left = img3 + "px";
                if (img2 == -200 && img3 == 0) {
                    gra.obrot--;
                    if (gra.obrot < 1) {
                        gra.obrot = 3;
                    }
                    gra.obrazek = document.getElementById("img3");
                    clearInterval(slider);
                }
            } else if (gra.obrot == 1) {
                img1 -= 4;
                img3 -= 4;
                document.getElementById("img1").style.left = img1 + "px";
                document.getElementById("img3").style.left = img3 + "px";
                if (img1 == 0 && img3 == -200) {
                    gra.obrot--;
                    if (gra.obrot < 1) {
                        gra.obrot = 3;
                    }
                    gra.obrazek = document.getElementById("img1");
                    clearInterval(slider);
                }
            } else if (gra.obrot == 3) {
                img1 -= 4;
                img2 -= 4;
                document.getElementById("img2").style.left = img2 + "px";
                document.getElementById("img1").style.left = img1 + "px";
                if (img2 == 0 && img1 == -200) {
                    gra.obrot--;
                    if (gra.obrot < 1) {
                        gra.obrot = 3;
                    }
                    gra.obrazek = document.getElementById("img2");
                    clearInterval(slider);
                }
            }

        }, 1);
    },

    arrowRight: function () {
        let img1;
        let img2;
        let img3;
        if (gra.obrot == 3) {
            document.getElementById("img1").style.left = "0px";
            document.getElementById("img2").style.left = "200px";
            document.getElementById("img3").style.left = "-200px";
            img1 = 0;
            img2 = 200;
            img3 = -200;
        } else if (gra.obrot == 2) {
            document.getElementById("img1").style.left = "-200px";
            document.getElementById("img2").style.left = "0px";
            document.getElementById("img3").style.left = "200px";
            img1 = -200;
            img2 = 0;
            img3 = 200;
        } else if (gra.obrot == 1) {
            document.getElementById("img1").style.left = "200px";
            document.getElementById("img2").style.left = "-200px";
            document.getElementById("img3").style.left = "0px";
            img1 = 200;
            img2 = -200;
            img3 = 0;
        }
        let slider = setInterval(function () {
            if (gra.obrot == 2) {
                img1 += 4;
                img2 += 4;
                document.getElementById("img1").style.left = img1 + "px";
                document.getElementById("img2").style.left = img2 + "px";
                if (img2 == 200 && img1 == 0) {
                    gra.obrot++;
                    if (gra.obrot > 3) {
                        gra.obrot = 1;
                    }
                    gra.obrazek = document.getElementById("img1");
                    clearInterval(slider);
                }
            } else if (gra.obrot == 1) {
                img2 += 4;
                img3 += 4;
                document.getElementById("img2").style.left = img2 + "px";
                document.getElementById("img3").style.left = img3 + "px";
                if (img2 == 0 && img3 == 200) {
                    gra.obrot++;
                    if (gra.obrot > 3) {
                        gra.obrot = 1;
                    }
                    gra.obrazek = document.getElementById("img2");
                    clearInterval(slider);
                }
            } else if (gra.obrot == 3) {
                img1 += 4;
                img3 += 4;
                document.getElementById("img3").style.left = img3 + "px";
                document.getElementById("img1").style.left = img1 + "px";
                if (img3 == 0 && img1 == 200) {
                    gra.obrot++;
                    if (gra.obrot > 3) {
                        gra.obrot = 1;
                    }
                    gra.obrazek = document.getElementById("img3");
                    clearInterval(slider);
                }
            }

        }, 1);
    },
};

gra.generuj();