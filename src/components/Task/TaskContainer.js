import { connect } from 'react-redux';
import Task from './Task';
import {
  deleteTask,
  toggleEdit,
  changeTaskName,
  changeTaskText,
  changeTaskAssignee,
  saveTask
} from '../../actions/tasks';

const mapStateToProps = (store, ownProps) => {
  // TODO use reselect
  const taskData = ownProps.data;
  const assingeeId = taskData.assigneeId;
  const assignees = store.assignees.items;
  const assignee = assignees.find(item => item.id === assingeeId);

  return {
    assignee: assignee,
    assignees: assignees
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const taskId = ownProps.data.id;
  return {
    enableEdit: () => {
      dispatch(toggleEdit({ taskId, value: true }));
    },
    saveTask: () => {
      dispatch(saveTask({ taskId }));
    },
    deleteTask: () => {
      dispatch(deleteTask({ taskId }));
    },
    changeTaskName: e => {
      // TODO debounce
      dispatch(changeTaskName({ taskId, value: e.target.value }));
    },
    changeTaskText: e => {
      // TODO debounce
      dispatch(changeTaskText({ taskId, value: e.target.value }));
    },
    changeTaskAssignee: e => {
      dispatch(changeTaskAssignee({ taskId, value: e.target.value }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);
