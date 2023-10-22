let tableRows = [];

function handleFile(event) {
    let files = event.target.files,
        file = files[0];
    let reader = new FileReader();

    reader.onload = function(e) {
        let data = new Uint8Array(e.target.result);
        let workbook = XLSX.read(data, {type: 'array'});

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const table = document.getElementById("excelData");
        table.innerHTML = "";
        tableRows = [];

        jsonData.forEach((row) => {
            const newRow = table.insertRow();
            row.forEach((cell) => {
                const newCell = newRow.insertCell();
                newCell.textContent = cell;
            });
            tableRows.push(newRow);
        });
    };

    reader.readAsArrayBuffer(file);
}

function performSearch() {
    const searchText = document.getElementById("searchInput").value.toLowerCase();
    let found = false;
    tableRows.forEach(row => {
        const cells = Array.from(row.cells);
        const isRowFound = cells.some(cell => cell.textContent.toLowerCase().includes(searchText));
        if (isRowFound) {
            row.style.display = "";
            found = true;
        } else {
            row.style.display = "none";
        }
    });

    const searchResult = document.getElementById("searchResult");
    searchResult.textContent = found ? "Номер найден" : "Номер не найден";
}