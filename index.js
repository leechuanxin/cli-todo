import * as fileStorage from './jsonFileStorage.js';

const INPUT = process.argv[2];
const INIT_OBJ = { items: [] };
const FILENAME = 'data.json';

const handleReset = (err) => {
  if (!err) {
    console.log('Your to-do list has been successfully reset!');
  }
};

if (INPUT === 'reset') {
  fileStorage.write(FILENAME, INIT_OBJ, handleReset);
} else {
  console.log('Please enter a valid command: node index.js [reset|show|add "item"]');
}
