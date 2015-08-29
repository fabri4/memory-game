function MemoryGame(options) {
    var parentElem = options.parentElem;

    var form = document.forms["difficultyForm"];
    var select = form.elements.difficultySelect;
    var start = form.elements.startGame;
    var gameField = document.querySelector(".game-field");
    var isStarted = false;
    var first, second;

    start.onclick = function() {
        clearGameField();
        createGameField(select.options[select.selectedIndex].value);
        return false;
    };

    gameField.onclick = function(event) {
        var target = event.target;

        while (target != gameField) {

            if (target.tagName == 'TD') {
                if (!first) {
                    console.log(target);
                    first = target;
                    target.classList.add("active");
                }
                else if (!second) {
                    second = target;
                    target.classList.add("active");
                    if (first.cardId === second.cardId) {
                        first.classList.add("correct");
                        second.classList.add("correct");
                    }
                }
                else {
                    first.classList.remove("active");
                    second.classList.remove("active");
                    first = undefined;
                    second = undefined;
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
                img.src = "cards/" + cards[k] + ".gif";
                td.appendChild(img);
            }
        }

        isStarted = true;
    }
    function clearGameField() {
        if (isStarted) {
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
}

var game = new MemoryGame({
    parentElem: document.querySelector(".game")
});