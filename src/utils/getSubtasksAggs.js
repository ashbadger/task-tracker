export default subtasks => {
  const percentageCompleteAgg =
    (subtasks.filter(t => t.completed).length / subtasks.length).toFixed(2) *
      100 || 0;

  const timeSpentAgg = subtasks
    .map(s => s.timeSpent)
    .reduce((acc, val) => acc + val, 0);

  return { percentageCompleteAgg, timeSpentAgg };
};
