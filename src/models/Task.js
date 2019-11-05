class Task {
  constructor({
    name = '',
    subtasks = [],
    notes = '',
    percentageCompletedAgg = 0,
    timeSpentAgg = 0,
  } = {}) {
    this.name = name;
    this.subtasks = subtasks;
    this.notes = notes;
    this.percentageCompletedAgg = percentageCompletedAgg;
    this.timeSpentAgg = timeSpentAgg;
  }
}

export default Task;
