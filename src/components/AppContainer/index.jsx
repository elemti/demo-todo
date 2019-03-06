import { debounce } from 'debounce';
import React from 'react';
import request from 'request-promise-native';
import App from '../App';
import AppContext from './context';

export default class extends React.Component {
  actions = {
    loadTasks: async () => {
      try {
        const tasks = await request.get({
          url: `${window.location.origin}/api/tasks`,
          json: true,
        });
        this.setState({ tasks });
      } catch (err) {
        console.error(err);
      }
    },
    addTask: async text => {
      const newTask = {
        id: Date.now(),
        text: text,
        createdTime: Date.now(),
        done: false,
      };
      this.setState({ tasks: this.state.tasks.concat(newTask) });
      await request.post({
        url: `${window.location.origin}/api/tasks`,
        json: true,
        body: newTask,
      }).catch(console.error);
      await this.actions.loadTasks();
    },
    updateTask: task => {
      const tasks = this.state.tasks.map(_task => {
        if (task.id === _task.id) {
          return {
            ..._task,
            ...task,
          };
        }
        return _task;
      });
      this.setState({ tasks });
      this.actions.updateTaskBackend(task);
    },
    updateTaskBackend: debounce(async task => {
      await request.patch({
        url: `${window.location.origin}/api/tasks/${task.id}`,
        json: true,
        body: task,
      }).catch(console.error);
      await this.actions.loadTasks();
    }, 300),
    deleteTask: async id => {
      this.setState({ tasks: this.state.tasks.filter(task => task.id !== id) });
      await request.delete({
        url: `${window.location.origin}/api/tasks/${id}`,
        json: true,
      }).catch(console.error);
      await this.actions.loadTasks();
    },
  };
  state = {
    tasks: [],
    actions: this.actions,
  };
  render() {
    return (
      <AppContext.Provider value={this.state}>
        <App />
      </AppContext.Provider>
    );
  }
};
