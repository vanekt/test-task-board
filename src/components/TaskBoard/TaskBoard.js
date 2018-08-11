import React from 'react';
import TaskBoardHeader from '../TaskBoardHeader';
import TaskBoardList from '../TaskBoardList';
import './TaskBoard.css';

export default props => {
  return (
    <div className="TaskBoard">
      <TaskBoardHeader />
      <TaskBoardList />
    </div>
  );
};
