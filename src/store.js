import { createStore, applyMiddleware } from 'redux';


//reducers
import rootReducer from './reducers'

const initialState = {};

const store = createStore(
    rootReducer,
    initialState
);

export default store;