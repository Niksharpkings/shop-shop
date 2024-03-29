import { reducer } from "../utils/reducers";
// import our actions

import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART,
} from "../utils/actions";

// create a sample of what our global state will look like
const initialState = {
  products: [],
  categories: [{ name: "Food" }],
  currentCategory: "1",
  cart: [
    {
      _id: "1",
      name: "Soup",
      purchaseQuantity: 1,
    },
    {
      _id: "2",
      name: "Bread",
      purchaseQuantity: 2,
    },
  ],
  cartOpen: false,
};

test("UPDATE_PRODUCTS", () => {
  let newState = reducer(initialState, {
    type: UPDATE_PRODUCTS,
    products: [{}, {}],
  });

  expect(newState.products.length).toBe(2);
  expect(initialState.products.length).toBe(0);
});

test("UPDATE_CATEGORIES", () => {
  let newState = reducer(initialState, {
    type: UPDATE_CATEGORIES,
    categories: [{}, {}],
  });

  expect(newState.categories.length).toBe(2);
  expect(initialState.categories.length).toBe(1);
});

test("UPDATE_CURRENT_CATEGORY", () => {
  let newState = reducer(initialState, {
    type: UPDATE_CURRENT_CATEGORY,
    currentCategory: "2",
  });

  expect(newState.currentCategory).toBe("2");
  expect(initialState.currentCategory).toBe("1");
});

test("ADD_TO_CART", () => {
  let newState = reducer(initialState, {
    type: ADD_TO_CART,
    product: { purchaseQuantity: 1 },
  });

  expect(newState.cart.length).toBe(3);
  expect(initialState.cart.length).toBe(2);
});

test("ADD_MULTIPLE_TO_CART", () => {
  let newState = reducer(initialState, {
    type: ADD_MULTIPLE_TO_CART,
    products: [{}, {}],
  });

  expect(newState.cart.length).toBe(4);
  expect(initialState.cart.length).toBe(2);
});

test('REMOVE_FROM_CART', () => {
  let newState1 = reducer(initialState, {
    type: REMOVE_FROM_CART,
    _id: '1'
  });

  // cart is still open
  expect(newState1.cartOpen).toBe(true);

  // the second item should now be the first
  expect(newState1.cart.length).toBe(1);
  expect(newState1.cart[0]._id).toBe('2');

  let newState2 = reducer(newState1, {
    type: REMOVE_FROM_CART,
    _id: '2'
  });

  // cart is empty and closed
  expect(newState2.cartOpen).toBe(false);
  expect(newState2.cart.length).toBe(0);

  expect(initialState.cart.length).toBe(2);
});

test('UPDATE_CART_QUANTITY', () => {
  let newState = reducer(initialState, {
    type: UPDATE_CART_QUANTITY,
    _id: '1',
    purchaseQuantity: 3
  });

  expect(newState.cartOpen).toBe(true);
  expect(newState.cart[0].purchaseQuantity).toBe(3);
  expect(newState.cart[1].purchaseQuantity).toBe(2);

  expect(initialState.cartOpen).toBe(false);
});

test('CLEAR_CART', () => {
  let newState = reducer(initialState, {
    type: CLEAR_CART
  });

  expect(newState.cartOpen).toBe(false);
  expect(newState.cart.length).toBe(0);
  expect(initialState.cart.length).toBe(2);
});

test('TOGGLE_CART', () => {
  let newState = reducer(initialState, {
    type: TOGGLE_CART
  });

  expect(newState.cartOpen).toBe(true);
  expect(initialState.cartOpen).toBe(false);

  let newState2 = reducer(newState, {
    type: TOGGLE_CART
  });

  expect(newState2.cartOpen).toBe(false);
});

/**
 * /* UCLA-U2  FullStack BootCamp comments m22.1.4
 * A reducer is a function that updates state by returning a new state object and never alters the original state object.
 * Now, that doesn't mean the data inside the state object isn't altered.
 ? Of course, it is—why else would we need to update state?
 * The key takeaway here is that state is intended to be immutable, meaning it never should be directly altered in any way.
 * The reason for this is that it goes behind the state management system's back and it isn't informed that something has changed.
 * The following code shows an example of what NOT to do with state, using a regular JavaScript object:
// original state
const state = {
  name: 'Lernantino',
  email: 'lernantino@gmail.com' 
}

// update (or mutate) state directly
state.email = 'lernantino99@gmail.com';

* This is fine in normal JavaScript.
! As a matter of fact, we do this all the time!
* But this isn't a great idea when we need to keep track of an application's state in the proper way,
* as we simply reached in and altered something without alerting the rest of the application that it's been altered.
? What if that email address were displayed on the page—how would it know that it needs to be updated?

* Instead, we want to do something like what's shown in the following code to update state:

// original state
const state = {
  name: 'Lernantino',
  email: 'lernantino@gmail.com' 
};

// create a new version of state by making a copy of the original state's data and updating only the part that has changed
const updatedState = {...state, email: 'lernantino99@gmail.com'};

* Now, there's more that goes into this when it comes to letting the UI know the application's state has changed, but we'll see that soon.
* The key takeaway here is that we now have the original state and the updated state in two separate entities, allowing the application to compare them
* and notice the change, thus informing the UI to acknowledge the change and update what the user sees.
* State is a conceptually heavy topic.
* It takes time to gain a firm grasp of all the unseen events that are put to use with an app like this, but with time it'll become clearer.
* The important thing for us to know is that when updating state, it's important that we do so by creating a new version of it
* rather than reaching out and directly altering it.
 */
