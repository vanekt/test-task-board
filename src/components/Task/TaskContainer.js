import { connect } from 'react-redux';
import Task from './Task';

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
  return {
    // enableEdit: () => {
    //   dispatch(enableEdit());
    // }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);
