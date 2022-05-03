// Establish DOM elements as variables
const grocerySubmit = document.getElementById("addGrocery");
const list = document.getElementById("list");
const clearBtn = document.getElementById("clear");

// Instantiate default state value:
const initialState = {
  groceries: [],
};
// establish the reducer. Takes initial state value and an action as arguments.
const groceryReducer = (state = initialState.groceries, action) => {
  switch (action.type) {
    case "grocery/add":
      return [
        ...state,
        {
          text: action.text,
        },
      ];
    case "grocery/clear":
      return [];
    default:
      return state;
  }
};
// establishing our store
let store = Redux.createStore(groceryReducer);
// When we click the Clear button, it might be a positive user experience to also clear out the text content from the input field
const clearList = () => {
  document.getElementById("newItem").value = "";
  store.dispatch({
    type: "grocery/clear",
  });
};
// adapt our newGrocery function to log current state. dispatch and send the collected data as the text field of our action
const newGrocery = (e) => {
  e.preventDefault();
  let groceryText = document.getElementById("newItem").value;
  store.dispatch({
    type: "grocery/add",
    text: groceryText,
  });
  console.log(store.getState());
};
// event listeners to trigger these functions
grocerySubmit.addEventListener("click", (e) => {
  newGrocery(e);
});
clearBtn.addEventListener("click", clearList);

const renderList = (state) => {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  state.forEach((grocery) => {
    // Generate a new list element for each grocery item
    let li = document.createElement("li");
    // Append the new element to our list DOM element, we targeted
    // it at the beginning of this code-along!
    list.appendChild(li);
    // Populate the text content of the list item
    li.textContent = grocery.text;
  });
};
// we can call Redux's subscribe method so that we re-run our render each time state is changed
const render = () => {
  const state = store.getState();
  renderList(state);
};

store.subscribe(render);
