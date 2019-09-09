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
              console.log("Error! That ID doesn't exist. Please try with a valid ID");
              inventory();
          }

          else {
            var product_info = res[0];
            if (item_qty<=product_info.stick_quantity) {
                console.log(product_info.product_name + " is available in stock\n");
                var subtract = "UPDATE products SET stick_quantity = " + (product_info.stick_quantity-item_qty) + " WHERE item_id = " + items_idy;
                connection.query(subtract, function(error, res) {
                    if (error) throw error;
                    console.log("Your order has been placed");
                    console.log("You ordered " + product_info.product_name );
                    console.log("The quantity you ordered was " + item_qty);
                    console.log("TOTAL: " + (product_info.price*item_qty));
                    connection.end();
                })
                
            }
            else {
                console.log("Your order cannot be placed, the quantity you require is not as long available in our inventory\n");
                setTimeout(function(){
                    inventory()
                },5000)
            }
          }
      })
})



}
