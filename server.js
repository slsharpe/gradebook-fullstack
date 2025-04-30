<<<<<<< HEAD
const express = require("express");
const { Pool } = require("pg");
const path = require("path");

const app = express();
const port = 3000;

// PostgreSQL pool with NO password
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "gradebook",
  port: 5432,
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/grades", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM grades");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving grades");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
=======
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
>>>>>>> 59a6c15a0666a1f2c172226714329a95fe76dba5
