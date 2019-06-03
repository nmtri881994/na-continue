import { CLOSE_MEDIA_DISPLAY, DISPLAY_MEDIA } from '../actions/types';

const initialState = {};

export const mediaDisplayReducer = (state = initialState, action) => {
    switch (action.type) {
        case DISPLAY_MEDIA:
            return Object.assign({}, state, action.payload);
        case CLOSE_MEDIA_DISPLAY:
            return initialState;
    }
    return state;
}