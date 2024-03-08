import { useEffect, useState } from "react";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Header from "../../Component/Header/Header";
import TableComponent from "../../Component/Table/Table";
import {
  fetchDataWithRetries,
  postData,
} from "../../Component/function/FunctionApi";
import deleteImg from "../../Component/img/material-symbols_delete.png";
import editImg from "../../Component/img/tabler_edit.png";
import { Users } from "../../Component/function/UsersFunction/UsersFunction";
import Loading from "../../Component/Loading/loading";
import NoDataImage from "../../Component/img/App Illustrations.jpg";

import "./Teacher.css";
import { Button } from "react-bootstrap";

function Teacher() {
  const [data, setData] = useState("");
  const [setStatus] = useState("");
  const [onSearchChange, setOnSearchChange] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login === null) {
      window.location.href = "/Dashboard";
    }
  }, []);

  useEffect(() => {
    fetchDataWithRetries("teachers", setData, setStatus);
  }, []);

  const arrayColum = [
    { image: "الصوره" },
    { id: " المستخدم_id" },
    { name: "الاسم" },
    { phone: "رقم التلفون" },
    { email: "البريد الالكتروني" },
    { moreInfo: "عرض معلومات" },
    { gender: "النوع" },
    { action: "عمليات" },
    { activation: "تفعيل" },
  ];

  function createData(
    id,
    image,
    name,
    phone,
    email,
    gender,
    action,
    moreInfo,
    activation
  ) {
    return {
      id,
      image,
      name,
      phone,
      email,
      gender,
      action,
      moreInfo,
      activation,
    };
  }

  const [activationTeacher, setActivationTeacher] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [id, setId] = useState("");
  const rows =
    data && data.teachers
      ? data.teachers.map((item) =>
          createData(
            item.id,
            item.avatar,
            item.name,
            item.phone,
            item.email,
            item.gender,
            [deleteImg, editImg],
            "عرض معلومات",
            <>
              <Button onClick={() => activationFunction(item.id)}>
                {isActive ? "تفعيل" : "تعطيل"}
              </Button>
            </>
          )
        )
      : [];

  const activationFunction = async (id) => {
    console.log(id);
    const active = {
      isActive: !isActive,
    };
    setIsActive(!isActive);
    await postData(
      `users/${id}/activation`,
      active,
      setActivationTeacher,
      setStatus
    );
  };
  return (
    <div className="apDiv teacher">
      <Sidebar />
      <div className="body_container container" dir="rtl">
        <Header
          title="المعلمون"
          nameFunction={() =>
            Users("users", 2, "/Dashboard/teacher", setUploadPercentage)
          }
          onSearchChange={setOnSearchChange}
        />
        {uploadPercentage !== 0 && (
          <Loading UploadPercentage={uploadPercentage} />
        )}
        {data && data.teachers.length === 0 ? (
          <div className="noMassage">
            <img src={NoDataImage} alt="" />
            <h2>لا يوجد بيانات</h2>
          </div>
        ) : (
          <TableComponent
            arrayColum={arrayColum}
            rows={rows}
            hight={600}
            path="/Dashboard/teacher"
            role_id={2}
            onSearchChange={onSearchChange}
            setUploadPercentage={setUploadPercentage}
          />
        )}
      </div>
    </div>
  );
}

export default Teacher;
