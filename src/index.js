import _ from 'lodash';
import './style.css';
import { addList } from './listContent';
import { addTask } from './listContent';
import { selectList } from './listContent';
import { selectCardButtons } from './listContent';
import { view } from './listContent';

view();
addList();
addTask();
selectList();
selectCardButtons();