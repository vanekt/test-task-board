import React from 'react';
import Task from '../Task'
import './TaskBoard.css';

const arr = [];
for (let i = 0; i < 12; i++) {
    arr.push(i)
}

export default () => (
    <div className="TaskBoard">
        {arr.map((i) => {
          return  <Task key={i} data={i} />
        })}
    </div>
)