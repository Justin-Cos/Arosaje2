const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const conf = require("../config.json");

const db_name = path.join(__dirname, "../database", conf.database_url);
const db = new sqlite3.Database(db_name, (err) => {
  if (err) {
    console.error(err.message);
  }
});

exports.getAllPlants = (callback) => {
  const sql = "SELECT Plants.*, Users.FirstName AS OwnerFirstName, Users.LastName AS OwnerLastName FROM Plants LEFT JOIN Users ON Plants.ownerID = Users.userID ORDER BY Plants.plantID";
  db.all(sql, [], callback);
};

exports.getPlantById = (id, callback) => {
  const sql = "SELECT * FROM Plants WHERE plantID = ?";
  db.get(sql, id, callback);
};

exports.createPlant = (plante, callback) => {
  const sql = "INSERT INTO Plants (plantName, famille, location) VALUES (?, ?, ?)";
  db.run(sql, plante, callback);
};

exports.updatePlant = (plante, callback) => {
  const sql = "UPDATE Plants SET plantName = ?, famille = ?, location = ? WHERE plantID = ?";
  db.run(sql, plante, callback);
};

exports.deletePlant = (id, callback) => {
  const sql = "DELETE FROM Plants WHERE plantID = ?";
  db.run(sql, id, callback);
};

exports.getPlantByIdALL = (id, callback) => {
  const sql = "SELECT Plants.*, Users.FirstName AS OwnerFirstName, Users.LastName AS OwnerLastName FROM Plants LEFT JOIN Users ON Plants.ownerID = Users.userID WHERE plantID = ? ORDER BY Plants.plantID";
  db.get(sql, id, callback);
};

