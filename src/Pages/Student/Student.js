import { useEffect, useState } from 'react';
import Sidebar from '../../Component/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import TableComponent from "../../Component/Table/Table"
import Header from "../../Component/Header/Header"
import deleteImg from "../../Component/img/material-symbols_delete.png";
import { fetchDataWithRetries } from "../../Component/function/FunctionApi"
import editImg from "../../Component/img/tabler_edit.png"
import  {Users}   from "../../Component/function/UsersFunction/UsersFunction"
import Loading from "../../Component/Loading/loading"
import NoDataImage from "../../Component/img/App Illustrations.jpg"
import "./Student.css"


function Student() {
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
        fetchDataWithRetries("students", setData, setStatus)
    }, [])

    const arrayColum = [{ "image": "الصوره" }, { "name": 'الاسم' }, { "phone": "رقم التلفون" }, { "email": "البريد الالكتروني" }, { "gender": "النوع" }, { "action": "عمليات" }]

    function createData(id ,image, name, phone, email, gender, action) {
        return { id ,image, name, phone, email, gender, action };
    }

    const rows = data && data.students ?
        data.students.map(item => createData(item.id,item.avatar, item.name, item.phone, item.email, item.gender, [deleteImg, editImg])) :
    [];
    
    return (
        <div className="apDiv student">
            <Sidebar/>
            <div className="body_container container" dir='rtl'>
                <Header title="الطلاب" nameFunction={() => Users("users" , 1, "/Dashboard/Student", setUploadPercentage )} onSearchChange={setOnSearchChange}/>
                {uploadPercentage !== 0 && <Loading UploadPercentage ={uploadPercentage}/>}
                { data && data.students.length === 0 ? (
                        <div className="noMassage">
                            <img src={NoDataImage}  alt=""/>
                            <h2>لا يوجد بيانات</h2>
                        </div>
                    ) : 
                    <TableComponent arrayColum={arrayColum} rows = {rows} hight = {600} path= "/Dashboard/Student" status={status} role_id={1} onSearchChange={onSearchChange} setUploadPercentage ={setUploadPercentage} />
                }
            </div>
        </div>
    )
}

export default Student;
