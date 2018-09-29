import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";

const customLogger = createLogger({ collapsed: true });
const rootReducer = () => {};

/**
 * Wrapper around createStore to mock store for testing.
 * Call with no params to get an empty store.
 * @param preloadedState Object to use as store.
 */
export const createHydratedStore = (preloadedState?: any) =>
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, customLogger)
  );

const store = createHydratedStore();

export default store;
