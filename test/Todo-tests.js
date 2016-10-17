const Todo = require('../lib/Todo.js');
const assert = require('chai').assert;

describe("sanity check--Todo tests", function () {
  it("should allow these tests", function () {
    assert(true);
  });
});

describe("Todo constructor", function () {
  it("should allow the user to pass in a title and task name", function () {

    var dogs = new Todo("buy dog food", "make it a good brand");

    assert.equal(dogs.title, "buy dog food");
    assert.equal(dogs.task, "make it a good brand")

  }); //end of pass in title and task name

  it("should assign a default importance of normal", function () {

    var dogs = new Todo("buy dog food", "make it a good brand");

    assert.equal(dogs.importance, "Normal");
  }); //end of importance

  it("should assign a default completed value of false", function () {

    var dogs = new Todo("buy dog food", "make it a good brand");

    assert.equal(dogs.completed, false);

  }); //end of default complete value

  it("should have an id", function () {
    var dogs = new Todo("buy dog food", "make it a good brand");

    assert.notEqual(dogs.id, undefined);
  }); //end of have an id
  
}); //end of Todo constructor
