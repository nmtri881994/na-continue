import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faHeart, faPen } from '@fortawesome/free-solid-svg-icons';

require("../../../style/action-button.css");

const ActionButton = (props) => {

    const [hover, setHover] = useState(false);

    function onToggleHover() {
        setHover(!hover);
    }

    const iconStyle = {
        borderColor: `${hover ? "#d3d2d9" : "#ebebed"}`,
        color: `${hover ? props.type === "favorite" ? "#e54d42" : "black" : props.favorited ? "#e54d42" : "#aeacb9"}`
    }

    return (
        <div onClick={() => {
            if (props.onClickAgrs) {
                props.onClick(props.onClickAgrs);
            } else {
                props.onClick();
            }
        }} style={iconStyle} onMouseEnter={onToggleHover} onMouseLeave={onToggleHover} className="action-button-container-1" tabIndex={props.tabIndex}>
            <FontAwesomeIcon icon={props.type === "remove" ?
                faTrashAlt : props.type === "favorite" ?
                    faHeart : props.type === "edit" ?
                        faPen : null} />
        </div>
    )
};

export default ActionButton;
