DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("T-shit", "Clothing", 10.00, 20),
("Fresh Adidas Kicks", "Clothing", 200.00, 5),
("Bread", "Food", 2.00, 100),
("Couch", "Furniture", 100.00, 2),
("Watch", "Jewelry", 50.00, 25),
("Pillow", "Furniture", 20.00, 55),
("Ring", "Jewelry", 300.00, 10),
("Baseball Cap", "CLothing", 45.00, 10),
("Futon", "Furniture", 75.00, 10),
("Chips", "Food", 1.50, 200);

