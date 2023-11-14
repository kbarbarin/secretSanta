import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Input.scss'

export default function Input(props) {
    return (
        <div className="input">
            <input
                placeholder={props?.placeholder}
                name={props?.name}
                id={props?.props}
                value={props?.value}
                type={props?.type}
                ref={props?.inputRef}
                onChange={props?.onChange}
                required={props?.required}
            />
            <FontAwesomeIcon className="input-icon" icon={props?.icon} />
        </div>
    )
}