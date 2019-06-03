import { START_ADD_OR_EDIT, CLOSE_ADD_OR_EDIT } from '../actions/types';

const initialState = {};

export const cardInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_ADD_OR_EDIT:
            return Object.assign({}, state, action.payload);
        case CLOSE_ADD_OR_EDIT:
            return initialState;
    }
    return state;
}