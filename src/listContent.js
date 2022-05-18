// add list and task modules and page controllers

// addList module
const addList = () => {
    
    // open modal when 'add list' button is clicked
    modalOpenOrClose('#addListButton','#addListModal','open');
    // close modal when cancel button is clicked
    modalOpenOrClose('.alm-cancel','#addListModal','close');

    document.addEventListener('click', function(e) {

        if (e.target.matches('#addListButton')) {
            // open modal when 'add list' button is clicked
            modalOpenOrClose('#addListModal','open');
            disableBackground('on');
        }

        if (e.target.matches('.alm-cancel')) {
            // close modal when cancel button is clicked
            modalOpenOrClose('#addListModal','close');
            disableBackground('off');
        }

        if (e.target.matches('.alm-submit')) {
            submitNewList();
            disableBackground('off');
        }

    }, false);

}


// addTask module
const addTask = () => {

    document.addEventListener('click', function(e) {

        if (e.target.matches('#addTaskButton')) {
            // open modal when 'add task' button is clicked
            modalOpenOrClose('#addTaskModal','open');
            disableBackground('on');
        }

        if (e.target.matches('.atm-cancel')) {
            // close modal when cancel button is clicked
            modalOpenOrClose('#addTaskModal','close');
            disableBackground('off');
        }

        if (e.target.matches('.atm-submit')) {
            submitNewTask();
            disableBackground('off');
        }

    }, false);

}

export { addList };
export { addTask };


// DOM logic functions

function modalOpenOrClose(modalID, openOrClose) {
    const modal = document.querySelector(`${modalID}`);
    if (openOrClose === 'open') {
        modal.classList.add('modal-open');
        modal.classList.remove('modal-close');
    } else if (openOrClose === 'close') {
        modal.classList.remove('modal-open');
        modal.classList.add('modal-close');
    } else return;
};

function disableBackground(onOrOff) {
    const background = document.querySelector('.disableBackground');
    if (onOrOff === 'on') {
        background.classList.add('modal-open');
        background.classList.remove('modal-close');
    } else if (onOrOff === 'off') {
        background.classList.remove('modal-open');
        background.classList.add('modal-close');
    } else return;
}

function submitNewList() {
    const listValue = document.querySelector('#listName');
    const listSection = document.querySelector('#sbListsSection');

    if (listValue.value === '') {
        return 
    } else {
        const element = document.createElement('li');
        const button = document.createElement('button');
        button.classList.add('li-button');
        button.textContent = listValue.value;
        element.appendChild(button);
        listSection.appendChild(element);
        listValue.value = ''; 
        modalOpenOrClose('#addListModal','close');
    }   
};

// create task info factory
function newTask(title, description, dueDate, notes) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.notes = notes;
}

function submitNewTask() {
    const taskTitle = document.querySelector('#atm-title');
    const taskDescription = document.querySelector('#atm-descriptionText');
    const taskDueDate = document.querySelector('#atm-dueDate');
    const taskNotes = document.querySelector('#atm-notes');
    const task = new newTask(taskTitle.value, taskDescription.value, taskDueDate.value, taskNotes.value);

    const taskArea = document.querySelector('.list-tasks');
    const element = document.createElement('div');
    element.textContent = task.description;
    taskArea.append(element);

    modalOpenOrClose('#addTaskModal','close');
}