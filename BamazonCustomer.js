const MySQL = require("mysql");

const inquirer = require("inquirer");

const connection = MySQL.createConnection ({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon",
});

connection.connect(function(error){
if (error) throw error;
inventory();
});

function inventory() {
  connection.query("select * from products", function(error, res){
      if (error) throw error;
        for (var i=0; i<res.length; i++) {
            console.log("_____________");
            console.log("id:" + res[i].item_id);
            console.log("name:" + res[i].product_name);
            console.log("price:" + res[i].price);
        }
        purchases();
    })
};

function purchases() {
    inquirer.prompt([{
        type: "input",
        name: "product_id",
        message: "Please insert the ID of you want to buy?",
        filter: Number
    },
    {
        type: "input",
        name: "Quantity",
        message: "How many units of the product do you want to buy?",
        filter: Number
    }
])
.then(function(purchases){

    var items_idy = purchases.product_id;
    var item_qty = purchases.Quantity;
    var query = "select * from products where ?";

    connection.query(query, {item_id:items_idy}, function(error, res){
        if (error) throw error;
          if (res.length===0){
              console.log("Error! That ID doesn't exists. Please try with a valid ID");
              inventory();
          }
          else {

          }
      })
})



}
