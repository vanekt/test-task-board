import React from 'react';
import TextField from '@material-ui/core/TextField';
import './TaskBoardSearch.css';

export default ({ searchTasks }) => {
  return (
    <div className="TaskBoardSearch">
      <TextField
        label="Search"
        placeholder="Search"
        className="TaskBoardSearch"
        onChange={searchTasks}
      />
    </div>
  );
};
