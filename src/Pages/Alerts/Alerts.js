import { useEffect, useState } from 'react';
import Sidebar from '../../Component/Sidebar/Sidebar';
import Header from "../../Component/Header/Header"
import TableComponent from "../../Component/Table/Table"
import { fetchDataWithRetries } from "../../Component/function/FunctionApi"
import deleteImg from "../../Component/img/material-symbols_delete.png";
import editImg from "../../Component/img/tabler_edit.png"
import NoDataImage from "../../Component/img/App Illustrations.jpg"
import "./Alerts.css"

function Alerts() {
    const [data, setData] = useState("")
    const [status, setStatus] = useState("")
    const [onSearchChange, setOnSearchChange] = useState("")


    useEffect(() => {
        fetchDataWithRetries("alerts", setData, setStatus)
    }, [])
    
    useEffect(() => {
        const login = localStorage.getItem("login");
        if (login === null) {
            window.location.href = '/Dashboard';
        }
        }, []);

    const arrayColum = [{ "user": "المستخدم" }, { "message": 'الرساله' }, { "read": "تم القراءه" }, { "action": "عمليات" }]

    function createData(id,user, message, read, action) {
        return { id,user, message, read, action };
    }

    const rows = data && data.alerts ?
        data.alerts.map(item => createData(item.id, item.user.name, item.message, item.read, [deleteImg, editImg])) :
    [];

    return (
        <>
            <div className="apDiv alerts">
                <Sidebar />
                <div className="body_container container" dir='rtl'>
                    <Header title="التنبيهات" isHide="true" onSearchChange={setOnSearchChange} />
                    { data && data.alerts.length === 0 ? (
                        <div className="noMassage">
                            <img src={NoDataImage}  alt=""/>
                            <h2>لا يوجد بيانات</h2>
                        </div>
                    ) : 
                    <TableComponent arrayColum={arrayColum} rows={rows} hight={600} path= "/Dashboard/alerts" onSearchChange={onSearchChange}/>
                }
                </div>
            </div>
        </>
    );
}

export default Alerts;
