let tablesForHits = {
    player1: createTable(),
    player2: createTable()
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
            notifications();
            chooseTheField();
            renderTables();
        } else {
            alert("not ur turn");
        }
    }
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