const express = require('express');
const app = express();
const port = 5001;

let items = [];

// Middleware to parse incoming JSON requests and convert them to JavaScript objects
app.use(express.json());

// POST : Create Item
app.post('/createItem', (req, res) => {
    const item = req.body;

    // Check if the request body contains the correct data
    if (!item || Object.keys(item).length === 0) {
        return res.status(400).send('Invalid item');
    }

    items.push(item);  // Add the item to the items array

    console.log(items); // Log the items array to ensure it contains the new item

    res.status(201).send('Item added successfully');
});

// GET : retrieve all items
app.get('/items', (req, res) => {
    console.log('GET request received for /items');
    res.json(items); // Return all items as a JSON response
});


app.listen(port, () => {
    console.log(`Node.js server started on port: ${port}`);
});
