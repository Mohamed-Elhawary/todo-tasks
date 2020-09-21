/*we need to add coockies to this application to can save the tasks from disappearance , after reloading the page or shut up the browser*/

/*global document*/
//define the variables
var input = document.querySelector('.add-task input'),
    plus  = document.querySelector('.add-task span'),
    tasksTable = document.querySelector('.tasks'),
	stats = document.querySelector('.tasks-stats'),
	allDiv = document.querySelector('.all'),
    allTasksCounter = document.querySelector('.counter span'),
    completedTasks = document.querySelector('.completed span');

window.onload = function() {
    input.focus();
}

//add one Task function
plus.onclick = function() {
    if (input.value == '' || input.value == (" ") * 1) {
		
		input.focus(); /* put the focus before the swal alert to show the focus of the input after enter (ok) in the swal alert*/
        
		//sweat alert
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'you can NOT enter an empty Task, try again...!!',
        });
        
    } else {

        //delete the no Tasks msg if it is existed, because you add now a new task
        var noTasks = document.querySelector('.no-tasks');
        if (document.body.contains(noTasks)) {
            noTasks.remove();    
        }
        
        //add the task after do all checks
        var taskSpan = document.createElement('span'),
            spanText = document.createTextNode(input.value),
            deleteBtn = document.createElement("span"),
            deleteBtnText = document.createTextNode("delete"),
            finishBtn = document.createElement("span"),
            finishBtnText = document.createTextNode("finish / undo");
        
        taskSpan.className = "task-box";
        deleteBtn.classList.add("delete");
        finishBtn.classList.add("finish");
        
        finishBtn.appendChild(finishBtnText);
        deleteBtn.appendChild(deleteBtnText);
        
        taskSpan.appendChild(spanText);
        taskSpan.appendChild(deleteBtn);
        taskSpan.appendChild(finishBtn);
        
        tasksTable.appendChild(taskSpan);
        
        input.value = '';
        input.focus();
        exist();
		allFun();
        calculateTasks();
    }
}

//delete & finish Functions
document.addEventListener('click', function(e) {
    //delete
    if (e.target.className == "delete") {  
        
        /* you can not here use the way of defining the delete button by >> 
        var createdDeleteBtn = document.getElementsByClassName('delete') and then use the onclick() method with the createdDeleteBtn variable.
        
        because we might have multi delete buttons and it is impossible to on click in these buttons together at the same time , so we use this method as a random click at any position in the document and if this position target has the spacific class, you will do what you want, same as with the finish function*/
        
        e.target.parentNode.remove();
        noTaskMsg();
        input.focus();
    }
    
    //finish
    if (e.target.classList.contains("finish")) {
        e.target.parentNode.classList.toggle("finished");
        input.focus();
    }
    
    calculateTasks(); //call the function for both delete and finsih
});


//add the no-task msg if there is no tasks (all tasks have been deleted)
function noTaskMsg () {
    if (tasksTable.childElementCount == 0) {
        var noTaskSpan = document.createElement('span'),
            noTaskSpanText = document.createTextNode("NO Tasks to show");
        
        noTaskSpan.appendChild(noTaskSpanText);
        noTaskSpan.className = "no-tasks";
        
        tasksTable.appendChild(noTaskSpan);
		
		while (allDiv.firstChild) {
    		allDiv.removeChild(allDiv.firstChild);
		}
		
    }
}

//add the calculate function 
function calculateTasks () {
    allTasksCounter.innerHTML = document.querySelectorAll('.tasks .task-box').length;
    /*you can not here use >> tasksTable.childElementCount instead of >> document.querySelectorAll('.tasks .task-box').length
    ,because it will count the no-task msg span as a task, so we use >> document.querySelectorAll('.tasks .task-box').length to count only the spans that have (task-box) class*/ 
    completedTasks.innerHTML = document.querySelectorAll('.tasks .finished').length;
}


//check existed tasks function

function exist() {

let y = tasksTable.lastElementChild,
    y2 = y.textContent;
    x = tasksTable.childElementCount;
    let myArray = Array.from(document.querySelectorAll(".task-box"));
    let mySlicedArray = myArray.slice(0, -1); /*slice to -1 , to not get the last element child in the sliced array because the last element child is the input value you entered in the input and you check on it if it is existed in the array by the way*/
    let myArray2 = [];
    for (let i = 0; i < mySlicedArray.length; i++) {
        let s = mySlicedArray[i].textContent;
        myArray2[i] = s;
    };
    let search = myArray2.indexOf(y2);
    if (search !== -1) {
        
        //sweet alert
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'this TASK is already existed, please try to add a different task..!',
        });
		
        y.remove();
	}
	
	/*to prevent the bug (of showing 4 delete-all & finish-all buttons) to happen, if you add two equal values at the first time of entering tasks*/
	if (search !== -1 && myArray2.length == 1) {
		//sweet alert
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'this TASK is already existed, please try to add a different task..!',
        });
		
		while (allDiv.firstChild) {
    		allDiv.removeChild(allDiv.firstChild);
		}
		
        y.remove();
	}
	
}

//create delete all and finish all buttons  
function allFun () {
	var arr = Array.from(document.querySelectorAll(".task-box"));
    if(arr.length == 1) {
        var deleteAll = document.createElement("span"),
            finishAll = document.createElement("span"),
            deleteAllText = document.createTextNode("delete All"),
            finishAllText = document.createTextNode("finish All");
        deleteAll.appendChild(deleteAllText);
        finishAll.appendChild(finishAllText);
        allDiv.appendChild(deleteAll);
        allDiv.appendChild(finishAll);
        
        deleteAll.className = "delete-all";
        finishAll.className = "finish-all";
	}
}

//launch the delete all and finsih all buttons when on clicking
document.addEventListener('click', function(e) {
    //delete all
    if (e.target.className == "delete-all") {
		while (tasksTable.firstChild) {
    		tasksTable.removeChild(tasksTable.firstChild);
		}
		noTaskMsg();
		input.focus();
		calculateTasks();
	}
	
	//finish all 
	if (e.target.className == "finish-all") {
		
		var t = Array.from(document.querySelectorAll('.task-box'));
		for (i = 0; i < t.length; i = i + 1) {
			t[i].classList.add("finished");
		}
		calculateTasks();
		input.focus();
	}

});


/*Trigger the plus button click on Enter Key (when you press enter it same as click the plus button)*/
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {  // 13 is the name code of the Enter key in the keyboard
   event.preventDefault();
   plus.click();
  }
});
