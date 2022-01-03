import React from 'react';
import "./Button.css"

function Button({onClick, ...props}) {

    return (
        <button className="button" onClick={onClick} type={props.type} disabled={props.disabled}>{props.name}</button>
    );
}
export default Button;