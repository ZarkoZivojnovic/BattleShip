let tablesForHits = {
    player1: createTable(),
    player2: createTable()
};

let shipsArr = {
    player1: [],
    player2: []
};

function addListenerOnEnemiesTable() {
    document.getElementById("player2").addEventListener("click", clickOnEnemiesTable);
}

function clickOnEnemiesTable(event) {
    if (event.target !== event.currentTarget){
        if (myMove()) {
            console.log(event.target.id);
            const vertical = event.target.id.split("_")[0],
                horizontal = event.target.id.split("_")[1];
            markHit("player2", vertical, horizontal);
            if (player2.table[vertical][horizontal] !== labels.ship) {
                onMove = "player2";
            }
            isTheShipSubmerged("player2");
            notifications();
            renderTables();
            if (isTheEnd("player2")) alert("pobeda!");
            chooseTheField();
        } else {
            alert("not ur turn");
        }
    }
}

function isTheShipSubmerged(player) {
    let sum = 0;
    for (let ship of shipsArr[player]){
        let counter = 0;
        for (let field of ship){
            if (tablesForHits[player][field[0]][field[1]]==="hit") counter++
        }
        if (ship.length === counter) {
            for (let field of ship){
                tablesForHits[player][field[0]][field[1]] = "submerged";
            }
        }
    }
}

function isTheEnd(player) {
    let sum = 0;
    for (let ship of shipsArr[player]){
        for (let field of ship){
            if (tablesForHits[player][field[0]][field[1]]==="submerged") sum++;
        }
    }
    return sum > 19;
}

function allShips(player) {
    const arr = [],
        ships = player === "player1" ? player1.shipsPosition : player2.shipsPosition;
    for (let ship in ships){
        arr.push(ships[ship].position);
    }
    return arr;
}

function markHit(player, vertical, horizontal) {
    let playersTable = player2.table[vertical][horizontal];
    if (player === "player1") playersTable= player1.table[vertical][horizontal];
    if (playersTable === labels.ship){
        tablesForHits[player][vertical][horizontal] = "hit";
    } else if (playersTable === labels.reservedSpace){
        tablesForHits[player][vertical][horizontal] = "close";
    } else if (playersTable === labels.emptySpace){
        tablesForHits[player][vertical][horizontal] = "nothing";
    }
}