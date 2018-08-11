import { connect } from 'react-redux';
import Task from './Task';
import { toggleEdit } from '../../actions/tasks';

const mapStateToProps = (store, ownProps) => {
  // TODO use reselect
  const taskData = ownProps.data;
  const assingeeId = taskData.assigneeId;
  const assignees = store.assignees.items;
  const assignee = assignees.find(item => item.id === assingeeId);

  return {
    assignee: assignee
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const taskId = ownProps.data.id;
  return {
    enableEdit: () => {
      dispatch(toggleEdit({ taskId, value: true }));
    },
    disableEdit: () => {
      dispatch(toggleEdit({ taskId, value: false }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);
