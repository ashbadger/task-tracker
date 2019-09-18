export default history => {
  const location = {
    pathname: history.location.pathname
      .split('/')
      .slice(0, -1)
      .join('/'),
    navigateToPrevious: true,
  };
  history.push(location);
};
