import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TaskNameInput from './TaskNameInput';
import TextArea from './TextArea';
import SectionHeader from './SectionHeader';
import FullWidthButton from './FullWidthButton';

const Container = styled.div`
  margin: 1rem 0;
  overflow-y: scroll;
  height: -webkit-fill-available;

  @media screen and (max-width: 767px) {
    -webkit-overflow-scrolling: touch;
  }
`;

const propTypes = {
  saveHandler: PropTypes.func.isRequired,
};

class TaskCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      notes: '',
    };
  }

  onNameChangeHandler = e => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };

  onNotesChange = e => {
    const notes = e.target.value;
    this.setState(() => ({ notes }));
  };

  render() {
    const { name, notes } = this.state;
    const { saveHandler } = this.props;

    return (
      <div>
        <TaskNameInput
          name={name}
          aria-label="name"
          onNameChangeHandler={this.onNameChangeHandler}
        />
        <SectionHeader>notes</SectionHeader>
        <TextArea
          aria-label="notes"
          value={notes}
          onChange={this.onNotesChange}
        />
        <Container>
          <FullWidthButton
            color="default"
            onClick={() => saveHandler({ name, notes })}
          >
            Create Task
          </FullWidthButton>
        </Container>
      </div>
    );
  }
}

TaskCreate.propTypes = propTypes;

export default TaskCreate;
