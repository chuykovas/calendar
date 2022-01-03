import React from 'react';
import Header from "../components/Header/Header";
import {Outlet} from "react-router-dom";

function Layout(props) {
    return (
        <div>
            <Header />
            <Outlet/>
        </div>
    );
}

export default Layout;