// REQUIREMENTS
// ================================================

var mysql = require('mysql');
var inquirer = require('inquirer');


// CONNECTION TO MYSQL
// ================================================

var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bamazon_DB'
});

// FUNCTIONS
// ================================================

// Run connection function...
connection.connect(function (err) {
    // If there's an error, throw the error message
    if (err) throw err;
    // Show connected message
    console.log("connected as id " + connection.threadId);
    // Once connected, call function to show all items in store
    queryAllProducts();
});

// This is the function to show...
function queryAllProducts() {
    // all products in products table and store result here
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            // Build a message with for loop of all items in store with their price and quantity
            console.log(res[i].item_id + " | " + res[i].product_name + " | Price: " + res[i].price + " | QTY: " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
        // Prompt the customer the message below
        promptCustomer(res);
    });
}

// Function to ask the customer what item they'd like to purchase
var promptCustomer = function (res) {
    // Uses inquirer to prompt the question and store the answer
    inquirer.prompt([{
        type: 'input',
        name: 'choice',
        message: "Enter ID of item you want to purchase"
    }])
        // Promises to take user's answer and hold it here
        .then(function (answer) {
            var correct = false;
            for (var i = 0; i < res.length; i++) {
                // Checks to see if the answer entered is truthy
                if (res[i].item_id == answer.choice) {
                    correct = true;
                    // Variables are stored for the product and id
                    // *** Disclaimer : This is where I referenced the video as I was on the right path but did not quite get there alone
                    var product = answer.choice;
                    var id = i;
                    // A second prompt to the user to ask for quantity of purchase
                    inquirer.prompt({
                        type: 'input',
                        name: 'quantity',
                        message: "Enter quantity of item you want to purchase",
                        // Validates the value
                        // *** Disclaimer: I copied this directly from previous activities and don't 100% remember or understand what it means, I just know it's supposed to validate the user input
                        validate: function (value) {
                            if (isNaN(value) == false) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    // A promise is made which stores the answer from above prompts
                    }).then(function (answer) {
                        // Created a variable to store the final quantity count
                        var final = (res[id].stock_quantity - answer.quantity)
                        // If final quantity is greater than 0
                        if (final > 0) {
                            // Run the connection query to update the quantity on the products table
                            connection.query("UPDATE products SET stock_quantity='" + final + "' WHERE item_id='" + product + "'", function (err, res2) {
                                console.log("bought");
                                // Show the item table again with new quantity
                                queryAllProducts();
                            })
                        // If final quantity is NOT greater than 0, run an error message and prompt customer to pick again
                        } else {
                            console.log("Not a valid selection!");
                            promptCustomer(res);
                        }
                    })
                }
            }

        })
}