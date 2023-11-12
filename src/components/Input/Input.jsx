import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faUser} from '@fortawesome/free-svg-icons'

import './Input.scss';

export default function Input(props) {
    return (
        <div>
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
            {/* <FontAwesomeIcon icon={faUser} /> */}
        </div>
    )
}