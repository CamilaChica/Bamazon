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
    })
};

