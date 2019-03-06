const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const state = {
  tasks: [{
    id: Date.now(),
    text: 'Test task 1',
    createdTime: Date.now(),
    done: false,
  }],
};

app.use(cors());

app.post('/deleteTask', bodyParser.json(), (req, res) => {
  const { id } = req.body;
  state.tasks = state.tasks.filter(_task => _task.id !== id);
  res.status(204).end();
});
app.post('/updateTask', bodyParser.json(), (req, res) => {
  const task = req.body;
  state.tasks.forEach(_task => _task.id === task.id && Object.assign(_task, task));
  res.status(204).end();
});
app.post('/addTask', bodyParser.json(), (req, res) => {
  state.tasks.unshift(req.body);
  res.status(204).end();
});
app.get('/getTasks', (req, res) => res.json({
  tasks: state.tasks,
}));

app.listen(12080);
