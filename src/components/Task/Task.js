import React from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import cn from 'classnames';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

import './Task.css';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    if (!component) {
      return null;
    }
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

const Task = props => {
  const {
    isDragging,
    connectDragSource,
    connectDropTarget,
    data,
    assignee,
    enableEdit,
    deleteTask,
    changeTaskName,
    changeTaskText,
    saveTask
  } = props;
  const opacity = isDragging ? 0 : 1;
  const assignedToStr = data.assigneeId ? assignee.name : '-';

  const editOrSaveIcon = data.isEdit ? (
    <SaveIcon onClick={saveTask} />
  ) : (
    <EditIcon onClick={enableEdit} />
  );

  const deleteIcon = <DeleteIcon onClick={deleteTask} />;

  const taskName = data.isEdit ? (
    <textarea defaultValue={data.name} className="TaskNameEdit" onChange={changeTaskName} />
  ) : (
    <p className="TaskName">{data.name}</p>
  );

  const taskText = data.isEdit ? (
    <textarea defaultValue={data.text} className="TaskTextEdit" onChange={changeTaskText} />
  ) : (
    <div className="TaskText">{data.text}</div>
  );

  return (
    connectDragSource &&
    connectDropTarget &&
    connectDragSource(
      connectDropTarget(
        <div style={{ opacity }} className={cn('Task', 'fade')}>
          <div className="TaskIcons">
            {editOrSaveIcon}
            {deleteIcon}
          </div>
          <span className="TaskId">{data.id}</span>
          {taskName}
          {taskText}
          <p>
            Assigned to: <span className="TaskAssignee">{assignedToStr}</span>
          </p>
        </div>
      )
    )
  );
};

const TaskDragSource = DragSource('card', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Task);

export default DropTarget('card', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(TaskDragSource);
