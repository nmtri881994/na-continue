import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

//style
require("../style/index-page.css");

//components
import MainLayout from '../components/layouts/Main';
import Cards from '../components/items/card/Cards';
import FormButton from '../components/items/form/FormButton'

const Index = (props) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const newItems = [];
        const collection = props.collection.slice(0);

        while (collection.length) {
            newItems.push(collection.splice(0, 3));
        }

        if (!_.isEqual(newItems, items)) {
            setItems(newItems);
        }
    });

    return (
        <MainLayout>
            <div className="index-container-1">
                <div className="index-header-container-1">
                    <div className="index-name">NASA Collection</div>
                    <div className="index-action">
                        <Link to="/nasa-search">
                            <FormButton type="add" text="Add new item" />
                        </Link>
                    </div>
                </div>
                <div className="index-cards-container-1">
                    {items.length !== 0 ? <Cards mode="view" cards={items} /> : null}
                </div>
            </div>
        </MainLayout>
    )
};

const mapStateToProps = state => ({
    collection: state.collection
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Index);