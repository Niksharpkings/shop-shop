/**
 * /* UCLA-U2  FullStack BootCamp comments m22.1.4
 * UPDATE_PRODUCTS is used by the ProductList component.
 * Right now, we're getting all of our product data from the server, and Apollo caches the results.
 * This is great for performance, but it also means we have to go through Apollo every time we want to update that list.
 * The end goal here is to store the data retrieved for products by Apollo in this global state.
 * This way, we can add offline capabilities later and persist our product data!
 */
export const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";

/**
 * /* UCLA-U2  FullStack BootCamp comments m22.1.4
 * UPDATE_CATEGORIES works a lot like UPDATE_PRODUCTS in that we want to take the list of categories retrieved from the server by Apollo
 *  and store it in this global state.
 * Again, this will allow us to easily add offline capabilities at a future point in this project.
 */
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";

/**
 * /* UCLA-U2  FullStack BootCamp comments m22.1.4
 * UPDATE_CURRENT_CATEGORY is sort of the connecting piece of data for the previous two actions we created,
 * in that we want to be able to select a category from the state created by the UPDATE_CATEGORIES action.
 * Also, display products for that category from the list we create from the UPDATE_PRODUCTS action.
 */
export const UPDATE_CURRENT_CATEGORY = "UPDATE_CURRENT_CATEGORY";