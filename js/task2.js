const table = document.getElementById("dataTable");
const entryTemplate = document.getElementById("diagramEntryTemplate");

const groupInput = document.getElementById("group");
const sizeInput = document.getElementById("size");

function addRow() {
    let entry = {};

    entry.group = groupInput.value;
    entry.size = sizeInput.value;
    entry.color = getRandomColor();

    addEntryToTable(entry);
    renderDiagram();

    groupInput.value = "";
    sizeInput.value = "";
}

function addEntryToTable(entry) {
    let row = table.insertRow(table.rows.length - 1);

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Видалити";
    deleteButton.classList.add("btn", "btn-link");

    row.setAttribute("data-color", entry.color);

    let deleteCell = row.insertCell(0);
    let nameCell = row.insertCell(1);
    let sizeCell = row.insertCell(2);

    deleteCell.appendChild(deleteButton);
    nameCell.innerText = entry.group;
    if (entry.size !== "") {
        sizeCell.innerText = entry.size;
    } else {
        sizeCell.innerText = 0;
    }

    nameCell.style.verticalAlign = "middle";
    sizeCell.style.verticalAlign = "middle";

    nameCell.setAttribute("contenteditable", "true");
    sizeCell.setAttribute("contenteditable", "true");

    nameCell.oninput = renderDiagram;
    sizeCell.oninput = () => {
        if (sizeCell.innerText.match(/^0+(?=.)/))
            sizeCell.innerText = sizeCell.innerText.replace(/^0+(?=.)/, '');
        renderDiagram();
    };

    sizeCell.addEventListener("keypress", e => {
        if (!isNumber(e)) {
            e.preventDefault()
        }
    });

    sizeCell.addEventListener("focusout", e => {
        if (sizeCell.innerText === "") {
            sizeCell.innerText = "0";
            renderDiagram();
        }
    });

    deleteButton.onclick = () => table.deleteRow(row.rowIndex);
}

function renderDiagram() {
    const diagram = document.getElementById("diagram");

    let entries = Array.prototype.map.call(table.rows, row => {
        let entry = {};

        entry.group = row.cells[1].innerText;
        entry.size = row.cells[2].innerText;
        entry.color = row.dataset.color;

        if (entry.size === "") {
            entry.size = 0;
        }

        return entry;
    })
        .slice(1, -1);


    const sizes = entries.map(entry => parseInt(entry.size, 10));
    const maxSize = Math.max(...sizes);

    const entityWidth = (80.0 / entries.length) + "%";

    while (diagram.firstChild) {
        diagram.removeChild(diagram.lastChild);
    }

    entries.forEach(entry => {

        const diagEntityHeight = (parseInt(entry.size, 10) / maxSize) * 90 + 10;

        let clone = entryTemplate.content.cloneNode(true);

        console.log(clone);

        let diagEntity = clone.querySelector(".diagEntry");

        diagEntity.style.width = entityWidth;

        diagEntity.style.height = diagEntityHeight + "%";

        let diagEntryBody = clone.querySelector(".diagEntryBody");
        diagEntryBody.style.backgroundColor = entry.color;
        diagEntryBody.style.height = (100 - 1000 / diagEntityHeight) + "%";

        let tooltip = clone.querySelector(".tip");
        console.log(tooltip);


        // diagEntryBody.addEventListener("mousemove", e=>{diagEntryBody.style.backgroundColor= "black"});

        diagEntryBody.onmouseenter = e => {
            tooltip.style.left = e.pageX;
            tooltip.style.top = e.pageY;
        };

        tooltip.innerText = entry.size;

        diagEntryBody.addEventListener("mouseenter", diagEntryBody.mouseenter = e => {
            tooltip.style.display = "inline";
        });

        diagEntryBody.addEventListener("mouseout", diagEntryBody.mouseenter = e => {
            tooltip.style.display = "none";
        });

        diagEntryBody.addEventListener("mousemove", diagEntryBody.mouseenter = e => {
            tooltip.style.left = e.pageX + "px";
            tooltip.style.top = e.pageY - 35 + "px";
        });

        let label = clone.querySelector(".label");
        label.innerText = entry.group !== "" ? entry.group : " ";

        diagram.appendChild(diagEntity);
    });
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    console.log(charCode);
    return charCode > 47 && charCode < 58;
}