import React, { useRef, useEffect } from 'react';
import lineHeight from 'line-height';

require("../../../style/input.css");

const TextArea = (props) => {

    const textareaEl = useRef(null);

    function autoGrowTextArea() {
        textareaEl.current.style.height = "1px";
        if (textareaEl.current.value.trim() !== "") {
            textareaEl.current.style.height = (textareaEl.current.scrollHeight - lineHeight(textareaEl.current) - 10) + "px";
            // target.style.height = (target.scrollHeight - lineHeight(textareaEl.current) -10) + "px";
        } else {
            textareaEl.current.style.height = lineHeight(textareaEl.current) + "px";
        }
    }

    function onTextChange(e) {
        let newInfo = Object.assign({}, props.info);
        newInfo.value = e.target.value;
        props.onTextChange(newInfo);
    }

    useEffect(() => {
        autoGrowTextArea();
    }, [props.info.value]);

    useEffect(() => {
        window.addEventListener("resize", autoGrowTextArea);
        return () => {
            window.removeEventListener("resize", autoGrowTextArea);
        };
    }, [])

    return (
        <div className="input-container-1">
            <textarea ref={textareaEl} value={props.info.value} tabIndex={props.tabIndex} onChange={e => onTextChange(e)} rows="1" id={props.id} type="text" className={`input-textarea ${props.info.valid ? "" : "form-invalid"}`} required />
            <label htmlFor={props.id} className={`input-label ${props.required ? "required" : ""}`}>{props.label}</label>
        </div>
    );
};

export default TextArea;