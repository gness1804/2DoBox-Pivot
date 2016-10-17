//from Andrew's code
//original is below
$('.high-button').on('click', function(){
 AllToDos.clearListContainer();
 AllToDos.renderImportance('High');
});

$('.normal-button').on('click', function(){
 AllToDos.clearListContainer();
 AllToDos.renderImportance('Normal');
});

$('.low-button').on('click', function(){
 AllToDos.clearListContainer();
 AllToDos.renderImportance('Low');
});

$('.none-button').on('click', function(){
 AllToDos.clearListContainer();
 AllToDos.renderImportance('None');
});

//suggested edits below 

$('.todo-buttons').on("click", '.high-button, .normal-button, .low-button, .none-button',function () {
  let whatDidIClick = $(this).attr("class"); //this finds out which button they clicked: high, normal, etc
  let id = parseInt($(this).closest(".todo").attr("id"));
  let foundTodo = pageManager.findTodoById(id); //finds id of selected todo

  if (whatDidIClick === "high-button") {
    AllToDos.renderImportance('High');
  }
  else if (whatDidIClick === "normal-button") {
    AllToDos.renderImportance('Normal');
  } //repeat for low and none buttons
  else if (whatDidIClick === "delete-btn") { //you can even use this for delete button too
    $(this).parent().parent().remove();
    //your delete function here
    localStorage.setItem('list', JSON.stringify([your array]));
  }
  else if (whatDidIClick === "completed-btn") { //and you can use this for your button to mark tasks as completed
    pageManager.changeToCompleted(foundTodo);
    $(this).parent().parent().addClass("completed");
  } // end of if statement
}); //end of upvote downvote click function
});
