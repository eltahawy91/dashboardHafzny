import { useEffect, useState } from 'react';
import Sidebar from '../../Component/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import TableComponent from "../../Component/Table/Table"
import Header from "../../Component/Header/Header"
import deleteImg from "../../Component/img/material-symbols_delete.png";
import { fetchDataWithRetries } from "../../Component/function/FunctionApi"
import editImg from "../../Component/img/tabler_edit.png"
import NoDataImage from "../../Component/img/App Illustrations.jpg"

import "./PrivatePages.css"

function TablePrivatePage() {
    const [data, setData] = useState("")
    const [status, setStatus] = useState("")
    const [onSearchChange, setOnSearchChange] = useState("")
    const navigate = useNavigate();

    
    useEffect(() => {
        const login = localStorage.getItem("login");
        if (login === null) {
            window.location.href = '/Dashboard';
        }
        }, []);

    useEffect(() => {
        fetchDataWithRetries("pages", setData, setStatus)
    }, [])

    const arrayColum = [{ "title": "العنوان" }, { "content": 'محتوي الصفحه' }, { "status": "الحاله" }, { "action": "عمليات" }]

    function createData(id ,title, content, status, action) {
        return { id ,title, content, status, action };
    }

    const rows = data && data.pages
    ? data.pages.map(item => {
        const contentText = new DOMParser().parseFromString(item.content, 'text/html').body.textContent;
        return createData(item.id, item.title, contentText, item.status, [deleteImg, editImg]);
    })
    : [];

    return (
        <div className="apDiv privatePages">
            <Sidebar/>
            <div className="body_container container" dir='rtl'>
                <Header title="الصفحات الخاصه" nameFunction={() => navigate("/Dashboard/privatePages")} onSearchChange={setOnSearchChange}/>
                { data && data.pages.length === 0 ? (
                        <div className="noMassage">
                            <img src={NoDataImage}  alt=""/>
                            <h2>لا يوجد بيانات</h2>
                        </div>
                    ) : 
                    <TableComponent arrayColum={arrayColum} rows = {rows} hight = {600} path= "/Dashboard/mainPrivatePages" status={status} onSearchChange={onSearchChange}/>
                }
            </div>
        </div>
    )
}

export default TablePrivatePage;
