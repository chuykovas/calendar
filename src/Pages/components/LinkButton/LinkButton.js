import React from 'react';
import {Link} from "react-router-dom";
import './LinkButton.css'

function LinkButton(props) {
    return (

        <Link to={props.path} className={'link'}>{props.name}</Link>

    );
}

export default LinkButton;