import _ from 'lodash';
import './style.css';
import { addList } from './listContent';
import { addTask } from './listContent';
import { selectList } from './listContent';
import { selectCardButtons } from './listContent';
import { view } from './listContent';

function component() {
    const element = document.createElement('div');

    return element;
};
  
document.body.appendChild(component());


view();
addList();
addTask();
selectList();
selectCardButtons();