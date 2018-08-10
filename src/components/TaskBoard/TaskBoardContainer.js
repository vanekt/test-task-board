import { connect } from 'react-redux';
import TaskBoard from './TaskBoard';
import { moveTask } from '../../actions/tasks';

const mapStateToProps = store => ({
  tasks: store.tasks.items
});

const mapDispatchToProps = dispatch => ({
  moveTask: (dragIndex, hoverIndex) => {
    dispatch(moveTask({ dragIndex, hoverIndex }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskBoard);
