const express = require("express");

const router = express.Router();

const filename = "./database/database.sqlite";
const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename
  }
});

router.get("/customers", function(req, res) {
  // TODO: fix code here
  const sqlStatement = "select * from customers";

  knex.raw(sqlStatement).then(data => res.json(data));
});

router.get("/customers/:id", async (req, res) => {
  const customerId = req.params.id;
  const sqlStatement = `select * from customers where id = ${customerId}`;

  try {
    const data = await knex.raw(sqlStatement);
    res.json(data);
  } catch (err) {
    // res.send(500)
  }
});

router.get("/customers/:surname", function(req, res) {
  const customerSurname = req.params.surname;
  const sqlStatement = `select * from customers where surname like "%${customerSurname}%"`;
  knex.raw(sqlStatement).then(data => res.json(data));
});

router.post("/customers/", function(req, res) {
  const body = req.body;
  const sqlStatement = `INSERT INTO customers (title, firstname, surname, email) VALUES ("${
    body.title
  }", "${body.firstname}", "${body.surname}", "${body.email}")`;
  knex.raw(sqlStatement).then(data => res.send("Sucessfully updated"));
});

router.put("/customers/:id", function(req, res) {
  const body = req.body;
  const customerId = req.params.id;
  const sqlStatement = `UPDATE customers 
    SET title = "${body.title}", 
        firstname = "${body.firstname}", 
        surname = "${body.surname}", 
        email = "${body.email}" 
    WHERE id = ${customerId}`;
  knex.raw(sqlStatement).then(data => res.send("Sucessfully updated"));
});

router.delete("/customers/:id", (req, res) => {
  const customerId = req.params.id;
  const sqlStatement = `delete from customers where id = ${customerId}`;
  knex.raw(sqlStatement).then(data => res.send("successfully deleted!"));
});

// get '/reservations'
// TODO: add code here

// get '/reservations/:id'
// TODO: add code here

// delete '/reservations/:id'
// TODO: add code here

// get '/reservations/starting-on/:startDate'
// TODO: add code here

// get '/reservations/active-on/:date'
// TODO: add code here

// post '/reservations'
// EXPECTED JSON Object:
// {
//   customer_id: 1,
//   room_id: 1,
//   check_in_date: '2018-01-20',
//   check_out_date: '2018-01-22',
//   room_price: 129.90
// }
// TODO: add code here

// get `/detailed-invoices'
// TODO: add code here

// get `/reservations/details-between/:from_day/:to_day`
// TODO: add code here

module.exports = router;
