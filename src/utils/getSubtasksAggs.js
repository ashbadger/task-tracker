export default subtasks => {
  const percentageCompletedAgg =
    (subtasks.filter(t => t.completed).length / subtasks.length).toFixed(2) *
      100 || 0;

  const timeSpentAgg = subtasks.reduce(
    (acc, subtask) => acc + subtask.timeSpent,
    0
  );

  return { percentageCompletedAgg, timeSpentAgg };
};
