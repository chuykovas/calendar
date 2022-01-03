import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import ruLocale from "@fullcalendar/core/locales/ru";
import './Main.css';
import {Navigate, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function Main(props) {
    const email = useSelector(state => state.auth.email);
    const navigate = useNavigate();
    const days = useSelector(state => state.groups.days);
    const dayArray = Object.entries(days);
    const getEvents = () => {
        const eventsList = [];
        dayArray.forEach(item =>
           eventsList.push({
                date: item[0],
                title: 'Отмечено',
                allDay: true
            })
        );

        return eventsList;
    }
    const handleDateClick = (arg) => {
        const date = arg.dateStr;
        navigate(`/${date}`);
    }
    const events = getEvents();

    return email ? (
        <div className={'calendar-wrapper'}>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                dateClick={handleDateClick}
                events={events}
                locale={ruLocale}
                height={650}
            />
        </div>
    ):(
        <Navigate to='/login'/>
    );
}

export default Main;






