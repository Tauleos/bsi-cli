const ora = require('ora');
const Spinner = (text="starting working...")=>ora({
  text,
  spinner: "arrow3",
  color: "blue"
  //    prefixText:'🦄'
});
module.exports={
  Spinner
};
