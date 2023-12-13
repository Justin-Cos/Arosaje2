const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db_name = path.join(__dirname, "../data", "apptest.db");
const db = new sqlite3.Database(db_name, (err) => {
  if (err) {
    console.error(err.message);
  }
});

exports.getAllUserPlant = (callback) => {
  const sql = "SELECT Users.*, Plants.plantName AS OwnedPlantName FROM Users LEFT JOIN Plants ON Users.userID = Plants.ownerID";
  db.all(sql, [], callback);
};

exports.getAllUser = (callback) => {
  const sql = `SELECT u.userID,u.firstName,u.lastName, GROUP_CONCAT(p.plantName) AS ownedPlants
               FROM users u LEFT JOIN plants p ON u.userID = p.ownerID GROUP BY u.userID;`;
  db.all(sql, [], callback);
};

// exports.getAllUser = (callback) => {
//   const sql = "SELECT * FROM Users";
//   db.all(sql, [], callback);
// };

exports.getUserById = (id, callback) => {
  const sql = "SELECT * FROM Users WHERE UserID = ?";
  db.get(sql, id, callback);
};

exports.createUser = (user, callback) => {
  const sql = "INSERT INTO Users (FirstName, LastName) VALUES (?, ?)";
  db.run(sql, user, callback);
};

exports.updateUser = (user, callback) => {
  const sql = "UPDATE Users SET FirstName = ?, LastName = ? WHERE UserID = ?";
  db.run(sql, user, callback);
};

exports.deleteUser = (id, callback) => {
  const sql = "DELETE FROM Users WHERE UserID = ?";
  db.run(sql, id, callback);
};



