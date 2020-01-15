const ora = require('ora');
const Spinner = (text="starting working...")=>ora({
  text,
  spinner: "weather",
  color: "blue"
  //    prefixText:'🦄'
});
module.exports={
  Spinner
};
