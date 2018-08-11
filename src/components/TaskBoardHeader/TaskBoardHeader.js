import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import './TaskBoardHeader.css';

export default () => {
  return (
    <div className="TaskBoardHeader">
      <IconButton color="inherit" aria-label="Menu">
        <AddIcon />
      </IconButton>
    </div>
  );
};
