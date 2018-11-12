import React from 'react';
import PropTypes from 'prop-types';

import TaskCreate from '../shared/TaskCreate';
import TaskService from '../../services/tasks';

const propTypes = {
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
};

class SubtaskCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.taskService = new TaskService();
  }

  saveSubtaskHandler = (subtask) => {
    const { match: { params: { id: taskId } } } = this.props;
    const defaultSubtask = {
      timeSpent: 0,
      completed: false,
      name: '',
      notes: '',
    };

    this.taskService.createSubtask(taskId, { ...defaultSubtask, ...subtask }).then((res) => {
      const { history } = this.props;
      history.push(`/tasks/${taskId}/${res.id}`);
    });
  };

  render() {
    return (
      <TaskCreate saveHandler={this.saveSubtaskHandler} />
    );
  }
}

SubtaskCreatePage.propTypes = propTypes;

export default SubtaskCreatePage;
