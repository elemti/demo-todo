import React from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AppContext from '../AppContainer/context';

class Toolbar extends React.PureComponent {
  state = {
    showInput: false,
    inputVal: '',
  }
  showInput = (show = true) => {
    this.setState({ showInput: show });
    if (!show) this.clearInput();
  }
  addItem = () => {
    const { addTask } = this.props.appActions;
    addTask(this.state.inputVal);
    this.clearInput();
    // this.showInput(false);
  }
  inputOnChange = e => this.setState({ inputVal: e.target.value })
  clearInput = () => this.setState({ inputVal: '' })
  render() {
    return (
      <div className="toolbar">
        {!this.state.showInput && (
          <Button
            variant="outlined"
            color="primary"
            onClick={this.showInput}
          >
            Add a task
          </Button>
        )}
        {this.state.showInput && (
          <Input
            fullWidth
            value={this.state.inputVal}
            autoFocus
            placeholder="Add a task"
            onChange={this.inputOnChange}
            inputProps={{
              onBlur: e => this.showInput(false),
              onKeyDown: e => {
                switch (e.key) {
                  case 'Backspace':
                    if (!this.state.inputVal) this.showInput(false);
                    return;
                  case 'Escape': return this.showInput(false);
                  case 'Enter': return this.addItem();
                  default: return;
                }
              },
            }}
          />
        )}
      </div>
    );
  }
};

export default props => <AppContext.Consumer>
  {({ actions }) => <Toolbar appActions={actions} />}
</AppContext.Consumer>;
