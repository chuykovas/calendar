import React, {useState} from 'react';
import './Login.css';
import {Navigate, useSearchParams} from 'react-router-dom';
import Button from "../components/Button/Button";
import classNames from "classnames";
import {useDispatch, useSelector} from 'react-redux';
import {login} from "../../store/auth/slice";
import {saveToLocalStore} from "../../store/auth/useAuth";


function Login(props) {
    let [searchParams] = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") || '/'

    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email);
    const [errorEmail, setErrorEmail] = useState('Поле обязательно для заполнения');
    const [errorPassword, setErrorPassword] = useState('Поле обязательно для заполнения');
    const [form, setForm] = useState({
        inputEmail: '',
        inputPassword: ''
    });

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const handleLogin = () => {
            saveToLocalStore({email: form.inputEmail});
            dispatch(login({email: form.inputEmail}));
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    const validationEmail = (event) => {
        const emailValue=event.target.value;
          if (!emailValue)  {
              return setErrorEmail('Поле обязательно для заполнения');
          }
          if(!validateEmail(emailValue)){
              return setErrorEmail('Email введен неверно');
          }
          return setErrorEmail('');
    }
    const validationPassword = (event) =>{
        const passwordValue = event.target.value;
        if(!passwordValue){
            return setErrorPassword('Поле обязательно для заполнения');
        }
        if(passwordValue.length < 3){
            return setErrorPassword('Пароль должен содержать более 3 символов');
        }
        return setErrorPassword('');
    }

    if(email){
        return <Navigate to={redirectTo}/>
    }
    return (
        <div className="form-login__overlay">
            <form className="form-auth" onSubmit={event=>event.preventDefault()}>
                <h1 className='title'>Вход</h1>
                <div className="input-wrapper">
                    <label className="label-input" htmlFor='inputEmail'>
                        Email
                    </label>
                    <input className={classNames('input', errorEmail ? 'error-input': '')}
                           type='email' name='inputEmail' id='inputEmail'
                           onChange={changeHandler}
                           placeholder='Введите email'
                           onInput={validationEmail} />
                    {errorEmail && <p className='error'>{errorEmail}</p>}
                </div>
                <div className="input-wrapper">
                    <label className="label-input" htmlFor='inputPassword'>
                        Пароль
                    </label>
                    <input className={classNames('input', errorPassword ? 'error-input': '')}
                           type='password' name='inputPassword' id='inputPassword'
                           onChange={changeHandler}
                           placeholder='Введите пароль'
                           onInput={validationPassword}/>
                    {errorPassword && <p className='error'>{errorPassword}</p>}
                </div>
                <Button name="Вход" onClick={handleLogin} disabled = { (errorEmail || errorPassword) ? true : false }/>
            </form>
        </div>
    );
}

export default Login;