import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TaskBoardSearch from '../TaskBoardSearch';
import './TaskBoardHeader.css';

export default ({ addTask }) => {
  return (
    <div className="TaskBoardHeader">
      <IconButton onClick={addTask} title="Add a new task">
        <AddIcon />
      </IconButton>
      <TaskBoardSearch />
    </div>
  );
};
