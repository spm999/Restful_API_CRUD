// models/taskModel.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter title"],
  },
  description: {
    type: String,
    required: [true, "Please enter description"],
  },
  status: {
    type: String,
    enum: ['completed', 'pending'],
    default: 'pending',
  },
},

);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
