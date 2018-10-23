var mysql = require("mysql")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",

    PORT: "8080",

    user: "root",
    password: "root",

    database: "bamazon"
})

connection.connect(function(err){
    if (err) throw err
    console.log("connected as id: " + connection.threadId)
    mainScreen()
})

function mainScreen() {
    inquirer.prompt({
        name:"menu",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }).then(function(input){
        switch(input.menu){
            case("View Products for Sale"):
            viewForSale()
            case("View Low Inventory"):
            viewLowInventory()
            case("Add to Inventory"):
            addToInventory()
            case("Add New Product"):
            addNewProduct()
        }
    })
}

function viewForSale() {
    connection.query("SELECT * FROM products", function(err, res){
        for(var i = 0; i < res.length; i++) {
            console.log(res[i].item_id  + " " + res[i].product_name + " " + res[i].department_name + " $" + res[i].price.toFixed(2) + " " + res[i].stock_quantity + "\n")
        }
    })
}

function viewLowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity <= ?"
    connection.query(query, ["5"], function(err, res){
        for(var i = 0; i < res.length; i++) {
            console.log(res[i].product_name + ", Stock Available: " + res[i].stock_quantity)
        }
    })
}

function addToInventory() {
    connection.query("SELECT * FROM products", function(err, res){
        var choiceArr = []
        for(var i = 0; i < res.length; i++) {
            choiceArr.push(res[i].product_name)
        }
        inquirer.prompt({
            name:"addItem",
            type:"list",
            message: "Choose an item to add to stock quantity: \n",
            choices: choiceArr
        }).then(function(input){
            connection.query("UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: 200
                },
                {
                    product_name: input.addItem
                }
            
            ], function(err, res){
                console.log(input.addItem + " stock added")
            })
        })
    })
}

function addNewProduct() {
    inquirer.prompt([
        {
            name: "productName",
            type: "input",
            message: "Name a product to add"
        },
        {
            name: "department",
            type: "input",
            message: "Department name?"
        },
        {
            name: "price",
            type: "input",
            message: "What price should the item list at?"
        },
        {
            name: "stockQuantity",
            type: "input",
            message: "How much do we have in stock?"
        }
    ]).then(function(input){
        connection.query("INSERT INTO products SET ?", 
        {
            product_name: input.productName,
            department_name: input.department,
            price: input.price,
            stock_quantity: input.stockQuantity
        }, function(err, res){
            if(err) {
                throw err
            } else {
                console.log(input.productName + " added to database")
            }
        })
    })
}

