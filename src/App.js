import React, { Component } from 'react';
import TaskBoard from './components/TaskBoard';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TaskBoard />
      </div>
    );
  }
}

export default App;
