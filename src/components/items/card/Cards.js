import React from 'react';

//components
import Card from './Card';
import InfoForm from '../form/InfoForm';

//style
require('../../../style/cards.css');

const Cards = (props) => {
    return (
        <div className="cards-line-container">
            <InfoForm mode={props.mode} />
            {props.cards.map(items => <div key={items[0].nasaId} className="cards-line-container-1">
                {items.map(item =>
                    <Card key={item.nasaId} item={item} mode={props.mode} />
                )}
            </div>)}
        </div>
    )
};

export default Cards;