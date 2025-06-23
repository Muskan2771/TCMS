const disableConsoleLogs = () => {
  console.log = () => {};
  console.info = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.debug = () => {};
};

export default disableConsoleLogs;
