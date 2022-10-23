const Sign = {
    CIRCLE: "O",
    CROSS: "X",
    EMPTY: ""
};

let map = [
    [Sign.EMPTY, Sign.EMPTY, Sign.EMPTY],
    [Sign.EMPTY, Sign.EMPTY, Sign.EMPTY],
    [Sign.EMPTY, Sign.EMPTY, Sign.EMPTY],
];

function hideFields() {
    const gridContainer = document.querySelector(".grid-container");
    gridContainer.style.display = "none";
    gridContainer.style.visibility = "hidden";
}

function initializeFields(onClick) {
    const fields = document.querySelectorAll(".grid-item");
    for (const field of fields) {
        field.addEventListener("click", onClick);
    }
    const gridContainer = document.querySelector(".grid-container");
    gridContainer.style.display = "grid";
    gridContainer.style.visibility = "visible";
}

function disableFields(onClick) {
    const fields = document.querySelectorAll(".grid-item");
    for (const field of fields) {
        field.removeEventListener("click", onClick);
    }
}

function displaySign(fieldID, sign) {
    const field = document.getElementById(`${fieldID}`);
    field.textContent = sign;
    const coordinates = fieldID.split(",");
    const x = coordinates[0];
    const y = coordinates[1];
    map[x][y] = sign;
}

function checkRow(sign) {
    for (let row = 0; row < map.length; row++) {
        let counter = 0;
        for (let element = 0; element < map.length; element++) {
            if (map[row][element] === sign) {
                counter++;
            } else {
                break;
            }
        }
        if (counter === map.length) {
            return true;
        }
    }
    return false;
}

function checkColumn(sign) {
    for (let column = 0; column < map.length; column++) {
        let counter = 0;
        for (let element = 0; element < map.length; element++) {
            if (map[element][column] === sign) {
                counter++;
            } else {
                break;
            }
        }
        if (counter === map.length) {
            return true;
        }
    }
    return false;
}

function checkDiagonal1(sign) {
    let counter = 0;
    for(let index = 0; index < map.length; index++) {
        if (map[index][index] === sign) {
            counter++;
        } else {
            break;
        }
    }
    return counter === map.length;
}

function checkDiagonal2(sign) {
    let counter = 0;
    let column = map.length - 1;
    for (let row = 0; row < map.length; row++) {
        if (map[row][column] === sign) {
            column--;
            counter++;
        } else {
            break;
        }
    }
    return counter === map.length;
}

function getEmptyFields() {
    let emptyFields = [];
    for (let row = 0; row < map.length; row++) {
        for (let column = 0; column < map.length; column++) {
            if (map[row][column] === Sign.EMPTY) {
                emptyFields.push(`${row},${column}`);
            }
        }
    }
    return emptyFields;
}

function clearFields() {
    map = [
        [Sign.EMPTY, Sign.EMPTY, Sign.EMPTY],
        [Sign.EMPTY, Sign.EMPTY, Sign.EMPTY],
        [Sign.EMPTY, Sign.EMPTY, Sign.EMPTY],
    ];
    const fields = document.querySelectorAll(".grid-item");
    for (const field of fields) {
        field.textContent = "";
    }
}
