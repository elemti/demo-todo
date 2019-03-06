import React from 'react';
import TaskItem from '../TaskItem';
import AppContext from '../AppContainer/context';

class TaskList extends React.PureComponent {
  componentDidMount() {
    this.props.appActions.loadTasks();
  }
  render() {
    let { tasks, appActions } = this.props;
    tasks = tasks.slice().sort((a, b) => b.createdTime - a.createdTime);
    return (
      <div className="task-list">
        {tasks.map(task => {
          return <TaskItem
            key={task.id}
            task={task}
            onEdit={editedTask => appActions.updateTask({ ...task, ...editedTask })}
            onDelete={() => appActions.deleteTask(task.id)}
          />;
        })}
      </div>
    );
  }
}

export default props => <AppContext.Consumer>
  {({ tasks, actions }) => (
    <TaskList
      appActions={actions}
      tasks={tasks}
    />
  )}
</AppContext.Consumer>;
