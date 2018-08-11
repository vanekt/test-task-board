import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Task from '../Task';
import './TaskBoardList.css';

const TaskBoardList = ({ tasks, moveTask, searchText }) => {
  const moveCardHandler =
    searchText === ''
      ? moveTask
      : () => {
          window.alert('Drag and Drop disabled when search field is filled');
        };
  return (
    <div className="TaskBoardList">
      {tasks.map((task, i) => (
        <Task key={task.id} index={i} id={task.id} data={task} moveCard={moveCardHandler} />
      ))}
    </div>
  );
};

export default DragDropContext(HTML5Backend)(TaskBoardList);
