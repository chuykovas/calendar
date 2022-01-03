import React, { useEffect } from 'react'
import '../Layout/DayLayout.css';
import Button from "../components/Button/Button";
import {useParams, useNavigate, Navigate, useLocation} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addDefaultGroup, changeStudent } from '../../store/groups/slice';
import './Group.css';
import classNames from "classnames";


function Group() {
  const location = useLocation();
  const redirectTo = location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { day, groupId } = useParams();
  const days = useSelector(state => state.groups.days);
  const group = days?.[day]?.find(group => group.id === groupId);
  const email = useSelector(state => state.auth.email);

  useEffect(() => {
    if (!group) {
      dispatch(addDefaultGroup({ day, id: groupId }))
    }
  }, [])

  const goBack = () => {
    navigate(`/${day}`);
  }

  function changeSudentStatus(day, groupId, name) {
    dispatch(changeStudent({day, groupId, name}))
  }


  return email ? (
    <div className="form-day">
      <div className="header-form">
        <h2 className='title-h2'>{day}</h2>
      </div>
      {group && group.students.map(({ name, chacked }) => (
        <div key={name} className={classNames('user', chacked ? 'checked' : '')}
             onClick={()=>changeSudentStatus(day, groupId, name)}> {name} </div>
      ))}
      <Button name="Выйти" onClick={goBack} />
    </div>
  ) : (
      <Navigate to={`/login?redirectTo=${redirectTo}`}/>
  );
}

export default Group