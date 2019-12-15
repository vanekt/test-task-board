import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { compose, withState } from 'recompose';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    const dragItem = monitor.getItem();
    if (!dragItem) {
      return null;
    }

    const dragIndex = dragItem.index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    const monitorItem = monitor.getItem();
    if (monitorItem) {
      monitorItem.index = hoverIndex;
    }
  }
};

const Task = props => {
  const {
    isDragging,
    connectDragSource,
    connectDropTarget,
    data,
    assignee,
    assignees,
    enableEdit,
    deleteTask,
    changeTaskName,
    changeTaskText,
    changeTaskAssignee,
    saveTask,
    isConfirm,
    toggleConfirm
  } = props;
  const opacity = isDragging ? 0 : 1;

  const editOrSaveIcon = data.isEdit ? (
    <IconButton onClick={saveTask} title="Save task">
      <SaveIcon />
    </IconButton>
  ) : (
    <IconButton onClick={enableEdit} title="Edit task">
      <EditIcon />
    </IconButton>
  );

  const deleteIcon = (
    <IconButton
      title="Delete task"
      onClick={() => {
        toggleConfirm(true);
      }}
    >
      <DeleteIcon />
    </IconButton>
  );

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

  const assignedToStr = data.assigneeId ? assignee.name : '-';
  let assigneeDefaultValue = '';
  if (data.dirtyData.assigneeId !== undefined) {
    assigneeDefaultValue = data.dirtyData.assigneeId;
  } else if (assignee && assignee.id) {
    assigneeDefaultValue = assignee.id;
  }
  const assignedTo = data.isEdit ? (
    <Select value={assigneeDefaultValue} onChange={changeTaskAssignee}>
      <MenuItem value="">
        <em>-</em>
      </MenuItem>
      {assignees.map(item => (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
  ) : (
    <span className="TaskAssignee">{assignedToStr}</span>
  );

  const confirmDialog = isConfirm ? (
    <Dialog
      open={true}
      onClose={() => {
        toggleConfirm(false);
      }}
    >
      <DialogTitle>Delete this task?</DialogTitle>
      <DialogActions>
        <Button
          onClick={() => {
            toggleConfirm(false);
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button onClick={deleteTask} color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;

  return (
    connectDragSource &&
    connectDropTarget &&
    connectDragSource(
      connectDropTarget(
        <div style={{ opacity }} className="Task">
          <div className="TaskTop">
            <span className="TaskId">{data.id}</span>
            {taskName}
            <div className="TaskIcons">
              {editOrSaveIcon}
              {deleteIcon}
            </div>
          </div>
          {taskText}
          <div className="TaskAssigneeWrapper">
            <span>Assigned to:</span> {assignedTo}
          </div>
          {confirmDialog}
        </div>
      )
    )
  );
};

const TaskDragSource = DragSource('card', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Task);

const TaskDropTarget = DropTarget('card', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(TaskDragSource);

const enhance = compose(withState('isConfirm', 'toggleConfirm', false));

export default enhance(TaskDropTarget);
