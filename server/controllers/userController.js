const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

//view
exports.view = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as ID " + connection.threadId);

    //Do query and render the data
    connection.query(
      "SELECT * FROM user WHERE status='active'",
      (err, rows) => {
        //release the connection after the query
        connection.release();
        if (!err) {
          res.render("home", { rows });
        } else {
          console.log(err);
        }
        console.log("the data from user table =" + rows);
      }
    );
  });
};

//find user by search
exports.find = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as ID " + connection.threadId);

    let searchTerm = req.body.search;
    console.log(searchTerm);
    //Do query and render the data
    connection.query(
      "SELECT * FROM user WHERE first_name LIKE ? ",
      ["%" + searchTerm + "%"],
      (err, rows) => {
        //release the connection after the query
        connection.release();
        if (!err) {
          res.render("home", { rows });
        } else {
          console.log(err);
        }
        console.log("the data from user table =" + rows);
      }
    );
  });
};

exports.form = (req, res) => {
  res.render("add-user");
};
//add new user
exports.create = (req, res) => {
  // res.render("add-user");
  const { first_name, last_name, email, phone, comments } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as ID " + connection.threadId);

    let searchTerm = req.body.search;
    console.log(searchTerm);
    //Do query and render the data
    connection.query(
      "INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?",
      [first_name, last_name, email, phone, comments],
      (err, rows) => {
        //release the connection after the query
        connection.release();
        if (!err) {
          res.render("add-user", { alert: "user added successfully." });
        } else {
          console.log(err);
        }
        console.log("the data from user table =" + rows);
      }
    );
  });
};

exports.edit = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as ID for edit user " + connection.threadId);
    //Do query and render the data
    connection.query(
      "SELECT * FROM user WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        //release the connection after the query
        connection.release();
        if (!err) {
          res.render("edit-user", { rows });
        } else {
          console.log(err);
        }
        console.log("the data from user table =" + rows);
      }
    );
  });
};

exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as ID for edit user " + connection.threadId);
    //Do query and render the data
    connection.query(
      "UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?",
      [first_name, last_name, email, phone, comments, req.params.id],
      (err, rows) => {
        //release the connection after the query
        connection.release();
        if (!err) {
          pool.getConnection((err, connection) => {
            if (err) throw err;
            console.log("connected as ID for edit user " + connection.threadId);
            //Do query and render the data
            connection.query(
              "SELECT * FROM user WHERE id = ?",
              [req.params.id],
              (err, rows) => {
                //release the connection after the query
                connection.release();
                if (!err) {
                  res.render("edit-user", {
                    rows,
                    alert: `${first_name} has been updated`,
                  });
                } else {
                  console.log(err);
                }
                console.log("the data from user table =" + rows);
              }
            );
          });
        } else {
          console.log(err);
        }
        console.log("the data from user table =" + rows);
      }
    );
  });
};

exports.delete = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as ID for edit user " + connection.threadId);
    //Do query and render the data
    connection.query(
      "DELETE FROM user WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        //release the connection after the query
        connection.release();
        if (!err) {
          res.redirect("/");
        } else {
          console.log(err);
        }
        console.log("the data from user table =" + rows);
      }
    );
  });
};

exports.viewall = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as ID " + connection.threadId);

    //Do query and render the data
    connection.query(
      "SELECT * FROM user WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        //release the connection after the query
        connection.release();
        if (!err) {
          res.render("home", { rows });
        } else {
          console.log(err);
        }
        console.log("the data from user table =" + rows);
      }
    );
  });
};
