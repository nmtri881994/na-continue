import React, { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

require("../../../style/input.css");

const FormInput = forwardRef((props, ref) => {

    function onTextChange(e) {
        let newInfo = Object.assign({}, props.info);
        newInfo.value = e.target.value;
        props.onTextChange(newInfo);
    }

    // useImperativeHandle(ref, () => ({
    //     validate() {
    //         setLocalValid(true);
    //         if (props.validation.indexOf("madatory") !== -1) {
    //             if (!_.isEmpty(props.value)) {
    //             } else {
    //                 props.setValid(false);
    //                 setLocalValid(false);
    //             }

    //             if (props.setValidating) {
    //                 props.setValidating(false);
    //             }
    //         }
    //     }
    // }));

    return (
        <div className="input-container-1">
            {}
            <input onChange={e => onTextChange(e)} value={props.info.value ? props.info.value : ""} tabIndex={props.tabIndex} type="text" className={`input ${props.info.valid ? "" : "form-invalid"}`} required />
            <label className={`input-label ${props.required ? "required" : ""}`}>{props.label}</label>
        </div>
    );
});

export default FormInput;