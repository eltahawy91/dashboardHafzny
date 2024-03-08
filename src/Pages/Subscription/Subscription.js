import { useEffect, useState } from 'react';
import Sidebar from '../../Component/Sidebar/Sidebar';
import TableComponent from "../../Component/Table/Table"
import Header from "../../Component/Header/Header"
import deleteImg from "../../Component/img/material-symbols_delete.png";
import { fetchDataWithRetries } from "../../Component/function/FunctionApi"
import editImg from "../../Component/img/tabler_edit.png"
import moment from 'moment';
import NoDataImage from "../../Component/img/App Illustrations.jpg"

import "./Subscription.css"

function Subscription() {
    const [data, setData] = useState("")
    const [status, setStatus] = useState("")
    const [onSearchChange, setOnSearchChange] = useState("")


    useEffect(() => {
        const login = localStorage.getItem("login");
        if (login === null) {
            window.location.href = '/Dashboard';
        }
        }, []);

    useEffect(() => {
        fetchDataWithRetries("subscriptions", setData, setStatus)
    }, [])

    const arrayColum = [{ "user": "المستخدم" }, { "plan": 'الباقه' }, { "start_date": "تاريخ البداء" }, { "end_date": "تاريخ الانتهاء" }, { "payment_method": "طريقه الدفع" },{ "payment_status": "حاله الدفع" },{ "action": "عمليات" }]


    
    function createData(id ,user, plan, start_date, end_date, payment_method,payment_status , action) {
        return { id ,user, plan, start_date, end_date, payment_method, payment_status, action };
    }

    
    function formatToArabicDate(date) {
        const formattedDate = moment(date).locale('ar').format('LLLL');
        return formattedDate;
    }

    const rows = data && data.subscriptions ?
        data.subscriptions.map(item => createData(item.id,item.user.name, item.plan.name, formatToArabicDate(item.start_date), formatToArabicDate(item.end_date), item.payment_method, item.payment_status, [deleteImg, editImg])) :
    [];
    return (
        <div className="apDiv subscription">
            <Sidebar/>
            <div className="body_container container" dir='rtl'>
                <Header title="الاشتراكات" isHide="true" onSearchChange={setOnSearchChange} />
                { data && data.subscriptions.length === 0 ? (
                        <div className="noMassage">
                            <img src={NoDataImage}  alt=""/>
                            <h2>لا يوجد بيانات</h2>
                        </div>
                    ) : 
                    <TableComponent arrayColum={arrayColum} rows = {rows} hight = {600} path= "/Dashboard/subscription" status={status} onSearchChange={onSearchChange} />
                }
            </div>
        </div>
    )
}

export default Subscription;
