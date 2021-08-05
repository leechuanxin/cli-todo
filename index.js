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

const handleCompleteSettled = (err, str) => {
  if (!err) {
    const obj = JSON.parse(str);
    if (!('items' in obj) || !('done' in obj)) {
      console.log('Please do so by typing: node index.js init');
    } else if (obj.items.length < 1) {
      console.log('Please add an item by typing: node index.js add "item"');
    } else {
      console.log('Continue interacting with your to-do list by entering: node index.js (init|reset|show|add "item"|complete [itemNumber])');
    }
  }
};

const handleComplete = (err, obj) => {
  let output = '';
  // Exit if there was an error
  if (err) {
    console.error('Edit error', err);
    return;
  }

  // Exit if key does not exist in DB
  if (!('items' in obj) || !('done' in obj)) {
    output = 'Your to-do database has not been initialized yet!';
    console.error(output);
    return;
  }

  if (obj.items.length < 1) {
    output = 'You have no items in your to-do list, so you cannot mark any as complete.';
    console.error(output);
    return;
  }

  const { items } = obj;
  const { done } = obj;
  const idx = Number(process.argv[3]) - 1;
  if (idx >= items.length) {
    output = `Item ${idx + 1} does not yet exist on your to-do list!`;
    console.error(output);
    return;
  }

  done.push(items[idx]);
  items.splice(idx, 1);
  console.log(`I have marked item ${idx + 1}, "${done[done.length - 1]}" as complete.`);
};

const handleRemove = (err, str) => {
  if (!err) {
    const removedItems = str ? JSON.parse(str) : null;
    if (Array.isArray(removedItems)) {
      console.log(`I have removed Item ${process.argv[3]}, "${removedItems[0]}"`);
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
} else if (INPUT === 'complete') {
  if (Number.isNaN(Number(process.argv[3])) || Number(process.argv[3]) < 1) {
    console.error('Please enter a valid number on your to-do list to mark as complete.');
  } else {
    fileStorage.edit(FILENAME, handleComplete, handleCompleteSettled);
  }
} else if (INPUT === 'remove') {
  if (Number.isNaN(Number(process.argv[3])) || Number(process.argv[3]) < 1) {
    console.error('Please enter a valid number on your to-do list to remove.');
  } else {
    fileStorage.remove(FILENAME, ITEMS_KEY, Number(process.argv[3]) - 1, handleRemove);
  }
} else {
  console.error('Please enter a valid command: node index.js (init|reset|show|add "item"|complete [itemNumber])');
}
