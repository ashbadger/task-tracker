import React from 'react';
import PropTypes from 'prop-types';

import TaskCreate from '../shared/TaskCreate';
import TaskService from '../../services/tasks';

const propTypes = {
  history: PropTypes.shape({}).isRequired,
};

class TaskCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.taskService = new TaskService();
  }

  saveTaskHandler = (task) => {
    this.taskService.createTask(task).then((res) => {
      const { history } = this.props;
      history.push(`/tasks/${res.id}`);
    });
  };

  render() {
    return (
      <TaskCreate saveHandler={this.saveTaskHandler} />
    );
  }
}

TaskCreatePage.propTypes = propTypes;

export default TaskCreatePage;
