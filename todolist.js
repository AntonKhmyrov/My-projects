document.addEventListener('DOMContentLoaded', () => {
	const input = document.querySelector('.todo__input');
	const inputBtn = document.querySelector('.todo__add-btn');
	const taskList = document.querySelector('.todo__task-list');
	const selectTask = document.querySelector('.todo__select');
	const allClearTaskBtn = document.querySelector('.todo__all-clear-task');

	let todoData = {
		existTask: [],
		removeTasks: [],
		completedTasks: [],
		selectedTab: 'active'
	}

	const createTask = (title = "new task") => { //title = "new task" default value
		const newTask = {
			title, // якщо назва ключа співпадає з назвою змінною то можливо скоротити запис з title: title до title
			text: 'taskText'
		}
		todoData.existTask.push(newTask)
	}

	const render = (value) => {
		let list = '';
		let tasks = [];
		if (value === 'active') {
			tasks = todoData.existTask
		} else if (value === 'completed') {
			tasks = todoData.completedTasks
		} else if (value === 'deleted') {
			tasks = todoData.removeTasks
		}
		if (tasks.length) {
			tasks.forEach(element => {
				list += `
      <li class="todo__task-item">
        <p class="todo__task-name">${element.title}</p>
        <p class="todo__task-text"></p>
        <div class="todo__update-btns todo__btn-${value}">
          <div class="update-btn todo__remove-task-btn">
            <span class="crossmark">&#10006;</span>
          </div>
          <div class="update-btn todo__complete-task-btn">
            <span class="checkmark">&#10003;</span>
          </div>
        </div>
      </li>`
			});
		}
		taskList.innerHTML = list;
		addTaskHendller();
		saveLocalStorage();
	}

	const saveLocalStorage = () => {
		localStorage.setItem('data', JSON.stringify(todoData))
	}

	const removeTask = (index, select) => {
		if (select === 'active') {
			todoData.removeTasks.push(todoData.existTask.splice(index, 1)[0]);
		} else if (select === 'completed') {
			todoData.removeTasks.push(todoData.completedTasks.splice(index, 1)[0])
		}
		render(select);
	};

	const completedTask = (index, select) => {
		if (select === 'active') {
			todoData.completedTasks.push(todoData.existTask.splice(index, 1)[0]);
		} else if (select === 'deleted') {
			todoData.completedTasks.push(todoData.removeTasks.splice(index, 1)[0])
		}
		render(select);
	};

	const addTaskHendller = () => {
		const updateBtns = Array.from(taskList.getElementsByClassName('todo__update-btns'));

		updateBtns.forEach((btn, index) => {
			btn.addEventListener('click', ({ target }) => {
				if (target.closest('.todo__remove-task-btn')) {
					removeTask(index, todoData.selectedTab)
				} else if (target.closest('.todo__complete-task-btn')) {
					completedTask(index, todoData.selectedTab)
				}
			});
		});
	};

	const init = () => {
		const initData = JSON.parse(localStorage.getItem('data'))
		todoData = initData || todoData;
		render('active');
	}

	init()

	selectTask.addEventListener('change', () => {
		todoData.selectedTab = selectTask.value
		render(selectTask.value)
		if (selectTask.value === 'active') {
			input.removeAttribute('disabled');
		} else {
			input.setAttribute('disabled', 'true')
		}
	});

	inputBtn.addEventListener('click', () => {
		const inputValue = input.value.trim();

		if (inputValue === '') {
			return;
		}
		createTask(inputValue);
		input.value = '';
		render('active');
	})

	allClearTaskBtn.addEventListener('click', () => {
		todoData = {
			existTask: [],
			removeTasks: [],
			completedTasks: [],
			selectedTab: 'active'
		}
		localStorage.clear();
		init();
	})
});
