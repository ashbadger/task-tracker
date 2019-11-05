class Subtask {
  constructor({
    name = '',
    notes = '',
    completed = false,
    timeSpent = 0,
  } = {}) {
    this.name = name;
    this.notes = notes;
    this.completed = completed;
    this.timeSpent = timeSpent;
  }
}

export default Subtask;
