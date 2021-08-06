import * as fileStorage from './jsonFileStorage.js';
import * as handlers from './handlers.js';

const INPUT = process.argv[2];
const INIT_OBJ = { items: [], done: [] };
const FILENAME = 'data.json';
const ITEMS_KEY = 'items';

if (INPUT === 'reset' || INPUT === 'init') {
  fileStorage.write(FILENAME, INIT_OBJ, handlers.handleReset);
} else if (INPUT === 'add') {
  if (!process.argv[3] || process.argv[3].trim() === '') {
    console.error('Please let us know what to add to the to-do list. The command is: node index.js add [nameOfItem]');
  } else {
    fileStorage.add(FILENAME, ITEMS_KEY, process.argv[3], handlers.handleAdd);
  }
} else if (INPUT === 'show') {
  fileStorage.read(FILENAME, handlers.handleShow);
} else if (INPUT === 'complete') {
  if (Number.isNaN(Number(process.argv[3])) || Number(process.argv[3]) < 1) {
    console.error('Please enter a valid number on your to-do list to mark as complete.');
  } else {
    fileStorage.edit(FILENAME, handlers.handleComplete, handlers.handleCompleteSettled);
  }
} else if (INPUT === 'remove') {
  if (Number.isNaN(Number(process.argv[3])) || Number(process.argv[3]) < 1) {
    console.error('Please enter a valid number on your to-do list to remove.');
  } else {
    fileStorage.remove(
      FILENAME,
      ITEMS_KEY,
      Number(process.argv[3]) - 1,
      handlers.handleEditElement,
    );
  }
} else if (INPUT === 'edit') {
  if (Number.isNaN(Number(process.argv[3])) || Number(process.argv[3]) < 1) {
    console.error('Please enter a valid number on your to-do list to remove.');
  } else if (!process.argv[4] || process.argv[4].trim() === '') {
    console.error('Please enter the text to modify your item.');
  } else {
    fileStorage.editOneElement(
      FILENAME,
      ITEMS_KEY,
      Number(process.argv[3]) - 1,
      process.argv[4],
      handlers.handleEditElement,
    );
  }
} else {
  console.error('Please enter a valid command:');
  console.error('node index.js (init|reset|show|add "item"|complete [itemNumber]|remove [itemNumber]|edit [itemNumber] "newItem")');
}
