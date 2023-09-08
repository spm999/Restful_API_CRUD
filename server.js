const express = require("express")
const mongoose = require("mongoose")
const Task = require('./models/taskModel')
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

///routes


app.get('/', (req, res) => {
    res.send("Hello")
})


app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// create a new task
app.post('/task', async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).json(task);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

// update a product
app.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if (!task) {
            return res.status(404).json({ message: `cannot find any task with ID ${id}` })
        }
        const updatedTask = await Task.findById(id);
        res.status(200).json(updatedTask);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


mongoose.connect("mongodb+srv://mshari7185:<Password>@gallary.xducnkc.mongodb.net/Node?retryWrites=true&w=majority")
    .then(() => {
        app.listen(3000, () => {
            console.log("App is running");
        })
        console.log("Connected to mongodb");
    })
    .catch((error) => {
        console.log(error)
    })
