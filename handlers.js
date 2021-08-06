export const handleReset = (err) => {
  if (!err) {
    console.log('Your to-do list has been successfully created or reset! You can start adding items by using: node index.js add [nameOfItem]');
  }
};

export const handleAdd = (err, str) => {
  if (str === 'Key does not exist') {
    console.error('Your to-do database has not been initialized yet! Please do so by typing: node index.js init');
  } else {
    const obj = JSON.parse(str);
    console.log(`I have added "${obj.items[obj.items.length - 1]}" to your to-do list.`);
  }
};

export const handleShow = (err, obj) => {
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

export const handleCompleteSettled = (err, str) => {
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

export const handleComplete = (err, obj) => {
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

export const handleEditElement = (err, str, payload) => {
  if (!err) {
    const editedItems = str ? JSON.parse(str) : null;
    if (Array.isArray(editedItems) && payload) {
      console.log(`I have edited Item ${process.argv[3]}, "${editedItems[0]}" to be "${payload}".`);
    }
    else if (Array.isArray(editedItems)) {
      console.log(`I have removed Item ${process.argv[3]}, "${editedItems[0]}".`);
    }
  }
};
