import { useEffect, useState } from 'react';
import Sidebar from '../../Component/Sidebar/Sidebar';
import Header from "../../Component/Header/Header"
import TableComponent from "../../Component/Table/Table"
import { fetchDataWithRetries } from "../../Component/function/FunctionApi"
import "./Admins.css"
import deleteImg from "../../Component/img/material-symbols_delete.png";
import editImg from "../../Component/img/tabler_edit.png"
import  {Users}   from "../../Component/function/UsersFunction/UsersFunction"
import Loading from "../../Component/Loading/loading"
import NoDataImage from "../../Component/img/App Illustrations.jpg"

function Admins() {
    const [data, setData] = useState("")
    const [status, setStatus] = useState("")
    const [onSearchChange, setOnSearchChange] = useState("")
    const [uploadPercentage, setUploadPercentage] = useState(0);

    
    useEffect(() => {
        const login = localStorage.getItem("login");
        if (login === null) {
            window.location.href = '/Dashboard';
        }
        }, []);
        
    useEffect(() => {
        fetchDataWithRetries("admins", setData, setStatus)
    }, [])

    const arrayColum = [{ "image": "الصوره" }, { "name": 'الاسم' }, { "phone": "رقم التلفون" }, { "email": "البريد الالكتروني" }, { "gender": "النوع" }, { "action": "عمليات" }]

    function createData(id,image, name, phone, email, gender, action) {
        return { id,image, name, phone, email, gender, action };
    }

    const rows = data && data.admins ?
        data.admins.map(item => createData(item.id,item.avatar, item.name, item.phone, item.email, item.gender, [deleteImg, editImg])) :
    [];

    return (
        <>
            <div className="apDiv admin">
                {uploadPercentage !== 0 && <Loading UploadPercentage ={uploadPercentage}/>}
                <Sidebar />
                <div className="body_container container" dir='rtl'>
                    <Header title="ادمن" nameFunction={() => Users("users" , 3 ,"/Dashboard/Admins" , setUploadPercentage)} onSearchChange={setOnSearchChange} />
                    {uploadPercentage !== 0 && <Loading UploadPercentage ={uploadPercentage}/>}
                    { data && data.admins.length === 0 ? (
                        <div className="noMassage">
                            <img src={NoDataImage}  alt=""/>
                            <h2>لا يوجد بيانات</h2>
                        </div>
                    ) : 
                   
                    <TableComponent arrayColum={arrayColum} rows={rows} hight={600} path= "/Dashboard/Admins" status={status} role_id={3} onSearchChange={onSearchChange} setUploadPercentage ={setUploadPercentage}/>
                }
                </div>
            </div>
        </>
    );
}

export default Admins;
