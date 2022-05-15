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

    // open modal when 'add task' button is clicked
    modalOpenOrClose('#addTaskButton','#addTaskModal','open');
    // close modal when cancel button is clicked
    modalOpenOrClose('.atm-cancel','#addTaskModal','close');
}

// DOM logic

export { addList };
export { addTask };


function modalOpenOrClose(buttonID, modalID, openOrClose) {
    const button = document.querySelector(`${buttonID}`);
    const modal = document.querySelector(`${modalID}`);
    if (openOrClose === 'open') {
        button.addEventListener('click', (e) => {
            modal.classList.add('modal-open');
            modal.classList.remove('modal-close');
        });
    } else if (openOrClose === 'close') {
        button.addEventListener('click', (e) => {
            modal.classList.remove('modal-open');
            modal.classList.add('modal-close');
        });
    } else return;
};