import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';

//style
require("../../../style/info-form.css");

//actions
import { closeAddOrEdit, addItem, editItem } from '../../../actions/cardAction';
import { format } from 'util';

//components
import FormInput from '../form/FormInput';
import FormTextArea from '../form/TextArea';
import FormButton from './FormButton';
import TextArea from '../form/TextArea';

const InfoForm = (props) => {

    const [title, setTitle] = useState({
        value: "",
        valid: true
    });

    const [description, setDescription] = useState({
        value: "",
        valid: true
    });

    const [type, setType] = useState({
        value: "",
        valid: true
    });

    const [previewImageUrl, setPreviewImageUrl] = useState({
        value: "",
        valid: true
    });

    const [fileURl, setFileURl] = useState({
        value: "",
        valid: true
    });

    const [nasaId, setNasaId] = useState("");

    const [dateCreated, setDateCreated] = useState("");

    useEffect(() => {
        setTitle(Object.assign({}, title, { value: props.info.title }));
        setDescription(Object.assign({}, description, { value: props.info.description }));
        setType(Object.assign({}, type, { value: props.info.mediaType }));
        setPreviewImageUrl(Object.assign({}, previewImageUrl, { value: props.info.previewImageUrl }));
        setFileURl(Object.assign({}, fileURl, { value: props.info.fileURl }));
        setNasaId(props.info.nasaId);
        setDateCreated(props.info.dateCreated);
    }, [props.info]);

    const previewLinkRef = useRef();
    const fileLinkRef = useRef();

    // const [valid, setValid] = useState(false);

    // const [readySubmit, setReadySubmit] = useState(false);

    function handleSubmit() {
        let valid = true;
        if (_.isEmpty(previewImageUrl.value)) {
            valid = false;
            setPreviewImageUrl(Object.assign({}, previewImageUrl, { valid: false }));
        } else {
            setPreviewImageUrl(Object.assign({}, previewImageUrl, { valid: true }));
        }

        if (_.isEmpty(fileURl.value)) {
            valid = false;
            setFileURl(Object.assign({}, fileURl, { valid: false }));
        } else {
            setFileURl(Object.assign({}, fileURl, { valid: true }));
        }

        if (valid) {
            if (props.mode === "search") {
                props.addItem({
                    nasaId,
                    title: title.value,
                    description: description.value,
                    type: type.value,
                    previewImageUrl: previewImageUrl.value,
                    fileURl: fileURl.value
                });
            }

            if (props.mode === "view") {
                props.editItem({
                    nasaId,
                    dateCreated,
                    title: title.value,
                    description: description.value,
                    type: type.value,
                    previewImageUrl: previewImageUrl.value,
                    fileURl: fileURl.value
                })
            }

            props.closeAddOrEdit();
        }
    }

    return (
        <>
            {!_.isEmpty(props.info) ? <div className="info-form-container-1">
                <div className="info-form-container-2">
                    <div className="info-form-header">
                        <div className="info-form-title">
                            {props.mode === "search" ? "Add to collection" : props.mode === "view" ? "Edit" : ""}
                        </div>
                        <div className="info-form-close" onClick={() => props.closeAddOrEdit()}>
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                    </div>
                    <div className="info-items-container-1">
                        <div className="info-item">
                            <FormInput label="Title" info={title} tabIndex="1" onTextChange={setTitle} required={false} />
                        </div>
                        <div className="info-item">
                            <TextArea label="Description" info={description} tabIndex="2" onTextChange={setDescription} required={false} />
                        </div>
                        <div className="info-item"></div>
                        <div className="info-item">
                            <FormInput ref={previewLinkRef} validation={["madatory"]} label="Link preview image url" info={previewImageUrl} tabIndex="4" onTextChange={setPreviewImageUrl} required={true} />
                        </div>
                        <div className="info-item">
                            <FormInput ref={fileLinkRef} validation={["madatory"]} label="Link file url" info={fileURl} tabIndex="5" onTextChange={setFileURl} required={true} />
                        </div>
                    </div>
                    <div className="info-actions-container-1">
                        <FormButton onClick={handleSubmit} tabIndex="6" type={`${props.mode === "search" ? "add" : props.mode === "view" ? "check" : null}`}
                            text={`${props.mode === "search" ? "Add to collection" : props.mode === "view" ? "Save" : null}`} />
                    </div>
                </div>
            </div> : null}
        </>
    )
};

const mapStateToProps = state => ({
    info: state.cardInfo
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ closeAddOrEdit, addItem, editItem }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InfoForm);