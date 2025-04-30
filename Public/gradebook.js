function fetchGradeData() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status !== 200) {
        console.error(`Could not get grades. Status: ${xhr.status}`);
      } else {
        let data = JSON.parse(xhr.responseText);
        populateGradebook(data);
      }
    }
  };
  xhr.open("GET", "/api/grades", true);
  xhr.send();
}

function populateGradebook(data) {
  const tableBody = document.getElementById("gradebook");

  data.forEach(function (entry) {
    let row = document.createElement("tr");

    let nameCell = document.createElement("td");
    nameCell.textContent = `${entry.last_name}, ${entry.first_name}`;

    let gradeCell = document.createElement("td");
    gradeCell.textContent = entry.total_grade;

    row.appendChild(nameCell);
    row.appendChild(gradeCell);
    tableBody.appendChild(row);
  });
}
