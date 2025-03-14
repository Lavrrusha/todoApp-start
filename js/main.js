// Находим элементы на странице

const form = document.querySelector('#form')

const taskInput = document.querySelector('#taskInput')

const tasksList = document.querySelector('#tasksList')

const emptyList = document.querySelector('#emptyList')


let tasks = []



// Добавление задачи
form.addEventListener('submit', addTask)

// Удаление задачи
tasksList.addEventListener('click', deleteTask)

// Отмечаем задачу завершённой
tasksList.addEventListener('click', doneTask)


function addTask(event) {
	// Отменяем отправку формы
	event.preventDefault()

	// Достаём текст задачи из поля ввода
	const taskText = taskInput.value

	// Описываем задачу в виде объекта
	const newTask = {
		id: Date.now(),
		text: taskText,
		done: false
	}

	// Добавляем задачу в массив с задачами

	tasks.push(newTask)

	// Формируем CSS класс
	const cssClass = newTask.done ? "task-title task-title--done" : "task-title"

	// Формируем разметку для новой задачи
	const taskHTML = `
        	<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${newTask.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>
    `

	// Добавляем задачу на страницу
	tasksList.insertAdjacentHTML('beforeend', taskHTML)

	// Очищаем поле ввода и возвращаем на него фокус
	taskInput.value = ''
	taskInput.focus()

	// Проверка. Если в списке задач более 1-го элемента, скрываем блок "Список дел пуст"
	if (tasksList.children.length > 1) {
		emptyList.classList.add('none')
	}

}

function deleteTask(event) {

	// Проверяем, что клик был по кнопке 'Удалить задачу'
	if (event.target.dataset.action === 'delete') {
		const parentNode = event.target.closest('.list-group-item')
		parentNode.remove()
	}

	if (tasksList.children.length <= 1) {
		emptyList.classList.remove('none')
	}
}

function doneTask(event) {

	// Проверяем, что клик был по кнопке "задача выполнена"
	if (event.target.dataset.action === 'done') {
		const parentNode = event.target.closest('.list-group-item')
		const taskTitle = parentNode.querySelector('.task-title')
		taskTitle.classList.toggle('task-title--done')
	}
}



