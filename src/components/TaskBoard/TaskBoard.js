import React from 'react';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Task from '../Task';
import './TaskBoard.css';
import update from 'immutability-helper'

class TaskBoard extends React.Component {
    state = {
        cards: [
            {
                id: 1,
                text: 'Write a cool JS library',
            },
            {
                id: 2,
                text: 'Make it generic enough',
            },
            {
                id: 3,
                text: 'Write README',
            },
            {
                id: 4,
                text: 'Create some examples',
            },
            {
                id: 5,
                text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
            },
            {
                id: 6,
                text: '???',
            },
            {
                id: 7,
                text: 'PROFIT',
            },
        ]
    };

    render() {
        return (
            <div className="TaskBoard">
                {this.state.cards.map((task, i) => (
                    <Task
                        key={task.id}
                        index={i}
                        id={task.id}
                        data={task}
                        moveCard={this.moveCard}
                    />
                ))}
            </div>
        )
    }

    moveCard = (dragIndex, hoverIndex) => {
        const { cards } = this.state;
        const dragCard = cards[dragIndex];

        this.setState(
            update(this.state, {
                cards: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
                },
            }),
        )
    }
}

export default DragDropContext(HTML5Backend)(TaskBoard)