const $ = require('jquery');
require('./styles.scss');

function Todo(title, task){
  this.title = title;
  this.task = task;
  this.id = Date.now();
  this.importance = 'Normal';
  this.completed = false;
}

module.exports = Todo;
