import { connect } from 'react-redux';
import TaskBoardList from './TaskBoardList';
import { moveTask } from '../../actions/tasks';

const mapStateToProps = store => {
  // TODO use reselect
  const allTasks = store.tasks.items;
  const assignees = store.assignees.items;
  const searchText = store.tasks.searchText;
  let filteredTasks = [...allTasks];
  if (searchText !== '') {
    filteredTasks = allTasks.filter(item => {
      const assignee = assignees.find(a => a.id === item.assigneeId);
      return (
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        assignee.name.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }

  return {
    tasks: filteredTasks,
    searchText
  };
};

const mapDispatchToProps = dispatch => ({
  moveTask: (dragIndex, hoverIndex) => {
    dispatch(moveTask({ dragIndex, hoverIndex }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskBoardList);
