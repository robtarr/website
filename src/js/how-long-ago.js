const moment = require('moment');

module.exports = function(dateString) {
  return moment(new Date(dateString)).fromNow();
}
