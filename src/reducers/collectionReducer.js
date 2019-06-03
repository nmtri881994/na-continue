import { ADD_ITEM, EDIT_ITEM, REMOVE_ITEM, TOGGLE_FAVORITE } from '../actions/types';

const initialState = [];

export const collectionReducer = (state = initialState, action) => {
    let newState = [];
    switch (action.type) {
        case ADD_ITEM:
            newState = state.slice(0);
            newState.push(action.payload);
            return newState;
        case EDIT_ITEM:
            newState = state.slice(0);
            newState[newState.findIndex(item => item.nasaId === action.payload.nasaId)] = action.payload;
            return newState;
        case TOGGLE_FAVORITE:
            newState = state.slice(0);
            let updatedItem = Object.assign({}, newState[newState.findIndex(item => item.nasaId === action.payload)]);


            if (updatedItem.favorited !== undefined) {
                updatedItem.favorited =
                    !updatedItem.favorited;
            } else {
                updatedItem.favorited = true;
            }

            newState[newState.findIndex(item => item.nasaId === action.payload)] = updatedItem;
            return newState;
        case REMOVE_ITEM:
            newState = state.slice(0);
            newState.splice(newState.findIndex(item => item.nasaId === action.payload), 1);
            return newState;

    }
    return state;
}