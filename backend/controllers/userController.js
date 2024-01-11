const userModel = require("../models/userModel");

exports.getUser = (req, res) => {
  userModel.getAllUser((err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Erreur serveur");
    }
    res.render("user/users", { model: rows });
  });
};

exports.getCreate = (req, res) => {
  res.render("user/create", { model: {} });
};

exports.postCreate = (req, res) => {
  const { FirstName, LastName } = req.body;
  const user = [FirstName, LastName];
  userModel.createUser(user, (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Erreur serveur");
    }
    res.redirect("/users");
  });
};

exports.getEdit = (req, res) => {
  const id = req.params.id;
  userModel.getUserById(id, (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Erreur serveur");
    }
    res.render("user/edit", { model: row });
  });
};

exports.postEdit = (req, res) => {
  const id = req.params.id;
  const { FirstName, LastName} = req.body;
  const user = [FirstName, LastName, id];
  userModel.updateUser(user, (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Erreur serveur");
    }
    res.redirect("/users");
  });
};

exports.getDelete = (req, res) => {
  const id = req.params.id;
  userModel.getUserById(id, (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Erreur serveur");
    }
    res.render("user/delete", { model: row });
  });
};

exports.postDelete = (req, res) => {
  const id = req.params.id;
  userModel.deleteUser(id, (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Erreur serveur");
    }
    res.redirect("/users");
  });
};

exports.getDetails = (req, res) => {
  const id = req.params.id;
  userModel.getUserById(id, (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Erreur serveur");
    }
    res.render("user/detail", { model: row });
  });
};
