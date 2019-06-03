import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { mediaDisplayReducer } from './mediaDisplayReducer';
import { cardInfoReducer } from './cardInfoReducer';
import { collectionReducer } from './collectionReducer';

export default combineReducers({
    routing: routerReducer,
    mediaDisplay: mediaDisplayReducer,
    cardInfo: cardInfoReducer,
    collection: collectionReducer
});