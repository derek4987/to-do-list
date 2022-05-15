import _ from 'lodash';
import './style.css';
// import addList from './listContent';
import { addList } from './listContent';
import { addTask } from './listContent';

function component() {
    const element = document.createElement('div');
  
    // Lodash, now imported by this script
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    // element.classList.add('hello');
  
    return element;
};
  
document.body.appendChild(component());



addList();

addTask();