// add list and task modules and page controllers

// addList module
const addList = () => {
    // create list name factory
    function newList(listName) {
        this.listName = listName
    }
    
    // open modal when 'add list' button is clicked
    modalOpenOrClose('#addListButton','#addListModal','open');
    // close modal when cancel button is clicked
    modalOpenOrClose('.alm-cancel','#addListModal','close');

    document.addEventListener('click', function(e) {

        if (e.target.matches('#addListButton')) {
            // open modal when 'add list' button is clicked
            modalOpenOrClose('#addListModal','open');
        }

        if (e.target.matches('.alm-cancel')) {
            // close modal when cancel button is clicked
            modalOpenOrClose('#addListModal','close');
        }

        if (e.target.matches('.alm-submit')) {
            submitNewList();
            modalOpenOrClose('#addListModal','close');
        }

    }, false);
}


// addTask module
const addTask = () => {
    // create task info factory
    function newTask(title, description, dueDate, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.notes = notes;
    }

    document.addEventListener('click', function(e) {

        if (e.target.matches('#addTaskButton')) {
            // open modal when 'add task' button is clicked
            modalOpenOrClose('#addTaskModal','open');
        }

        if (e.target.matches('.atm-cancel')) {
            // close modal when cancel button is clicked
            modalOpenOrClose('#addTaskModal','close');
        }

    }, false);

}

// DOM logic

export { addList };
export { addTask };


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
    }   
};