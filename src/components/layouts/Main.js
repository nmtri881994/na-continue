import React from 'react';

//style
require("../../style/main-layout.css");

//components
import MediaDisplay from '../items/media/Display';

const Layout = (props) => {
    return (
        <div className="page">
            <MediaDisplay />

            <div className="main-container-1">
                {props.children}
            </div>
        </div>
    )
};

export default Layout;