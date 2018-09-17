const labels = {emptySpace: 0, ship: 1, reservedSpace: 2, selectedShip: 3};

let player1 = {
        name: "",
        table: createTable(),
        shipsPosition: {}
    },
    player2 = {
        name: "enemy",
        table: createTable(),
        hits: {}
    },
    ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1],
    input = document.getElementById("start"),
    moves = [],
    onMove = "";


input.addEventListener("submit", (event) => {
    player1.name = document.getElementById("username").value;
    input.style.display = "none";
    document.getElementById("table").style.display = "flex";
    document.getElementById("playerOne").textContent = player1.name;
    positionSetting();
    event.preventDefault();
});

let allListeners = {
    settingPosition: {
        mouseDown: function (event) {
            let targetProperties = tableSetup.createTargetProperties(event);
            localStorage.setItem("property", JSON.stringify(targetProperties));
            player1.table = tableSetup.colorSelectedShip(player1.table, player1.shipsPosition, targetProperties, "on");
            renderTables();
        },
        mouseUp: function (event) {
            let rotateOrMove = "rotate",
                newPlace;
            if (event.button === 0) {
                rotateOrMove = "move";
                newPlace = event.target.id.split("_");
            }
            let properties = {
                rotateOrMove: rotateOrMove,
                newPlace: newPlace,
                table: player1.table,
                shipPosition: player1.shipsPosition
            };
            let targetProperties = JSON.parse(localStorage.getItem("property")),
                tableAndShip = tableSetup.rotateOrMoveShip(properties, targetProperties);
            console.log(player1.table);
            player1.table = tableAndShip.table;
            player1.shipsPosition = tableAndShip.shipPosition;
            console.log(player1.table);
            player1.table = tableSetup.colorSelectedShip(properties.table, properties.shipPosition, targetProperties, "off");
            localStorage.removeItem("property");
            renderTables();
        },
        newRandomPosition: function () {
            let random = tableSetup.randomShipsPosition(player1.table);
            player1.table = random.myTable;
            player1.shipsPosition = random.shipsOnTable;
            renderTables();
        },
        confirmPosition: function () {
            startTheBattle();
            renderTables();
            shipsArr.player1 = allShips("player1");
            shipsArr.player2 = allShips("player2");
        }
    }
};

function startTheBattle() {
    removeListenersForTableSetup();
    addListenerOnEnemiesTable();
    player2randomTable();
    onMove = koIgraPrvi();
    notifications();
    if (onMove === "player2") {
        chooseTheField();
    }
}

function player2randomTable() {
    let random = tableSetup.randomShipsPosition(player2.table);
    player2.table = random.myTable;
    player2.shipsPosition = random.shipsOnTable;
}

function chooseTheField() {
    setTimeout(()=>{
        //logika za biranje polja
        onMove = "player1";
        notifications();
    },1500)
}

function notifications() {
    document.getElementById("notifications").innerHTML = `on move: ${onMove==="player1"?player1.name:player2.name}`;
}

function removeListenersForTableSetup() {
    let player = document.getElementById("player1");
    player.removeEventListener("mousedown", allListeners.settingPosition.mouseDown);
    player.removeEventListener("mouseup", allListeners.settingPosition.mouseUp);
    document.getElementById("newRandom").removeEventListener("click", allListeners.settingPosition.newRandomPosition);
    document.getElementById("confirmPosition").removeEventListener("click", allListeners.settingPosition.confirmPosition);
}

function positionSetting() {
    let random = tableSetup.randomShipsPosition(player1.table);
    player1.table = random.myTable;
    player1.shipsPosition = random.shipsOnTable;
    renderTables();
    listenersForPositionSetting("player1");
}

function renderTables() {
    if (onMove===""){
        document.getElementById("player1").innerHTML = drawOnPage(player1.table, "Player1").outerHTML;
        document.getElementById("player2").innerHTML = drawOnPage(player2.table, "Player2").outerHTML;
    } else {
        document.getElementById("player1").innerHTML = drawOnPage(tablesForHits.player1, "Player1").outerHTML;
        document.getElementById("player2").innerHTML = drawOnPage(tablesForHits.player2, "Player2").outerHTML;
    }
}

function listenersForPositionSetting(id) {
    let player = document.getElementById(id);
    player.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    }, false);
    player.addEventListener("mousedown", allListeners.settingPosition.mouseDown);
    player.addEventListener("mouseup", allListeners.settingPosition.mouseUp);
    document.getElementById("newRandom").addEventListener("click", allListeners.settingPosition.newRandomPosition);
    document.getElementById("confirmPosition").addEventListener("click", allListeners.settingPosition.confirmPosition);
}

function createTable() {
    let table = [];
    for (let hight = 0; hight < 10; hight++) {
        table[hight] = [];
        for (let width = 0; width < 10; width++) {
            table[hight][width] = labels.emptySpace;
        }
    }
    return table;
}

function drawOnPage(table, player) {
    let tabla = document.createElement("table");
    tabla.setAttribute("id", player);
    for (let row = 0; row < table.length; row++) {
        let rowInTable = document.createElement("tr");
        for (let cell = 0; cell < table[row].length; cell++) {
            let cellInRow = document.createElement("td");
            if (table[row][cell] === labels.emptySpace || table[row][cell] === labels.reservedSpace) cellInRow.style.backgroundColor = "white";
            if (table[row][cell] === labels.ship) cellInRow.style.backgroundColor = "black";
            if (table[row][cell] === labels.selectedShip) cellInRow.style.border = "solid blue 1px";
            if (table[row][cell] === labels.selectedShip) cellInRow.style.backgroundColor = "yellow";
            if (table[row][cell] === "hit") cellInRow.style.backgroundColor = "green";
            if (table[row][cell] === "close") cellInRow.style.backgroundColor = "gray";
            if (table[row][cell] === "nothing") cellInRow.style.backgroundColor = "silver";
            if (table[row][cell] === "submerged") cellInRow.style.backgroundColor = "red";
            cellInRow.setAttribute("id", row + "_" + cell);
            rowInTable.appendChild(cellInRow);
        }
        tabla.appendChild(rowInTable);
    }
    return tabla;
}

function koIgraPrvi() {
    return `player${Math.ceil(Math.random() * 2)}`;
}

function myMove() {
    if (moves.length < 1) return onMove === "player1";
    return moves[moves.length-1].player === "player1";
}

