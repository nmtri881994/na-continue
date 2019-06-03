import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

//style
require("../../../style/card.css");

//components
import Thumbnail from './Thumbnail';
import ActionButton from '../form/ActionButton';

//actions
import { getMetadataByNasaId } from '../../../actions/searchAction';
import { viewMedia, startAddOrEdit } from '../../../actions/cardAction';
import { removeItem, toggleFavorite } from '../../../actions/collectionAction';

const Card = (props) => {

    const [owner, setOwner] = useState("");

    useEffect(() => {
        let isSubcribed = true;

        async function getOwner() {
            const metadatRes = await getMetadataByNasaId(props.item.type, props.item.nasaId);
            if (metadatRes && metadatRes.status === 200) {
                const metadata = await metadatRes.json();
                if (isSubcribed) {
                    setOwner(metadata["AVAIL:Owner"]);
                }
            }
        }
        getOwner();

        return () => isSubcribed = false;
    }, [props.item.nasaId]);

    function onAddOrEdit() {
        props.startAddOrEdit({
            title: props.item.title,
            description: props.item.description,
            mediaType: props.item.type,
            previewImageUrl: props.item.previewImageUrl,
            fileURl: props.item.fileURl,
            nasaId: props.item.nasaId,
            dateCreated: props.item.dateCreated
        });
    }

    return (<div className="card-container-1">
        <div onClick={() => {
            props.viewMedia({
                name: props.item.title,
                type: props.item.type,
                contentLink: props.item.type === "image" ? props.item.previewImageUrl : props.item.type === "video" ? props.item.fileURl : ""
            });
        }} className="card-thumbnail-container-1">
            <Thumbnail image={props.item.previewImageUrl} type={props.item.type} />
        </div>
        <div className="card-detail-container-1">
            <div className="card-detail-item-container-1 card-location-time">
                <div className="card-location">
                    {owner}
                </div>
                <div className="card-time">
                    {new moment(props.item.dateCreated).format("D MMM, YYYY")}
                </div>
            </div>
            <div className="card-detail-item-container-1 card-title">
                {props.item.title}
            </div>
            <div className="card-detail-item-container-1 card-description">
                {props.item.description}
            </div>
        </div>
        <div className="card-action-container-1">
            <div className="card-action-container-2">
                {props.mode === "view" ? <div className="card-view-action-container-1">
                    <ActionButton type="favorite" favorited={props.item.favorited} onClick={props.toggleFavorite} onClickAgrs={props.item.nasaId} />
                    <ActionButton type="remove" onClick={props.removeItem} onClickAgrs={props.item.nasaId} />
                    <ActionButton type="edit" onClick={onAddOrEdit} />
                </div> : props.mode === "search" ? <div className={`card-search-action-container-1 ${props.item.added ? "disabled" : ""}`} onClick={() => onAddOrEdit()}>

                    <span>{props.item.added ? "Added" : "Add to Nasa collection"}</span>
                    <div className="add-to-collection-button-icon">
                        <FontAwesomeIcon icon={props.item.added ? faCheck : faPlus} />
                    </div>
                </div> : null}
            </div>
        </div>
    </div >);
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ viewMedia, startAddOrEdit, removeItem, toggleFavorite }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Card);