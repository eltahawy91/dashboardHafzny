import { useEffect ,useState} from 'react';
import Sidebar from '../../Component/Sidebar/Sidebar';
import Header from "../../Component/Header/Header"
import TableComponent from "../../Component/Table/Table"
import { fetchDataWithRetries } from "../../Component/function/FunctionApi"
import deleteImg from "../../Component/img/material-symbols_delete.png";
import editImg from "../../Component/img/tabler_edit.png"
import NoDataImage from "../../Component/img/App Illustrations.jpg"
import "./Ratings.css"

function Ratings() {
    const [data, setData] = useState("")
    const [statuss, setStatus] = useState("")
    const [onSearchChange, setOnSearchChange] = useState("")

    useEffect(() => {
        const login = localStorage.getItem("login");
        if (login === null) {
            window.location.href = '/Dashboard';
        }
        }, []);

    useEffect(() => {
        fetchDataWithRetries("reviews", setData, setStatus)
    }, [])

    const arrayColum = [{ "user": "المستخدم" }, { "content": 'المحتوي' }, { "rating": "التقيم" }, { "lecture_id": "النوع" },  { "action": "عمليات" }]

    function createData(id,user, content, rating, lecture_id, action) {
        return { id ,user, content, rating, lecture_id, action };
    }

    const rows = data && data.reviews ?
        data.reviews.map(item => createData(item.id,item.user.name, item.content, item.rating, item.lecture_id || "معلم", [deleteImg, editImg])) :
    [];

    return (
        <div className="apDiv Ratings">
            <Sidebar/>
            <div className="body_container container" dir='rtl'>
                <Header title="التقيمات" isHide="true" onSearchChange={setOnSearchChange}/>
                { data && data.reviews.length === 0 ? (
                        <div className="noMassage">
                            <img src={NoDataImage}  alt=""/>
                            <h2>لا يوجد بيانات</h2>
                        </div>
                    ) : 
                    <TableComponent arrayColum={arrayColum} rows = {rows} hight = {600} path= "/Dashboard/Rating" onSearchChange = {onSearchChange} />
                }
            </div>
        </div>
    );
}

export default Ratings;
