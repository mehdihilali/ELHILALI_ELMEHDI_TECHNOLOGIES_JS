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
app.get('/AllItems', (req, res) => {
    console.log('GET request received for /items');
    res.json(items); // Return all items as a JSON response
});

//  GET : Endpoint by ID (Retrieve a Specific Item)
app.get('/item/:id', (req, res) => {
    const { id } = req.params;
    const item = items.find(i => i.id === id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).send('Item not found');
    }
});

// PUT : Endpoint (Update an Item)
app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const index = items.findIndex(i => i.id === id); // Compare as string

    if (index !== -1) {
        // Merge existing item with updated data
        items[index] = { ...items[index], ...req.body };
        res.send('Item updated');
    } else {
        res.status(404).send('Item not found');
    }
});

// DELETE
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
      items.splice(index, 1);
      res.send('Item deleted');
    } else {
      res.status(404).send('Item not found');
    }
});
  
  

app.listen(port, () => {
    console.log(`Node.js server started on port: ${port}`);
});
