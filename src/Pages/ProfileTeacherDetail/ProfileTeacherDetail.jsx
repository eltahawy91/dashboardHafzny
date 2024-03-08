import React, { useEffect, useState } from "react";
import "./profileTeacherDetail.css";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Header from "../../Component/Header/Header";

import { Users } from "../../Component/function/UsersFunction/UsersFunction";
import { Link, useParams } from "react-router-dom";
import {
  fetchDataWithRetries,
  putData,
} from "../../Component/function/FunctionApi";
import noResultFount from "../../Component/img/noResultFounded.png";
import TeacherTransactions from "../TransactionTeacher/TeacherTransactions";
import TableTeacherTransaction from "../TransactionTeacher/TableteacherTransactions";
import { Button, Modal } from "react-bootstrap";

import deleteImg from "../../Component/img/material-symbols_delete.png";
import editImg from "../../Component/img/tabler_edit.png";
import { Box } from "@mui/material";
import Swal from "sweetalert2";
const ProfileTeacherDetail = () => {
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [onSearchChange, setOnSearchChange] = useState("");

  const [Tbalance, setTbalance] = useState("");
  const [userId, setUserID] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("withdraw");
  const [currency, setCurrency] = useState("SAR");
  const [error, setError] = useState("");
  const params = useParams();

  // console.log(params.TeacherId);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const [walletId, setWalletId] = useState("");

  const transFunctio = async () => {
    try {
      let updatedBalance;
      if (transactionType === "deposit") {
        updatedBalance = Tbalance - amount;
      } else if (transactionType === "withdraw") {
        updatedBalance = +Tbalance + +amount;
      }

      if (updatedBalance < 0) {
        // updatedBalance = 0;
        setTbalance(0);
        Swal.fire({
          text: "عذرا ! رصيدك اقل من 0 ريال سعودي",
          icon: "error",
        });
      }
      setTbalance(updatedBalance);
      const postedTeacher = {
        balance: updatedBalance,
        currency: currency,
      };
      await putData(`wallet/${walletId}`, postedTeacher);
      setStatus("Success");
    } catch (error) {
      setError(error.message);
      setStatus("Error");
    }
  };
  ////// modal transaction
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [teacherData, setTeacherData] = useState("");

  useEffect(() => {
    fetchDataWithRetries(
      `teacher-profiles/user/${params.TeacherId}`,
      setTeacherData
    );
  }, []);

  const data = teacherData ? teacherData.teacherProfile.user : "";
  const [transaction, setTransactions] = useState("");
  const [transactionTeacher, setTransactionsTeacher] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    fetchDataWithRetries(
      `transactions/user/${params.TeacherId}`,
      setTransactionsTeacher,
      setStatus
    );
    fetchDataWithRetries("transactions", setTransactions, setStatus);
  }, []);
  // console.log(transaction.transactions);
  const arrayColum = transaction.transactions;

  function createData(id, image, name, phone, email, gender, action) {
    return { id, image, name, phone, email, gender, action };
  }

  const rows =
    data && data.admins
      ? data.admins.map((item) =>
          createData(
            item.id,
            item.avatar,
            item.name,
            item.phone,
            item.email,
            item.gender,
            [deleteImg, editImg]
          )
        )
      : [];

  console.log(data);

  return (
    <div className="apDiv teacher">
      <Sidebar />
      {teacherData ? (
        <div className="body_container container" dir="rtl">
          <Header
            title="المعلمون"
            nameFunction={() =>
              Users("users", 2, "/Dashboard/teacher", setUploadPercentage)
            }
            onSearchChange={setOnSearchChange}
          />
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-4">
                <div className="card mb-4">
                  <div className="card-body text-center">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      alt="avatar"
                      className="rounded-circle img-fluid teacher-img"
                    />
                    <h5 className="my-3"> {data.name}</h5>

                    <div className="d-flex justify-content-center mb-2">
                      <button
                        type="button"
                        className="btn btn-outline-primary ms-1"
                      >
                        الرصيد الكلي ( 100.00 ر.س )
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card mb-4">
                  <div
                    className="card-body"
                    style={{
                      display: "flex",
                      justifyContent: "right",
                      gap: "90px",
                    }}
                  >
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">الاسم بالكامل</p>
                        <p className="text-muted mb-0">{data.name}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">البريد الالكتروني</p>
                        <p className="text-muted mb-0">{data.email}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">رقم الهاتف</p>
                        <p className="text-muted mb-0"> {data.phone}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">النوع</p>
                        <p className="text-muted mb-0"> {data.gender}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <TableTeacherTransaction
                arrayColum={arrayColum}
                rows={rows}
                hight={600}
                path="/Dashboard/Transactions"
                status={status}
                role_id={3}
              />
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", margin: "auto" }}>
          <h1> لايوجد بيانات لهذا المعلم </h1>
          <img
            src={noResultFount}
            style={{ width: "50%" }}
            alt="no result found"
          />
        </div>
      )}
    </div>
  );
};

export default ProfileTeacherDetail;
