import { REMOVE_ITEM, TOGGLE_FAVORITE } from './types';

export const removeItem = (nasaId) => {
    return {
        type: REMOVE_ITEM,
        payload: nasaId
    };
};

export const toggleFavorite = (nasaId) => {
    return {
        type: TOGGLE_FAVORITE,
        payload: nasaId
    };
};
