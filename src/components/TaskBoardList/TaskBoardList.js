import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { compose, withState } from 'recompose';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Task from '../Task';
import './TaskBoardList.css';

const TaskBoardList = ({ tasks, moveTask, searchText, isAlertOpen, toggleAlert }) => {
  const alertDialog = (
    <Dialog
      open={isAlertOpen}
      onClose={() => {
        toggleAlert(false);
      }}
    >
      <DialogTitle>Drag and Drop disabled when search field is filled</DialogTitle>
      <DialogActions>
        <Button
          onClick={() => {
            toggleAlert(false);
          }}
          color="primary"
          autoFocus
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );

  const moveCardHandler =
    searchText === ''
      ? moveTask
      : () => {
          toggleAlert(true);
        };
  return (
    <div>
      <div className="TaskBoardList">
        {tasks.map((task, i) => (
          <Task key={task.id} index={i} id={task.id} data={task} moveCard={moveCardHandler} />
        ))}
      </div>
      {alertDialog}
    </div>
  );
};

const enhance = compose(withState('isAlertOpen', 'toggleAlert', false));
export default enhance(DragDropContext(HTML5Backend)(TaskBoardList));
