const isPort = (value: any) => {
  const parsedPort = parseInt(value, 10);
  if (isNaN(parsedPort)) {
    return value;
  }
  if (parsedPort >= 0) {
    return parsedPort;
  }
  return false;
};

export { isPort };
