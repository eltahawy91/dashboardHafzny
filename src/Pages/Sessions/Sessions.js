import { useEffect, useState } from "react";
import Sidebar from "../../Component/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import TableComponent from "../../Component/Table/Table";
import Header from "../../Component/Header/Header";
import deleteImg from "../../Component/img/material-symbols_delete.png";
import { fetchDataWithRetries } from "../../Component/function/FunctionApi";
import editImg from "../../Component/img/tabler_edit.png";
import Loading from "../../Component/Loading/loading";
import moment from "moment";
import NoDataImage from "../../Component/img/App Illustrations.jpg";

import "./Sessions.css";

function SessionsPage() {
  const [data, setData] = useState("");
  const [status, setStatus] = useState("");
  const [onSearchChange, setOnSearchChange] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login === null) {
      window.location.href = "/Dashboard";
    }
  }, []);

  useEffect(() => {
    fetchDataWithRetries("lectures", setData, setStatus);
  }, []);

  const arrayColum = [
    { teacher: "المعلم" },
    { student: "الطالب" },
    { start_time: "وقت البداء" },
    { end_time: "وقت الانتهاء" },
    { duration: "عدد الساعات" },
    { status: "الحاله" },
    { action: "عمليات" },
  ];

  function createData(
    id,
    teacher,
    student,
    start_time,
    end_time,
    duration,
    status,
    action
  ) {
    return {
      id,
      teacher,
      student,
      start_time,
      end_time,
      duration,
      status,
      action,
    };
  }

  function formatToArabicDate(date) {
    const formattedDate = moment(date).locale("ar").format("LLLL");
    return formattedDate;
  }

  const rows =
    data && data.lectures
      ? data.lectures.map((item) =>
          createData(
            item.id,
            item.teacher.name,
            item.student.name,
            formatToArabicDate(item.start_time),
            formatToArabicDate(item.end_time),
            item.duration,
            item.status,
            [deleteImg, editImg]
          )
        )
      : [];

  return (
    <div className="apDiv session">
      <Sidebar />
      <div className="body_container container" dir="rtl">
        <Header
          title="الجلسات"
          nameFunction={() => navigate("/Dashboard/AddSession")}
          onSearchChange={setOnSearchChange}
        />
        {uploadPercentage !== 0 && (
          <Loading UploadPercentage={uploadPercentage} />
        )}
        {data && data.lectures.length === 0 ? (
          <div className="noMassage">
            <img src={NoDataImage} alt="" />
            <h2>لا يوجد بيانات</h2>
          </div>
        ) : (
          <TableComponent
            arrayColum={arrayColum}
            rows={rows}
            hight={600}
            path="/Dashboard/Sessions"
            status={status}
            role_id={1}
            onSearchChange={onSearchChange}
            setUploadPercentage={setUploadPercentage}
          />
        )}
      </div>
    </div>
  );
}

export default SessionsPage;
