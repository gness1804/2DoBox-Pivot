const PageManager = require('../lib/page-manager.js');
const assert = require('chai').assert;
const $ = require('jquery');

let pageManager = new PageManager();

describe("sanity check--Todo tests", function () {
  it("should allow these tests", function () {
    assert(true);
  });
});

describe("showTenTodos", function () {
  it("should be a function", function () {
    assert.isFunction(pageManager.showTenTodos);
  });
}); //end of showTenTodos test

describe("PageManager constructor", function () {
  it("should have a storage property", function () {
    var page = new PageManager();
    assert.notEqual(page.storage, undefined);
  }); //end of storage property

  it("should have a method called upvote", function () {
    var page = new PageManager();
    assert.isFunction(page.upvote);
  }); //end of have a method called upvote

  it("should renderLocalStorageToPage", function () {
    var page = new PageManager();
    assert.isFunction(page.renderLocalStorageToPage);
  }); //end of renderLocalStorageToPage

}); //end of describe PageManager constructor
