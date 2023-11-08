import React from "react";
import './Button.scss';

export default function Button(props) {

    return (
        <div className={`button ${props?.className || ""}`} style={props?.style} onClick={props?.onClick}>
            <h1 className={`button-title ${props?.styleTitle || ""}`}>
                {props?.children}
            </h1>
        </div>
    );
}