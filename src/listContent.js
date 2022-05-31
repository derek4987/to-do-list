// add list and task modules and page controllers

import _ from 'lodash';
import deleteIcon from './assets/svgs/deleteIcon.svg';
import editIcon from './assets/svgs/editIcon.svg'; 


let taskArray = [];
let cardToEdit;

// addList function
const addList = () => {

    document.addEventListener('click', function(e) {

        if (e.target.matches('#addListButton')) {
            // open modal when 'add list' button is clicked
            modalOpenOrClose('#addListModal','open');
            disableBackground('on');
            enableAddTaskButton();
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
            clearAddTaskModal();
        }

        if (e.target.matches('#atm-submit')) {
            submitNewTask();
            disableBackground('off');
            isChecked();
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
            loadList();
            isChecked();
            enableAddTaskButton();
        }

        if (e.target.matches('.list-delete-icon')) {
            deleteList(e);
            refreshTaskID();
            disableAddTaskButton();
        }

    }, false);

}

// task card buttons function
const selectCardButtons = () => {

    document.addEventListener('click', function(e) {

        if (e.target.matches('.card-delete') || e.target.matches('.card-delete-icon')) {
            deleteCard(e);
            refreshTaskID();
            loadList();
            isChecked();
        }

        if (e.target.matches('.card-edit') || e.target.matches('.card-edit-icon')) {
            console.log('edit');
            modalOpenOrClose('#addTaskModal','open');
            disableBackground('on');
            addRemoveAttribute('.atm-submit','atm-submit','remove');
            addRemoveAttribute('.atm-submit','atm-submitEdit','add');
            editTask(e);          
        }

        if (e.target.matches('#atm-submitEdit')) {
            submitTaskEdit(e);
            refreshTaskID();
            loadList();
            isChecked();
            console.log(taskArray);
            addRemoveAttribute('.atm-submit','atm-submitEdit','remove');
            addRemoveAttribute('.atm-submit','atm-submit','add');
            modalOpenOrClose('#addTaskModal','close');
            disableBackground('off');
            clearAddTaskModal();
        }
        
        if (e.target.matches('.task-complete')) {
            markAsComplete(e);
        }


    }, false);

}

const defaultPageOpen = () => {
    const defaultTask = new newTask('New List','Title','Description','2022-01-01','Notes','no','0');
    createCard(defaultTask.title,defaultTask.description,defaultTask.dueDate,defaultTask.notes,defaultTask.IDNumber);
    taskArray.push(defaultTask);
}

export { addList };
export { addTask };
export { selectList };
export { selectCardButtons };
export { defaultPageOpen }


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
        // to open new list after pressing submit
        document.querySelector('.list-tasks').innerHTML = '';
        const listSectionTitle = document.querySelector('.listSectionTitle');
        listSectionTitle.textContent = listValue.value;

        const element = document.createElement('li');
        const button = document.createElement('button');

        const listSpan = document.createElement('span');
        const listDeleteIcon = new Image();
        listDeleteIcon.src = deleteIcon;
        listDeleteIcon.classList.add('card-button');
        listDeleteIcon.classList.add('list-delete-icon')
        listSpan.appendChild(listDeleteIcon);

        button.classList.add('li-button');
        button.textContent = listValue.value;
        button.appendChild(listSpan);
        element.appendChild(button);
        listSection.appendChild(element);
        listValue.value = ''; 
        modalOpenOrClose('#addListModal','close');
    }   
};

// create task info constructor
function newTask(list, title, description, dueDate, notes, isComplete, IDNumber) {
    this.list = list;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.notes = notes;
    this.isComplete = isComplete;
    this.IDNumber = IDNumber;
}

function submitNewTask() {
    // refresh task IDNumber
    refreshTaskID();
    // create constructor
    const listName = document.querySelector('.listSectionTitle');
    const taskTitle = document.querySelector('#atm-title');
    const taskDescription = document.querySelector('#atm-descriptionText');
    const taskDueDate = document.querySelector('#atm-dueDate');
    const taskNotes = document.querySelector('#atm-notes');
    const task = new newTask(listName.textContent, taskTitle.value, taskDescription.value, taskDueDate.value, taskNotes.value, 'no', taskArray.length);

    taskArray.push(task);
    console.log(taskArray);

    // create and append html card elements
    createCard(task.title,task.description,task.dueDate,task.notes,task.IDNumber);

    // clear add task modal
    taskTitle.value = taskDescription.value = taskDueDate.value = taskNotes.value = '';
    modalOpenOrClose('#addTaskModal','close');
}

