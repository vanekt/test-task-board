import { connect } from 'react-redux';
import TaskBoardHeader from './TaskBoardHeader';
import { addTask } from '../../actions/tasks';

const mapDispatchToProps = dispatch => ({
  addTask: () => {
    dispatch(addTask());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(TaskBoardHeader);
