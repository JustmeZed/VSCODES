// Get references to HTML elements
var add = document.getElementById('addToDo');           // The "Add" button
var input = document.getElementById('inputField');      // The input field for new to-do items
var toDoContainer = document.getElementById('toDoContainer');  // The container where to-do items will appear

// Add event listener to the "Add" button
add.addEventListener('click', addItem);

// Also allow pressing "Enter" in the input field to add a new item
input.addEventListener('keypress', function(e) {
    if (e.key === "Enter") {
        addItem();
    }
});

// Function to create and add a new to-do item
function addItem() {
    const item_value = input.value.trim(); // Get and trim the input value to remove whitespace

    // Prevent adding empty or whitespace-only items
    if (item_value === '') {
        alert("Please enter a to-do item!"); // Show alert to the user
        return; // Stop the function here
    }

    // Create the outer div for the to-do item
    const item = document.createElement('div');
    item.classList.add('item');

    // Create a content container inside the to-do item
    const item_content = document.createElement('div');
    item_content.classList.add('content');
    item.appendChild(item_content);

    // Create an input element to display the to-do text (read-only by default)
    const input_item = document.createElement('input');
    input_item.classList.add('text');
    input_item.type = 'text';
    input_item.value = item_value;
    input_item.setAttribute('readonly', 'readonly');

    // Allow users to strike through item by double-clicking
    input_item.addEventListener('dblclick', function() {
        input_item.style.textDecoration = "line-through";
    });

    item_content.appendChild(input_item);

    // Create a container for action buttons (edit & delete)
    const item_action = document.createElement('div');
    item_action.classList.add('actions');

    // Create an "Edit" button
    const edit_item = document.createElement('button');
    edit_item.classList.add('edit', 'btn', 'btn-success');
    edit_item.type = "button";
    edit_item.innerText = 'Edit';

    // Create a "Delete" button (with FontAwesome trash icon classes)
    const delete_item = document.createElement('button');
    delete_item.classList.add('delete', 'btn', 'btn-danger', 'fa', 'fa-trash');

    // Add both buttons to the action container
    item_action.appendChild(edit_item);
    item_action.appendChild(delete_item);

    // Add the action container to the to-do item
    item.appendChild(item_action);

    // Finally, add the complete to-do item to the container on the page
    toDoContainer.appendChild(item);

    // Clear the input field for the next to-do
    input.value = '';

    // Add functionality to the "Edit" button
    edit_item.addEventListener('click', () => {
        if (edit_item.innerText.toLowerCase() === "edit") {
            edit_item.innerText = "Save";
            input_item.removeAttribute("readonly"); // Make the input editable
            input_item.focus(); // Focus so user can start typing
        } else {
            edit_item.innerText = "Edit";
            input_item.setAttribute("readonly", "readonly"); // Lock the input again
        }
    });

    // Add functionality to the "Delete" button
    delete_item.addEventListener('click', () => {
        toDoContainer.removeChild(item); // Remove the item from the list
    });
}
