import React from "react";

export default function Input(props) {
    return (
        <input
            placeholder={props?.placeholder}
            type={props?.type}
            ref={props?.inputRef}
            onChange={props?.onChange}
            required={props?.required}
        />
    )
}