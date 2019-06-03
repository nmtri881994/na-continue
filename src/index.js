import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

// import { Router, Route } from 'react-router';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux';

//store
import store from './store';

//components
import App from "./App";
import Search from './pages/Search';
import Index from './pages/Index';

const history = syncHistoryWithStore(createBrowserHistory(), store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            {/* <Route path="/"> */}
            <Route exact path="/" component={Index} />
            <Route path="/nasa-search" component={Search} />
            {/* </Route> */}
        </Router>
    </Provider>,
    document.getElementById('app')
);

module.hot.accept();