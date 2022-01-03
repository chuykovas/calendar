import React from 'react';
import '../Layout/DayLayout.css';
import Button from "../components/Button/Button";
import {Link, Navigate, useLocation} from "react-router-dom";
import {useParams, useNavigate} from "react-router-dom";
import {useSelector} from 'react-redux';
import './Day.css';
import classNames from "classnames";

function Day() {
    const location = useLocation();
    const redirectTo = location.pathname;
    const navigate = useNavigate();
    const {day} = useParams();
    const days = useSelector(state => state.groups.days);
    const groupList = useSelector(state => state.groups.list);
    const email = useSelector(state => state.auth.email);
    const foundedDay = days[day];


    const goBack = () => {
        navigate('/');

    }


    return email ? (
        <div className="form-day">
            <div className="header-form">
                <h2 className='title-h2'>{day}</h2>
            </div>
            {!foundedDay && <div className='no-entries'>Записей за текущий день нет.</div>}

            {groupList.map(group => (
                <Link key={group.id} to={`/${day}/groups/${group.id}`}
                      className={classNames('group-list', foundedDay?.find(item => item.id === group.id) ? 'visited' : '')}>
                    {group.name}
                </Link>
            ))}
            <Button name="Выйти" onClick={goBack}/>
        </div>
    ) : (
        <Navigate to={`/login?redirectTo=${redirectTo}`}/>
    );
}

export default Day