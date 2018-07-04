const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/nodernreact')

require('./todo');

const Todo = mongoose.model('Todo');

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
    
        res.json(todos);
    } catch(e) {
        res.status(500).json({ message: "error processing request" })
    }
})

app.post('/todos', async (req, res) => {
    try {
        const todo = await Todo.create(req.body);

        res.json(todo); 
    } catch(e) {
        res.status(500).json({ message: "error processing request" })      
    }
})

app.listen(3333, () => {
    console.log('API running in port 3000')
})