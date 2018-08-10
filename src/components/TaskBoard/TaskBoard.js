import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Task from '../Task';
import './TaskBoard.css';

const TaskBoard = ({ tasks, moveTask }) => (
  <div className="TaskBoard">
    {tasks.map((task, i) => (
      <Task key={task.id} index={i} id={task.id} data={task} moveCard={moveTask} />
    ))}
  </div>
);

export default DragDropContext(HTML5Backend)(TaskBoard);
