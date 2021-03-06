const todoInput = document.querySelector(".todo-input");
const btnAdd = document.querySelector("#btnAdd");
const newTaskText = document.querySelector(".new-task-text");
let index = 1;
let tareas = [];

btnAdd.addEventListener("click", () => {
	todoInput.classList.remove("hidden")
	todoInput.focus();
	newTaskText.classList.add("hidden")
})

todoInput.addEventListener("keypress", e => {
	if (e.key === "Enter") {
		const task = e.target.value;
		const taskElement = makeTaskElement(task);
		const todoList = document.querySelector(".todo-list");
		const taskCheckComplete = taskElement.querySelector("input[type=checkbox]");
		const removeBtn = taskElement.querySelector("a");
		bindTaskEvent(taskCheckComplete, "click", completeTask)
		bindTaskEvent(removeBtn, "click", deleteTask)
		todoList.prepend(taskElement)
		e.target.value = "";
		e.target.classList.toggle("hidden")
		newTaskText.classList.toggle("hidden")
	}
})

const makeTaskElement = function (task) {
	const li = document.createElement('li');
	const checkbox = document.createElement('input')
	const label = document.createElement('label')
	const a = document.createElement('a');

	checkbox.type = "checkbox";
	label.textContent = task;
	a.href = "#";

	li.appendChild(checkbox);
	li.appendChild(label);
	li.appendChild(a);

	gLS(task);

	return li
}

const bindTaskEvent = function (el, event, fn) {
	el.addEventListener(event, fn)
}

const completeTask = function (e) {
	const parent = e.target.parentNode;
	const labelTask = parent.querySelector("label");
	labelTask.classList.toggle("task-complete")
	const taskCompletesCount = document.querySelector(".task-completes-count")
	taskCompletesCount.textContent = countTaskCompletes()
}

const deleteTask = function (e) {
	const parent = e.target.parentNode;
	const parentList = parent.parentNode;

	parentList.removeChild(parent)
	const taskCompletesCount = document.querySelector(".task-completes-count")
	taskCompletesCount.textContent = countTaskCompletes()
}

const countTaskCompletes = function () {
	const totalTaskCompletes = document.querySelectorAll("label.task-complete")
	return totalTaskCompletes.length;
}

function gLS(task){
	tareas[tareas.length]=task;
	localStorage.setItem("Tarea", tareas);
}

function actLS() {
	if(localStorage.getItem("Tarea"))
	{
		let tareaAct = "";
		tareas = localStorage.getItem("Tarea");
		for (x in tareas) {
			if(tareas[x]==",")
			{
				const li = document.createElement('li');
				const checkbox = document.createElement('input')
				const label = document.createElement('label')
				const a = document.createElement('a');
		
				checkbox.type = "checkbox";
				label.textContent = tareaAct;
				a.href = "#";
		
				li.appendChild(checkbox);
				li.appendChild(label);
				li.appendChild(a);
		
				const taskElement = li;
		
				const todoList = document.querySelector(".todo-list");
				const taskCheckComplete = taskElement.querySelector("input[type=checkbox]");
				const removeBtn = taskElement.querySelector("a");
				bindTaskEvent(taskCheckComplete, "click", completeTask);
				bindTaskEvent(removeBtn, "click", deleteTask);
				todoList.prepend(taskElement);
				tareaAct="";
			}
			else
			{
				tareaAct=tareaAct+tareas[x];
			}
		}
		const li = document.createElement('li');
				const checkbox = document.createElement('input')
				const label = document.createElement('label')
				const a = document.createElement('a');
		
				checkbox.type = "checkbox";
				label.textContent = tareaAct;
				a.href = "#";
		
				li.appendChild(checkbox);
				li.appendChild(label);
				li.appendChild(a);
		
				const taskElement = li;
		
				const todoList = document.querySelector(".todo-list");
				const taskCheckComplete = taskElement.querySelector("input[type=checkbox]");
				const removeBtn = taskElement.querySelector("a");
				bindTaskEvent(taskCheckComplete, "click", completeTask);
				bindTaskEvent(removeBtn, "click", deleteTask);
				todoList.prepend(taskElement);
				tareaAct="";
	}
}
actLS();