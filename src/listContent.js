// add list and task modules and page controllers

import deleteIcon from './assets/svgs/deleteIcon.svg';
import editIcon from './assets/svgs/editIcon.svg'; 


let taskArray = [];

// addList function
const addList = () => {

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

// addTask function
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

// select list function
const selectList = () => {

    document.addEventListener('click', function(e) {

        if (e.target.matches('.li-button')) {
            const listName = e.target.textContent;
            const listSectionTitle = document.querySelector('.listSectionTitle');
            listSectionTitle.textContent = listName;
            document.querySelector('.list-tasks').innerHTML = '';
            loadList();
        }

    }, false);

}

export { addList };
export { addTask };
export { selectList };


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

// create task info constructor
function newTask(list, title, description, dueDate, notes, isComplete) {
    this.list = list;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.notes = notes;
    this.isComplete = isComplete
}

function submitNewTask() {
    // create constructor
    const listName = document.querySelector('.listSectionTitle');
    const taskTitle = document.querySelector('#atm-title');
    const taskDescription = document.querySelector('#atm-descriptionText');
    const taskDueDate = document.querySelector('#atm-dueDate');
    const taskNotes = document.querySelector('#atm-notes');
    const task = new newTask(listName.textContent, taskTitle.value, taskDescription.value, taskDueDate.value, taskNotes.value, 'no');

    taskArray.push(task);
    console.log(taskArray);

    // create and append html card elements
    createCard(task.title,task.description,task.dueDate,task.notes);

    // clear add task modal
    taskTitle.value = taskDescription.value = taskDueDate.value = taskNotes.value = '';
    modalOpenOrClose('#addTaskModal','close');
}

function loadList() {
    // let selectedListTasks = [];
    const listSectionTitle = document.querySelector('.listSectionTitle').textContent;
    for (let i=0; i < taskArray.length; i++) {
        const arrayItem = taskArray[i];
        if (arrayItem.list === listSectionTitle) {
            // selectedListTasks.push(arrayItem);
            createCard(arrayItem.title, arrayItem.description, arrayItem.dueDate, arrayItem.notes);
        } else continue;
    }
    // console.log(selectedListTasks);
}

function newDiv(classname, idname) {
    const element = document.createElement('div');
    if (classname !== '') {
        element.classList.add(`${classname}`);    
    }
    if (idname !== '') {
        element.setAttribute('id',`${idname}`);    
    }
    return element;
}

function createCard(title, description, dueDate, notes) {
    const taskArea = document.querySelector('.list-tasks');
    const card = newDiv('card','');
    const cardContent = newDiv('card-content','');

    const cardTaskTitle = newDiv('card-title','');
    cardTaskTitle.classList.add('card-sectionLabel');
    cardTaskTitle.textContent = title;

    const cardTaskDescription = newDiv('card-description','');
    const descriptionSpan = document.createElement('span');
    descriptionSpan.classList.add('card-sectionLabel');
    descriptionSpan.textContent = 'Description: ';
    const descriptionText = document.createElement('span');
    descriptionText.textContent = description;
    cardTaskDescription.append(descriptionSpan, descriptionText);

    const cardTaskDueDate = newDiv('card-dueDate','');
    const dueDateSpan = document.createElement('span');
    dueDateSpan.classList.add('card-sectionLabel');
    dueDateSpan.textContent = 'Due Date: ';
    const dueDateText = document.createElement('span');
    dueDateText.textContent = dueDate;
    cardTaskDueDate.append(dueDateSpan,dueDateText);

    const cardTaskNotes = newDiv('card-notes','');
    const notesSpan = document.createElement('span');
    notesSpan.classList.add('card-sectionLabel');
    notesSpan.textContent = 'Notes: ';
    const notesText = document.createElement('span');
    notesText.textContent = notes;
    cardTaskNotes.append(notesSpan,notesText);

    const cardTaskCheckbox = newDiv('checkbox','');
    const checkboxSpan = document.createElement('span');
    checkboxSpan.classList.add('card-sectionLabel');
    checkboxSpan.textContent = 'Complete?  ';
    const checkboxInput = document.createElement('input');
    checkboxInput.classList.add('task-complete');
    checkboxInput.setAttribute('type','checkbox');
    cardTaskCheckbox.append(checkboxSpan, checkboxInput);

    const deleteIconSVG = new Image();
    deleteIconSVG.src = deleteIcon;
    deleteIconSVG.classList.add('card-button');
    const editIconSVG = new Image();
    editIconSVG.src = editIcon;
    editIconSVG.classList.add('card-button');
    const cardButtons = newDiv('card-deleteOrEdit','');
    const editButton = document.createElement('button');
    editButton.classList.add('card-edit');
    editButton.append(editIconSVG);
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('card-delete');
    deleteButton.append(deleteIconSVG);
    cardButtons.append(editButton,deleteButton);

    cardContent.append(cardTaskTitle, cardTaskDescription, cardTaskDueDate, cardTaskNotes, cardTaskCheckbox, cardButtons);
    card.appendChild(cardContent);

    taskArea.append(card);
}