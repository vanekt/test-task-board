import { connect } from 'react-redux';
import TaskBoard from './TaskBoard';

const mapStateToProps = store => ({
  isInit: store.tasks.isInit
});

export default connect(mapStateToProps)(TaskBoard);
