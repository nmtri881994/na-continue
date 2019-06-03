import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

require("../../../style/thumbnail.css");

const Thumbnail = (props) => {

    const thumbnailContainer3Style = {
        display: "block",
        paddingBottom: "60%",
        background: `url(${props.image ? encodeURI(props.image) : ""})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
    };

    return (
        <div className="thumnail-container-1">
            <div className="thumnail-container-2">
                <div className="thumnail-container-3" style={thumbnailContainer3Style}>
                </div>
            </div>
            {props.type === "video" ? <div className="card-play">
                <div className="play-icon-container-1">
                    <div className="play-icon-container-2">
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                </div>
            </div> : null}
        </div>
    )
};

export default Thumbnail;