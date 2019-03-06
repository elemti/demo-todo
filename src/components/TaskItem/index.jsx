import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';

export default class extends React.Component {
  state = {
    editing: false,
    checked: false,
  };
  editTask = (startEdit = true) => {
    this.setState({ editing: startEdit });
  };
  deleteTask = () => {
    this.props.onDelete();
  };
  saveEdit = (newText) => {
    this.props.onEdit({
      ...this.props.task,
      text: newText,
    });
    this.editTask(false);
  };
  finishTask = (finish = true) => {
    this.props.onEdit({
      ...this.props.task,
      done: finish,
    });
  };
  render() {
    const { task } = this.props;
    const { text } = task;

    return (
      <div className={[
        'task-item',
        this.state.editing && '_editing',
        task.done && '_done',
      ].filter(x => x).join(' ')}>
        <Checkbox
          classes={{ root: '_checkbox' }}
          color="primary"
          checked={task.done}
          onChange={e => this.finishTask(e.target.checked)}
        />
        <div className="_text" onClick={e => this.editTask()}>
          {!this.state.editing ? (
            <span>{text}</span>
          ) : (
            <input
              type="text"
              autoFocus
              defaultValue={text}
              onBlur={e => this.editTask(false)}
              onKeyDown={e => {
                switch (e.key) {
                  case 'Escape':
                    return this.editTask(false);
                  case 'Backspace':
                    if (!e.target.value) this.deleteTask();
                    return;
                  case 'Enter':
                    return this.saveEdit(e.target.value);
                  default: return;
                }
              }}
            />
          )}
        </div>
        <div className="_delete-btn"></div>
      </div>
    );
  }
}