function loadList() {
    document.querySelector('.list-tasks').innerHTML = '';
    const listSectionTitle = document.querySelector('.listSectionTitle').textContent;
    for (let i=0; i < taskArray.length; i++) {
        const arrayItem = taskArray[i];
        if (arrayItem.list === listSectionTitle) {
            createCard(arrayItem.title, arrayItem.description, arrayItem.dueDate, arrayItem.notes, arrayItem.IDNumber);
        } else continue;
    }
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

function createCard(title, description, dueDate, notes, IDNumber) {
    const taskArea = document.querySelector('.list-tasks');
    const card = newDiv('card',`card${IDNumber}`);
    const cardContent = newDiv('card-content','');

    const cardTaskTitle = newDiv('card-title','');
    cardTaskTitle.classList.add('card-sectionLabel');
    cardTaskTitle.classList.add('card-sectionContent');
    cardTaskTitle.textContent = title;

    const cardTaskDescription = newDiv('card-description','');
    const descriptionSpan = document.createElement('span');
    descriptionSpan.classList.add('card-sectionLabel');
    descriptionSpan.textContent = 'Description: ';
    const descriptionText = document.createElement('span');
    descriptionText.classList.add('card-sectionContent');
    descriptionText.textContent = description;
    cardTaskDescription.append(descriptionSpan, descriptionText);

    const cardTaskDueDate = newDiv('card-dueDate','');
    const dueDateSpan = document.createElement('span');
    dueDateSpan.classList.add('card-sectionLabel');
    dueDateSpan.textContent = 'Due Date: ';
    const dueDateText = document.createElement('span');
    dueDateText.classList.add('card-sectionContent');
    dueDateText.textContent = dueDate;
    cardTaskDueDate.append(dueDateSpan,dueDateText);

    const cardTaskNotes = newDiv('card-notes','');
    const notesSpan = document.createElement('span');
    notesSpan.classList.add('card-sectionLabel');
    notesSpan.textContent = 'Notes: ';
    const notesText = document.createElement('span');
    notesText.classList.add('card-sectionContent');
    notesText.textContent = notes;
    cardTaskNotes.append(notesSpan,notesText);

    const cardTaskCheckbox = newDiv('checkbox','');
    const checkboxSpan = document.createElement('span');
    checkboxSpan.classList.add('card-sectionLabel');
    checkboxSpan.textContent = 'Complete?  ';
    const checkboxInput = document.createElement('input');
    checkboxInput.classList.add('task-complete');
    checkboxInput.setAttribute('type','checkbox');
    checkboxInput.setAttribute('id',`checkbox${IDNumber}`);
    cardTaskCheckbox.append(checkboxSpan, checkboxInput);

    const deleteIconSVG = new Image();
    deleteIconSVG.src = deleteIcon;
    deleteIconSVG.classList.add('card-button');
    deleteIconSVG.classList.add('card-delete-icon')
    const editIconSVG = new Image();
    editIconSVG.src = editIcon;
    editIconSVG.classList.add('card-button');
    editIconSVG.classList.add('card-edit-icon');
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

function deleteCard(e) {
    // remove card from page
    let parent = e.target.closest('.card');
    const listTasks = document.querySelector('.list-tasks');
    listTasks.removeChild(parent);

    // remove constructor from array
    for (let i=0; i< taskArray.length; i++) {
        if (parent.matches(`#card${i}`)) {
            if (taskArray.length > 1) {
                taskArray.splice(i,1);
            } else {
                taskArray = [];
            }
        }
    }
    console.log(taskArray)
}

function refreshTaskID() {
    for (let i=0; i < taskArray.length; i++) {
        const task = taskArray[i];
        task.IDNumber = i;
    };
}

function editTask(e) {
    // make task modal show selected tasks content
    const parent = e.target.closest('.card');
    cardToEdit = parent;
    const taskTitle = document.querySelector('#atm-title');
    const taskDescription = document.querySelector('#atm-descriptionText');
    const taskDueDate = document.querySelector('#atm-dueDate');
    const taskNotes = document.querySelector('#atm-notes');
    for (let i=0; i < taskArray.length; i++) {
        const task = taskArray[i];
        if (parent === document.getElementById(`card${i}`)) {
            taskTitle.value = task.title;
            taskDescription.value = task.description;
            taskDueDate.value = task.dueDate;
            taskNotes.value = task.notes;
        } else continue;
    }
};

function submitTaskEdit() {
    console.log(cardToEdit);
    const taskTitle = document.querySelector('#atm-title');
    const taskDescription = document.querySelector('#atm-descriptionText');
    const taskDueDate = document.querySelector('#atm-dueDate');
    const taskNotes = document.querySelector('#atm-notes');
    for (let i=0; i < taskArray.length; i++) {
        const task = taskArray[i];
        if (cardToEdit === document.getElementById(`card${i}`)) {
            task.title = taskTitle.value;
            task.description = taskDescription.value;
            task.dueDate = taskDueDate.value;
            task.notes = taskNotes.value;
        } else continue;
    }
}

// Add or remove ID
function addRemoveAttribute(selector, attributeID, addOrRemove) {
    const element = document.querySelector(`${selector}`);
    if (addOrRemove === 'remove') {
        element.removeAttribute('id',`${attributeID}`);
    } else if (addOrRemove === 'add') {
        element.setAttribute('id',`${attributeID}`);
    } else return
}

// clear add task modal
function clearAddTaskModal() {
    const taskTitle = document.querySelector('#atm-title');
    const taskDescription = document.querySelector('#atm-descriptionText');
    const taskDueDate = document.querySelector('#atm-dueDate');
    const taskNotes = document.querySelector('#atm-notes');
    taskTitle.value = taskDescription.value = taskDueDate.value = taskNotes.value = '';
}

// change isComplete status in constructor
function markAsComplete(e) {
    const parent = e.target.closest('.card');
    for (let i=0; i < taskArray.length; i++) {
        const task = taskArray[i];
        if (parent === document.getElementById(`card${i}`)) {
            if (task.isComplete === 'no') {
                task.isComplete = 'yes';
                console.log(task);
            } else {
                task.isComplete = 'no';
                console.log(task);
            };
        } else continue;
    }
}

// checkbox checked if taskArray isComplete value is 'yes'
function isChecked() {    
    const listSectionTitle = document.querySelector('.listSectionTitle').textContent;
    for (let i=0; i < taskArray.length; i++) {
        const isTaskComplete = document.querySelector(`#checkbox${i}`);
        const arrayItem = taskArray[i];
        if (arrayItem.isComplete === 'no' && arrayItem.list === listSectionTitle) {
            isTaskComplete.checked = false;
        } else if (arrayItem.isComplete === 'yes' && arrayItem.list === listSectionTitle) {
            isTaskComplete.checked = true;
        } else continue;  
    }
}

// delete list
function deleteList(e) {
    const parent = e.target.closest('.li-button');
    const listName = parent.textContent;

    // remove list from DOM
    const listItem = parent.parentElement;
    const listSection = document.querySelector('#sbListsSection');
    listSection.removeChild(listItem);

    //remove associated list tasks from DOM
    const listTasks = document.querySelector('.list-tasks');
    listTasks.innerHTML = '';

    // remove deleted lists Title from task area
    const listSectionTitle = document.querySelector('.listSectionTitle');
    listSectionTitle.textContent = '';

    // remove deleted list tasks from constructor array
    let tempArray = [];
    for (let i=0; i < taskArray.length; i++) {
        const task = taskArray[i];
        if (task.list !== listName) {
            tempArray.push(task);
            console.log(`tempArray = ${tempArray}`);
        } else continue;
    }
    taskArray = tempArray;
    console.log(taskArray);
}

// function to disable Add Task button
function disableAddTaskButton() {
    document.getElementById('addTaskButton').disabled = true;
}

// function to un-disable Add Task button
function enableAddTaskButton() {
    document.getElementById('addTaskButton').disabled = false;
}