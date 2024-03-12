import { useEffect, useState } from "react";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Header from "../../Component/Header/Header";
import TableComponent from "../../Component/Table/Table";
import { fetchDataWithRetries } from "../../Component/function/FunctionApi";
import deleteImg from "../../Component/img/material-symbols_delete.png";
import editImg from "../../Component/img/tabler_edit.png";
import { TypeSend } from "../../Component/function/NotificationFunction/NotificationFunction";
import NoDataImage from "../../Component/img/App Illustrations.jpg";

import "./notifications.css";

function Notifications() {
  const [data, setData] = useState("");
  const [statuss, setStatus] = useState("");
  const [onSearchChange, setOnSearchChange] = useState("");

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login === null) {
      window.location.href = "/Dashboard";
    }
  }, []);

  useEffect(() => {
    fetchDataWithRetries("notifications", setData, setStatus);
  }, []);

  const arrayColum = [
    { title: "العنوان" },
    { message: "المحتوي" },
    { target_type: "الفئه المستهدفه" },
    { action: "عمليات" },
  ];

  function createData(id, title, message, target_type, action) {
    return { id, title, message, target_type, action };
  }

  const rows =
    data && data.notifications
      ? data.notifications.map((item) =>
          createData(item.id, item.title, item.message, item.target_type, [
            deleteImg,
            editImg,
          ])
        )
      : [];

  return (
    <div className="apDiv notifications">
      <Sidebar />
      <div className="body_container container" dir="rtl">
        <Header
          title="الاشعارات"
          nameFunction={() =>
            TypeSend("notifications", "/Dashboard/notifications")
          }
          onSearchChange={setOnSearchChange}
        />
        {data && data.notifications.length === 0 ? (
          <div className="noMassage">
            <img src={NoDataImage} alt="" />
            <h2>لا يوجد بيانات</h2>
          </div>
        ) : (
          <TableComponent
            arrayColum={arrayColum}
            rows={rows}
            hight={600}
            path="/Dashboard/notifications"
            onSearchChange={onSearchChange}
          />
        )}
      </div>
    </div>
  );
}

export default Notifications;
