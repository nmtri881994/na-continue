import { CLOSE_MEDIA_DISPLAY, DISPLAY_MEDIA, START_ADD_OR_EDIT, CLOSE_ADD_OR_EDIT, ADD_ITEM, EDIT_ITEM } from './types';

export const viewMedia = (media) => {
    return {
        type: DISPLAY_MEDIA,
        payload: media
    };
};

export const closeMediaDisplay = () => {
    return {
        type: CLOSE_MEDIA_DISPLAY
    };
};

export const startAddOrEdit = (info) => {
    return {
        type: START_ADD_OR_EDIT,
        payload: info
    };
};

export const closeAddOrEdit = () => {
    return {
        type: CLOSE_ADD_OR_EDIT
    };
};

export const addItem = (item) => {
    return {
        type: ADD_ITEM,
        payload: item
    };
};

export const editItem = (item) => {
    return {
        type: EDIT_ITEM,
        payload: item
    };
}