import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';

//custom hooks
// import { useInterval } from "../customer-hooks/useInterval"

//style
require("../style/search-page.css");

//components
import MainLayout from '../components/layouts/Main';
import Cards from '../components/items/card/Cards';

//action
import * as action from '../actions/searchAction';

const timeTypingInterval = 500;

const Search = (props) => {

    const [typingTimer, setTypingTimer] = useState(null);

    const [searchKey, setSearchKey] = useState("");

    const [triggerSearch, setTriggerSearch] = useState(false);

    function onSearchChange(e) {
        setTriggerSearch(false);
        setSearchKey(e.target.value);
        clearTimeout(typingTimer);
        setTypingTimer(setInterval(() => setTriggerSearch(true), timeTypingInterval));
    };

    const [searchMess, setSearchMess] = useState("");

    const [searchResults, setSearchResults] = useState([]);

    const [nextLink, setNextLink] = useState([]);

    useEffect(() => {
        let isSubscribed = true;
        const collection = props.collection;

        async function search() {
            if (isSubscribed) {
                setSearchMess("Loading...");
            }
            const searchRes = await action.searchByKey(searchKey);
            if (searchRes && searchRes.status === 200) {
                const searchData = await searchRes.json();
                if (searchData) {
                    if (isSubscribed) {
                        const newSearchResults = [];
                        let items = searchData.collection.items.filter(item => ["video", "image"].indexOf(item.data[0].media_type) !== -1);
                        const numberOfResult = items.length;
                        items = items.map(item => {
                            let newItem = {};
                            newItem.nasaId = item.data[0].nasa_id;
                            newItem.title = item.data[0].title;
                            newItem.description = item.data[0].description;
                            newItem.type = item.data[0].media_type;
                            newItem.previewImageUrl = item.links[0].href;
                            newItem.fileURl = "";
                            newItem.dateCreated = item.data[0].date_created;

                            return newItem;
                        })

                        items = filterOutAdded(collection, items);

                        while (items.length) {
                            newSearchResults.push(items.splice(0, 3));
                        }

                        setSearchResults(newSearchResults);
                        setNextLink(searchData.collection.links);
                        setSearchMess(`${numberOfResult} result(s) for "${searchKey}"`);
                    }
                } else {
                    if (isSubscribed) {
                        setSearchMess("Data format wrong");
                    }
                }
            } else {
                if (isSubscribed) {
                    setSearchMess("System error");
                }
            }
        }

        if (triggerSearch && searchKey.trim() !== "") {
            search();
        }

        return () => isSubscribed = false;
    }, [triggerSearch, searchKey]);

    function filterOutAdded(collection, items) {
        return items.map(item => {
            if (collection.findIndex(x => x.nasaId === item.nasaId) !== -1) {
                item.added = true;
            };

            return item;
        })
    }

    useEffect(() => {
        const newResults = filterOutAdded2(props.collection, searchResults);
        if (!_.isEqual(newResults, searchResults)) {
            setSearchResults(newResults);
        }

    })

    function filterOutAdded2(collection, searchResults) {
        const results = searchResults.slice(0);
        return results.map(result => {
            result = result.map(item => {
                if (collection.findIndex(x => x.nasaId === item.nasaId) !== -1) {
                    let newItem = Object.assign({}, item);
                    newItem.added = true;
                    return newItem;
                };

                return item;
            });

            return result;
        })
    }

    return (
        <MainLayout>
            <div className="search-page-container-1">
                <div className="search-back-to-collection">
                    <Link style={{ display: "flex", color: "#3399f0" }} to="/"><FontAwesomeIcon style={{ display: "flex", marginRight: "10px", fontSize: "1.2em" }} icon={faChevronLeft} />
                        <span style={{ display: "flex", alignItems: "center" }}>
                            Back to Collection
                        </span>
                    </Link>
                </div>
                <div className="search-title">
                    Search from Nasa
                </div>
                <input value={searchKey} onChange={e => onSearchChange(e)} className="search-input" placeholder="Type something to search..." />
                <div className="search-number-of-results">
                    {searchMess}
                </div>
                <div className="search-result">
                    {searchResults.length !== 0 ?
                        <Cards cards={searchResults} mode={"search"} /> : null}
                </div>
            </div>
        </MainLayout >
    )
};

const mapStateToProps = state => ({
    collection: state.collection
});

export default connect(mapStateToProps)(Search);