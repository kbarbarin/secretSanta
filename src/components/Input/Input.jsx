import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faUser} from '@fortawesome/free-svg-icons'

import './Input.scss';

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
            {props?.icon && <FontAwesomeIcon className="input-icon" onClick={props?.onClickIcon} icon={props?.icon} />}
        </div>
    )
}