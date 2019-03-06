import React from 'react';
import Paper from '@material-ui/core/Paper';
import Toolbar from '../Toolbar';
import TaskList from '../TaskList';

class App extends React.PureComponent {
  render() {
    return (
      <Paper classes={{ root: 'App' }}>
        <Toolbar />
        <TaskList />
      </Paper>
    );
  }
}

export default App;
