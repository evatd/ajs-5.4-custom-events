// Helper function to help keep code clean...
// All it does is make a button element, which we then add to each of the p
// elements we add to the page
function makeMasterDeleteButton() {
  var btn = document.createElement("a");
  btn.textContent = "X";
  btn.classList.add("item-delete"); // give button the class "item-delete"
  btn.setAttribute("href", "#");
  return btn;
}

// Variables used by script.
// We need references to the textarea, the button and the div to place the results in
// We also need variables to store the custom event objects in
var userInput = document.getElementById("user-input"),
  saveButton = document.getElementById("btn"),
  resultEl = document.getElementById("saved-text"),
  ADDEDELEMENTEVENT,
  REMOVEDELEMENTEVENT;

// Create an "Add" event object. We need to pass data with this one, so
// we use the CustomEvent constructor. The "description" property is blank
// by default. When we fire the event, we will add something to the description.
ADDEDELEMENTEVENT = new CustomEvent("ElementAdded", {
  detail: {
    description: ""
  }
});

// Create a "Remove" event object. No data to pass with this one, so a
// plain Event object will suffice
REMOVEDELEMENTEVENT = new Event("ElementRemoved");

// Make sure we have valid elements to work with
if (userInput !== null && saveButton !== null && resultEl !== null) {
  // Bonus points... make an element to hold total number of TODOs
  // First, make a "p" element and add it to DOM, then make a "span"
  // element and add it to the "p". The "span" element is where the
  // total is displayed. E.g.: <p>Total: <span>X</span></p>
  // NB: var declarations should be with others at top of file... i've left them here
  // for clarity
  var p = document.createElement("p");
  p.textContent = "Total: ";
  var totalWrapper = resultEl.insertAdjacentElement("afterend", p);
  var s = document.createElement("span");
  s.textContent = "0";
  var totalEl = totalWrapper.appendChild(s);
  // End bonus points

  // Listeners for the custom events...

  // Listener for add event
  document.addEventListener("ElementAdded", function(event) {
    // Get the text from event object
    var elText = event.detail.description;
    console.log("New element: " + elText);
  });

  // Listener for remove event
  document.addEventListener("ElementRemoved", function(event) {
    console.log("Element has been removed");
  });

  // Another listener for add event... updates the "total" paragraph
  document.addEventListener("ElementAdded", function(event) {
    totalEl.textContent = resultEl.children.length;
  });

  // Another listener for remove event... updates the "total" paragraph
  document.addEventListener("ElementRemoved", function(event) {
    // Update the total
    totalEl.textContent = resultEl.children.length;
  });

  // Listen for clicks on form button
  saveButton.addEventListener("click", function(event) {
    var newNode, // Element we will create
      itemDeleteButton, // Delete button for element
      submitted = userInput.value; // Text from form field

    // Check if user entered something
    if (submitted !== "") {
      // Make a p element and add the submitted text to it
      newNode = document.createElement("p");
      newNode.textContent = submitted;

      // Make a delete button element and append it to p element
      itemDeleteButton = makeMasterDeleteButton();
      newNode.insertAdjacentElement("afterbegin", itemDeleteButton);

      // add the p element to the page
      resultEl.appendChild(newNode);

      // Copy the submitted text to the "Add" event's detail object
      ADDEDELEMENTEVENT.detail.description = submitted;

      // trigger/fire the "added" event
      document.dispatchEvent(ADDEDELEMENTEVENT);

      // Erase user's text from the textarea
      userInput.value = "";
    }

    // Stop the browser's default behaviour. By default, when a "button" within a "form"
    // element is clicked, the form gets submitted, resulting in a page reload (which we don't want)
    event.preventDefault();
  });

  // Add event listener to wrapper that holds all paragraphs we added
  // Event will bubble up from the delete buttons contained within it
  resultEl.addEventListener("click", function(event) {
    // Reference to thing that was clicked
    var clicked = event.target;

    // Check if it is a delete button (it should have the item-delete class)
    if (clicked.classList.contains("item-delete")) {
      event.preventDefault();
      // We don't want to remove the button, we want to remove its parent (the p)
      // To remove an el from DOM, we need a reference to its parent...
      // The parent of the "p" elements is resultEl
      resultEl.removeChild(clicked.parentNode);
      // NB: when we remove an element from the DOM, all of its
      // children are also removed. So removing the p also removes
      // the text that was in it and the button element too

      // Trigger/fire the "Remove" event
      document.dispatchEvent(REMOVEDELEMENTEVENT);
    }
  });
}
