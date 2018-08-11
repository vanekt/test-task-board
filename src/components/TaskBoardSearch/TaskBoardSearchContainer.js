import { connect } from 'react-redux';
import TaskBoardSearch from './TaskBoardSearch';
import { searchTasks } from '../../actions/tasks';

const mapDispatchToProps = dispatch => ({
  searchTasks: e => {
    dispatch(searchTasks(e.target.value));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(TaskBoardSearch);
