const express = require('express');
const app = express();
const PORT = 3000;

// middleware to parse JSON requests
app.use(express.json());

// in-memory storage for tasks
let tasks = [];

// Routes
// Create a new task
app.post('/tasks', (req, res) => {
    //fetching information from json file of postman or TC
    const { title, description, status } = req.body;
    //will define the newtask
    const newTask = {
        //id length auto updated
        id: tasks.length + 1,title,description,status
    };
    //pushing new created task to the list
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Update a task by ID
app.put('/tasks/:id', (req, res) => {
   //will collect id from the :id
    const taskId = parseInt(req.params.id);
    const { title, description, status } = req.body;
     //as i have given the id it will fetch that specific index
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        //... means i am not changing anything else
        
        tasks[taskIndex] = { ...tasks[taskIndex], title, description, status };
        
        res.json(tasks[taskIndex]);
    } else {
        
        res.status(404).json({ error: 'Task not found' });
    }
});

// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
    
    const taskId = parseInt(req.params.id);
    
    //filter is to refine the queue as i have deleted something
    
    tasks = tasks.filter(task => task.id !== taskId);
    res.status(204).end();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
