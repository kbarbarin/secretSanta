import React from "react";
import './Input.scss'

export default function Input(props) {
    return (
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
    )
}