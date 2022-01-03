import './App.css';
import Main from "./Pages/Main/Main";
import Login from "./Pages/Login/Login";
import {Route, Routes} from "react-router-dom";
import Layout from "./Pages/Layout/Layout";
import NotFound from "./Pages/NotFound/NotFound";
import Day from './Pages/day/Day';
import Group from './Pages/group/Group';
import {useAuth} from "./store/auth/useAuth";

function App() {
    const isLoading = useAuth();

    if(isLoading){
        return <div>Загрузка</div>
    }

    return (
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route index element={<Main/>}/>
                    <Route path='/:day' element={<Day/>}/>
                    <Route path='/:day/groups/:groupId' element={<Group />}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Route>
                <Route path={'/login/*'} element={<Login/>}/>
            </Routes>
    );
}
export default App;
