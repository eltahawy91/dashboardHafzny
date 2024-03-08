import { useEffect } from 'react';
import Sidebar from '../../Component/Sidebar/Sidebar';
import Header from "../../Component/Header/Header"
import CardUsersPaths from "../../Component/CardUsersPaths/CardUsersPaths"
import  {Paths}   from "../../Component/function/UserPaths/UsersPathsfunction"

import "./UsersPaths.css"

function UsersPaths() {

    useEffect(() => {
        const login = localStorage.getItem("login");
        if (login === null) {
            window.location.href = '/Dashboard';
        }
        }, []);
    
    return (
        <div className="apDiv usersPaths">
            <Sidebar/>
            <div className="body_container container" dir='rtl'>
                <Header title="التفضيلات التعليمية" nameFunction={() => Paths("paths")}/>
                <CardUsersPaths/>
            </div>
        </div>
    );
}

export default UsersPaths;
