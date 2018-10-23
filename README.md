# Bamazon

## Bamazon is  a project used to gain an understanding of managing and manipulating a SQL database by developing CRUD applications.



# 1. Bamazon Customer

* To run the bamazon customer, simply type `node bamazonCustomer.js` into the termial or bash command line while in the bamazon-proj directory.

* Simply follow the promts provided in the terminal to choose a product and amount to purchase.

* Once "purchased" the SQL database will be updated with new `stock_quantity` based on the amount "purchased"


# 2. Bamazon Manager

* To run Bamazon Manager, simply type `node bamazonManager.js` into terminal or bash command line while in the the bamazon-proj directory

* You are then presented with possible managerial action to take, choose one to continue.

### View for Sale

* View for Sale will list all items currently for sale at Bamazon including Item ID, Product Name, Department, Price, and Stock Quantity all pulled from the mySQL database.

### View Low Inventory

* View Low Inventory will allow the Manager to find any item listed wil "low" stock (<=5).

### Add to Inventory

* Add to Inventory will allow you to "restock" a chosen item.

### Add New Product

* Add New Product allows the Manager to add new items to the inventory. Simply input the product name, department, price,a nd stock quantity and the new item will be added to the mySQL database.

