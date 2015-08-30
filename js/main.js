function MemoryGame() {

    var form = document.forms["difficultyForm"],
        select = form.elements.difficultySelect,
        start = form.elements.startGame,
        gameField = document.querySelector(".game-field"),
        first,
        second,
        blockClick = false;

    this.start = function() {
        start.onclick = function() {
            clearGameField();
            createGameField(select.options[select.selectedIndex].value);
            return false;
        };
    };

    gameField.onclick = function(event) {
        var target = event.target;

        while (target != gameField) {
            if (target.tagName == 'TD') {
                if (!blockClick) {
                    if (!first) {
                        first = target;
                        target.classList.add("active");
                    }
                    else if (!second) {
                        if (first === target) {
                            return;
                        }
                        second = target;
                        target.classList.add("active");
                        if (first.cardId === second.cardId) {
                            correct();
                        }
                        else {
                            setTimeout(function() {
                                incorrect();
                                updateMoves();
                                blockClick = false;
                            }, 1000);
                            blockClick = true;
                        }
                    }
                    else {
                        incorrect();
                    }
                }
                return;
            }
            target = target.parentNode;
        }
    };
    gameField.onmousedown = function() {
        return false;
    };

    function createGameField(difficultyLevel) {
        var cols, rows, cardsNumber;

        switch(difficultyLevel) {
            case "easy": rows = 4; cols = 4; break;
            case "normal": rows = 4; cols = 6; break;
            case "hard": rows = 4; cols = 8; break;
        }
        cardsNumber = rows * cols;
        var cards = generateCards(cardsNumber);

        var table = document.createElement("table");
        table.className = "game-table";
        gameField.appendChild(table);
        for (var i = 0, k = 0; i < rows; i++) {
            var tr = document.createElement("tr");
            table.appendChild(tr);
            for (var j = 0; j < cols; j++, k++) {
                var td = document.createElement("td");
                td.cardId = cards[k];
                tr.appendChild(td);
                var img = document.createElement("img");
                img.src = "cards/" + cards[k] + ".png";
                td.appendChild(img);
            }
        }

        var movesElem = document.createElement("span");
        movesElem.appendChild(document.createTextNode("Moves: "));
        gameField.appendChild(movesElem);

        var movesValue = document.createElement("span");
        movesValue.className = "moves-value";
        movesValue.appendChild(document.createTextNode("0"));
        gameField.appendChild(movesValue);
    }
    function clearGameField() {
        if (gameField.children[0]) {
            gameField.innerHTML = "";
        }
    }

    function generateCards(number) {
        function compareRandom() {
            return Math.random() - 0.5;
        }
        var i,
            l = number / 2,
            cards = [];
        for (i = 1; i <= l; i++) {
            cards.push(i);
        }
        for (i = 1; i <= l; i++) {
            cards.push(i);
        }
        cards.sort(compareRandom);
        return cards;

    }

    function updateMoves() {
        var movesValue = document.querySelector(".moves-value");
        movesValue.innerHTML = +movesValue.innerHTML + 1;
    }
    function correct () {
        first.classList.add("correct");
        second.classList.add("correct");
    }
    function incorrect() {
        first.classList.remove("active");
        second.classList.remove("active");
        first = undefined;
        second = undefined;
    }
}

var game = new MemoryGame();
game.start();