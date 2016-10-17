//webpack functions
require('./styles.scss');
const $ = require('jquery');
const Todo = require('./Todo.js');
const PageManager = require('./page-manager.js');
let pageManager = new PageManager();

//event listener elements object
const buttons = {
  bottomSection: $('.list'),
  characterCountOutput: $('.char-count-output'),
  deleteAllTodosBtn: $(".delete-all-todos"),
  heroSection: $(".hero"),
  saveBtn: $('.save-btn'),
  removeFiltersBtn: $(".remove-filters-btn"),
  searchInputBox: $('.search-input'),
  showCompletedBtn: $(".show-completed-btn"),
  showMoreTodos: $('.show-more-todos'),
  taskInput: $(".task-input"),
  titleInput: $(".title-input"),
  todoCountOutput: $(".todo-count-output"),
  todoListContainer: $(".todo-list")
}

//page load functions
pageManager.renderLocalStorageToPage();

//housekeeping functions
function clearOutTodosFromPage () {
  buttons.todoListContainer.text("");
}
function clearCharCountOutput () {
  buttons.characterCountOutput.text("");
} //end of clearCharCountOutput

function clearSingleTodoFromPageButNotStorage(that) {
  that.parent().parent().remove();
}

//event listeners
buttons.saveBtn.on('click', function() {
  pageManager.putTasksOnPage();
  pageManager.clearInputFields();
});

$(".title-input, .task-input").on("keyup", function (key) {
  pageManager.toggleSaveButton();
  let keyEntered = key.which;
  let whatFieldIsThis = $(this).attr("class");
  if (keyEntered === 13 && buttons.titleInput.val() !== '' && buttons.taskInput.val() !== '') {
    pageManager.putTasksOnPage();
    pageManager.clearInputFields();
    clearCharCountOutput();
  }
  else {
    pageManager.countUserChars(whatFieldIsThis);
  }
}); //end of title input and task input

buttons.heroSection.on("blur", ".title-input, .task-input", function () {
  clearCharCountOutput();
}); //end of hero blur function

buttons.searchInputBox.on("keyup", function () {
  let searchedForItem = $(this).val().trim();
  $("h2:contains('" + searchedForItem + "')").closest(".todo").show();
  $("h2:not(:contains('" + searchedForItem + "'))").closest(".todo").hide();
});

buttons.searchInputBox.on("keyup", function () {
  let searchedForItem = $(this).val().trim();
  $("span:contains('" + searchedForItem + "')").closest(".todo").show();
});

buttons.showCompletedBtn.on("click", function () { 
  pageManager.findCompletedTasks();
  pageManager.formatCompletedTasks();
}); // end of show-completed-btn

buttons.bottomSection.on("click", ".critical-btn, .high-btn, .normal-btn, .low-btn, .none-btn", function () {
  let whatDidIClick = $(this).attr("class");
  let importanceToFilter;
  if (whatDidIClick === "critical-btn") {
    importanceToFilter = "Critical";
  }
  else if (whatDidIClick === "high-btn") {
    importanceToFilter = "High";
  }
  else if (whatDidIClick === "normal-btn") {
    importanceToFilter = "Normal";
  }
  else if (whatDidIClick === "low-btn") {
    importanceToFilter = "Low";
  }
  else if (whatDidIClick === "none-btn") {
    importanceToFilter = "None";
  }

  clearOutTodosFromPage();
  pageManager.filterByImportance(importanceToFilter);

}); // end of importance filter

buttons.removeFiltersBtn.on("click", function () {
  clearOutTodosFromPage();
  pageManager.appendAllTodosToPage();
  pageManager.formatCompletedTasks();
}); //end of remove filters

buttons.deleteAllTodosBtn.on("click", function () {
  let warning = confirm("Are you sure you want to delete ALL of your tasks? This cannot be undone!");
  if (warning) {
    pageManager.deleteAllTodosFromStorage();
    clearOutTodosFromPage();
  }
}); //end of delete-all-todos

buttons.todoListContainer.on('blur', '.edit-title, .edit-task', function (event) {
  // debugger;
  let id = parseInt($(this).closest(".todo").attr("id"));

  if (event.target.nodeName === "H2") {
    let newTitle = $(this).text();
    pageManager.editTitle(id, newTitle);
  }
  else if (event.target.nodeName === "SPAN") {
    let newTask = $(this).text();
    pageManager.editTask(id, newTask);
  }
}); //end of edit title and task click function

buttons.todoListContainer.keypress(function(key) {
  if (key.which === 13) {
    pageManager.temporarilyRemoveFieldEditablity();
  }
});

buttons.todoListContainer.on('click', '.up-btn, .down-btn, .delete-btn, .completed-btn', function() {
  let whatDidIClick = $(this).attr("class");
  let id = parseInt($(this).closest(".todo").attr("id"));
  let foundTodo = pageManager.findTodoById(id);

  if (whatDidIClick === "up-btn") {
    pageManager.upvote(foundTodo);
  }
  else if (whatDidIClick === "down-btn") {
    pageManager.downvote(foundTodo);
  }
  else if (whatDidIClick === "delete-btn") {
    let that = $(this);
    clearSingleTodoFromPageButNotStorage(that);
    pageManager.removeTodo(id);
    pageManager.putTodosInLocalStorage();
  }
  else if (whatDidIClick === "completed-btn") {
    let that = $(this);
    pageManager.changeToCompleted(foundTodo);
    pageManager.formatSingleTaskAsCompleted(that);
  } // end of if statement
}); //end of big button click function

buttons.showMoreTodos.on('click', function(){
  pageManager.addTenTodos();
});
