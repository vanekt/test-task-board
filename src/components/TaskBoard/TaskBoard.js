import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import TaskBoardHeader from '../TaskBoardHeader';
import TaskBoardList from '../TaskBoardList';
import './TaskBoard.css';

export default ({ isInit }) => {
  if (!isInit) {
    return (
      <div className="TaskBoardProgressWrapper">
        <CircularProgress size={50} />
      </div>
    );
  }

  return (
    <div className="TaskBoard">
      <TaskBoardHeader />
      <TaskBoardList />
    </div>
  );
};
