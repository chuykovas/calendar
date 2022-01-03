import  {useSelector, useDispatch} from 'react-redux';
import {useEffect} from "react";
import {startLoading, stopLoading, login} from "./slice";

export const saveToLocalStore = ({email, password}) => {
    localStorage.setItem('userData', JSON.stringify({
        userEmail: email
    }))
}

export const useAuth = () => {
   const isLoading = useSelector(state => state.auth.isLoading);
   const dispatch = useDispatch();
   useEffect(() =>{
       dispatch(startLoading());
       const data = JSON.parse(localStorage.getItem('userData'));
       if(data){
          dispatch(login({email: data.userEmail}));
       }
       dispatch(stopLoading());
   }, [])
    return isLoading;
}