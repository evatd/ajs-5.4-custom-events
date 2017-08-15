# ajs-5.4-custom-events
Advanced JavaScript | Lecture 5 Task 4

Using your completed code from exercise 5.3, you will add some custom events. 1. When an element is added to the group, fire an event 
- When this event fires, you should return the description of the element as part of the detail object. 
2. When an element is removed from the DOM, fire another event Attach event handlers to listen for both of these events and console.log appropriate messages: 
- The add event: log the element text • The remove event: log a message: “Element Removed” 
Note, the event handlers need to be attached to the event after the event has been created, but before it has been dispatched. 
If you have time, add a paragraph to the HTML page where the total number of items in the group is displayed: 
<p>Total: <span id="total-items">X</span></p>
