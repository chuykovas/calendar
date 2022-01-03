import React from 'react';
import Button from "../Button/Button";
import logo from './logo.png'
import Logo from "../Logo/Logo";
import './Header.css'
import LinkButton from "../LinkButton/LinkButton";
import {logout} from "../../../store/auth/slice";
import {useDispatch} from "react-redux";


function Header(props) {
    const dispatch = useDispatch();
    function logOut () {
        dispatch(logout());
    }

    return (
        <div className="headerCalendar">
            <Logo link={logo} className="logoCalendar"/>
            <div className='button-wrapper'>
                <LinkButton path={'/'} name="Главная"/>
                <Button name='Выйти' onClick={logOut}/>
            </div>


        </div>
    );

}

export default Header;