var inquirer = require("inquirer")
var mysql = require("mysql")

var connection = mysql.createConnection({
    host:"localhost",

    PORT: "8080",

    user: "root",
    password: "root",
    
    database: "bamazon"
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("connection as id: " + connection.threadId + "\n")
    listProducts()
})

function listProducts() {
    console.log("Available procusts: \n")
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err

        for(var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " " + res[i].product_name + " " + "$" + res[i].price)
        }
        buyProducts()
    })
}

function buyProducts() {
    connection.query("SELECT * FROM products", function(err, res){
        inquirer.prompt([
            {
                name: "productChoice",
                type: "list",
                message: "What are you interested in buying?",
                choices: function() {
                    var productArray = []
                    for(var i = 0; i < res.length; i++) {
                        productArray.push(res[i].product_name)
                    };
                    return productArray;
                },
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to buy?"
            }
        ]).then(function(input){
            var itemSelected
            for(var i = 0; i < res.length; i++){
                if(res[i].product_name === input.productChoice){
                    itemSelected = res[i]
                }
            }

            if(itemSelected.stock_quantity >= parseInt(input.quantity)) {
                var newTotalStock = itemSelected.stock_quantity - parseInt(input.quantity)

                connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: newTotalStock
                    },
                    {
                        product_name: itemSelected.product_name
                    }
                ], function(error){
                    if (error) throw err
                    console.log("You purchased " + itemSelected.product_name + " for $" + itemSelected.price)
                    restart()
                })
            } else {
                console.log("Sorry, insufficient stock! \n")
                restart()
            }
        })
    })
}

function restart() {
    inquirer.prompt({
        name: "restart",
        type: "list",
        message: "Would you like to purchase another item?",
        choices: ["Yes", "No"]
    }).then(function(input) {
        if (input.resart === "Yes") {
            buyProducts()
        } else {
            connection.end()
        }
    })
}
