import * as fileStorage from './jsonFileStorage.js';

const INPUT = process.argv[2];
const INIT_OBJ = { items: [], done: [] };
const FILENAME = 'data.json';
const ITEMS_KEY = 'items';

const handleReset = (err) => {
  if (!err) {
    console.log('Your to-do list has been successfully created or reset! You can start adding items by using: node index.js add [nameOfItem]');
  }
};

const handleAdd = (err, str) => {
  if (str === 'Key does not exist') {
    console.error('Your to-do database has not been initialized yet! Please do so by typing: node index.js init');
  } else {
    const obj = JSON.parse(str);
    console.log(`I have added "${obj.items[obj.items.length - 1]}" to your to-do list.`);
  }
};

const handleShow = (err, obj) => {
  if (!err) {
    const { items } = obj;
    const { done } = obj;

    console.log('To-Do:');
    if (items.length === 0) {
      console.log('You have no items on your To-Do list.\n');
    } else {
      items.forEach((item, index) => console.log(`${index + 1}. ${item}`));
      console.log('');
    }
    console.log('Done:');
    if (done.length === 0) {
      console.log('You have no items on your Done list.');
    } else {
      done.forEach((item, index) => console.log(`${index + 1}. ${item}`));
    }
  }
};

if (INPUT === 'reset' || INPUT === 'init') {
  fileStorage.write(FILENAME, INIT_OBJ, handleReset);
} else if (INPUT === 'add') {
  if (!process.argv[3] || process.argv[3].trim() === '') {
    console.error('Please let us know what to add to the to-do list. The command is: node index.js add [nameOfItem]');
  } else {
    fileStorage.add(FILENAME, ITEMS_KEY, process.argv[3], handleAdd);
  }
} else if (INPUT === 'show') {
  fileStorage.read(FILENAME, handleShow);
} else {
  console.error('Please enter a valid command: node index.js [init|reset|show|add "item"]');
}
