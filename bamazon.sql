DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;
USE bamazon_DB;

CREATE TABLE products (

    item_id INTEGER(1) AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price INTEGER(10) NOT NULL,
    stock_quantity INTEGER(100) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dagger", "Simple Melee Weapon", 2, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Handaxe", "Simple Melee Weapon", 5, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Javelin", "Simple Melee Weapon", 5, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Light Hammer",  "Simple Melee Weapon", 2, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sickle", "Simple Melee Weapon", 1, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spear", "Simple Melee Weapon", 1, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Battleaxe", "Martial Melee Weapon", 10, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Flail", "Martial Melee Weapon", 10, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Glaive", "Martial Melee Weapon", 20, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Greataxe", "Martial Melee Weapon", 30, 10);