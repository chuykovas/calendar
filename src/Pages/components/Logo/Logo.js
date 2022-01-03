import React from 'react';
import {Link} from "react-router-dom";

function Logo({link}) {
    return (
        <Link to={'/'} className="logo">
            <img width="200" src={link} alt="Лого: Календарь посещаемости" className="logo-image"/>
        </Link>
    );
}

export default Logo;