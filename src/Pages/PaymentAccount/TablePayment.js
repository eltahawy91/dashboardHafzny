import {
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {
  fetchDataWithRetries,
  postData,
  putData,
} from "../../Component/function/FunctionApi";

import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import { Form } from "react-bootstrap";
import Currency from "./PaymentAccount";
import { Delete } from "../../Component/function/Delete/DeletCondition";
import { Users } from "../../Component/function/UsersFunction/UsersFunction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Delete } from "../function/Delete/DeletCondition";

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

const TablePayment = (props) => {
  const [amount, setAmount] = useState("");

  const [error, setError] = useState("");
  const [crWalletBalance, setCrWalletBalance] = useState("");
  const [wallet_id, setWallet_id] = useState("");
  const params = useParams();
  const [user_id, setUser_id] = useState("");
  //////////
  const [accountNumber, setAccountNumber] = useState("");
  const [exipirationDate, setExpirationDate] = useState("");
  const [cardholderName, setCardHolderName] = useState("");
  const [routingNum, setRoutingNum] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [statusAcc, setStatusAcc] = useState("active");
  const [accountType, setAccountType] = useState("");
  const [cardType, setCardType] = useState(null);
  const [bankName, setBankName] = useState("");
  const [comments, setComments] = useState("");

  const createWallet = () => {
    const postedTeacher = {
      user_id: params.ID,
      wallet_id: wallet_id,
      balance: crWalletBalance,
      paypal_email: "sasda@gmail.com",
    };
    if (postedTeacher.user_id === params.ID) {
      Swal.fire({
        title: "! حدث خطأ",
        text: "تم انشاء محفظتك بالفعل ",
        icon: "error",
      });
    } else {
      postData(`wallet`, postedTeacher, setError, setStatus);
      setAmount("");

      Swal.fire({
        text: "تم انشاء محفظتك بنجاح ",
        icon: "success",
      });
    }
  };

  const [status, setStatus] = useState("");
  const [payment_account_id, setPayment_account_id] = useState("");
  const [paymentAcount, setPaymentAcount] = useState("");
  const [users, setUsers] = useState("");
  const [userid, setuserId] = useState("");
  const [payid, setPayId] = useState("");
  useEffect(() => {
    fetchDataWithRetries(
      `payment-accounts`,
      setPaymentAcount,
      setStatus,
      setError
    );
  }, []);
  useEffect(() => {
    fetchDataWithRetries(`users`, setUsers, setStatus, setError);
  }, []);

  useEffect(() => {
    if (users.users && paymentAcount) {
      const matchedUserIds = paymentAcount
        .filter((col) => users.users.some((user) => col.user_id === user.id))
        .map((col) => col.user_id);
      setuserId(matchedUserIds);
    }
  }, [users.users, paymentAcount]);

  const getId = (id, wallId, amount, payment_account_id) => {
    console.log(wallId);
    setWallet_id(wallId);
    setAmount(amount);
    setPayment_account_id(payment_account_id);
    setUser_id(id);
    handleOpen();
  };
  const getIdpayment = (id) => {
    console.log(id);
    setPayId(id);
    handleOpenPayment();
  };
  const navigate = useNavigate();
  useEffect(() => {
    fetchDataWithRetries(
      `payment-accounts`,
      setPaymentAcount,
      setStatus,
      setError
    );
  }, []);
  console.log(paymentAcount);
  const [getaccNumber, setGetAccNumber] = useState("");
  useEffect(() => {
    if (paymentAcount.length > 0) {
      const filteredData = paymentAcount.filter((item) => item.id === payid);
      console.log(filteredData[0]);
      setGetAccNumber(filteredData[0]?.account_number);
    }
  }, [paymentAcount, payid]);

  const editPayment = async (e) => {
    e.preventDefault();
    try {
      const postPayment = {
        account_number: accountNumber,
      };
      await putData(`payment-accounts/${payid}`, postPayment);
      setEditPayment(false);
      Swal.fire({
        text: "تم التعديل بنجاح     ",
        icon: "success",
        showConfirmButton: false,
      });
      setStatus("Success");
      navigate("/Dashboard/paymentAccount");
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  // {
  //   users.users &&
  //     users.users.map((s) => (
  //       <>
  //         <option value={s.id}>{s.name}</option>
  //       </>
  //     ));
  // }

  const addpayment_accounts = async (e) => {
    e.preventDefault();
    try {
      const postPayment = {
        user_id: cardholderName,
        account_number: accountNumber,
        expiration_date: exipirationDate,
        cardholder_name: cardholderName,
        routing_num: routingNum,
        payment_method: paymentMethod,
        status: statusAcc,
        account_type: accountType,
        bank_name: bankName,
        comments: comments,
        cardType: cardType,
      };

      if (user_id === "285") {
        Swal.fire({
          title: "تم انشاء الحساب من قبل ",
        });
      } else {
        await postData(`payment-accounts`, postPayment);
      }

      setOpen(false);
      navigate("/Dashboard/paymentAccount");
      window.location.reload();
      Swal.fire({
        text: "تم انشاء الحساب     ",
        icon: "success",
        showConfirmButton: false,
      });
      setStatus("Success");
    } catch (error) {
      setError(error.message);
      setStatus("Error");
    }
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  ////// modal transaction
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [editPyment, setEditPayment] = React.useState(false);
  const [accId, setAccId] = useState("");
  const handleOpenPayment = (id) => {
    // console.log(id);
    setEditPayment(true);
  };
  const handleClosePayment = () => {
    setEditPayment(false);
  };

  const headTable = [
    {
      id: "رقم المستخدم",
      account_number: "رقم الحساب ",
      expirationDate: "تاريخ الانتهاء",
      cardholderName: "اسم صاحب البطاقة ",
      bankName: "اسم البنك",
      // routingNum: "رقم البنك",
      // paymentMethod: "طريقة الدفع ",
      // cardType: "نوع البطاقة",
      // status: "حالة البطاقة",
    },
  ];

  // const d = walletData && walletData.map((s) => console.log(s.user));
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: props.hight }}>
          <div style={{ display: "flex" }}>
            <div className="btn-Converter">
              <Button style={{ marginRight: "0px" }} onClick={() => getId()}>
                انشاء حساب{" "}
              </Button>{" "}
            </div>
          </div>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              {headTable &&
                headTable.map((header) => (
                  <TableRow>
                    <TableCell>{header.id}</TableCell>
                    <TableCell>{header.account_number}</TableCell>
                    <TableCell>{header.expirationDate}</TableCell>
                    <TableCell>{header.cardholderName}</TableCell>
                    <TableCell>{header.bankName}</TableCell>
                    {/* <TableCell>{header.routingNum}</TableCell> */}
                    {/* <TableCell>{header.status}</TableCell> */}
                    {/* <TableCell>{header.paymentMethod}</TableCell> */}
                    {/* <TableCell>{header.cardType}</TableCell> */}
                    <TableCell></TableCell>
                  </TableRow>
                ))}
            </TableHead>
            <TableBody>
              {paymentAcount &&
                paymentAcount.map((col) => (
                  <>
                    <TableRow>
                      <TableCell>{col.user_id}</TableCell>
                      <TableCell>{col.account_number}</TableCell>
                      <TableCell>{col.expiration_date}</TableCell>
                      <TableCell>{col.cardholder_name}</TableCell>
                      <TableCell>{col.bank_name}</TableCell>

                      <TableCell>
                        <div
                          className="btn-Converter"
                          style={{ display: "flex" }}
                        >
                          <Button
                            style={{ marginRight: "3px" }}
                            variant="danger"
                            onClick={() => Delete(col.id, props.path)}
                          >
                            <i class="fa-solid fa-trash"></i>
                          </Button>
                          <Button
                            style={{ marginRight: "3px" }}
                            variant="danger"
                            onClick={() => getIdpayment(col.id)}
                          >
                            <i class="fa-solid fa-pen-to-square"></i>{" "}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Form onSubmit={addpayment_accounts}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
                <input
                  style={{ width: "42%" }}
                  type="date"
                  id="date"
                  value={exipirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  placeholder="تاريخ الانتهاء "
                />
                <select onChange={(e) => setCardHolderName(e.target.value)}>
                  <option disabled selected>
                    اسم صاحب البطاقة
                  </option>
                  {users.users &&
                    users.users.map((s) => (
                      <>
                        <option value={s.id}>{s.name}</option>
                      </>
                    ))}
                </select>
                {/* <input
                  style={{ width: "42%" }}
                  type="text"
                  id="accountNum"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder=" رقم الحساب "
                /> */}

                <input
                  type="text"
                  id="cardHolderName"
                  style={{ width: "42%" }}
                  value={cardholderName}
                  onChange={(e) => setCardHolderName(e.target.value)}
                  placeholder="الرقم الخاص "
                />
                <input
                  type="text"
                  id="routingNum"
                  style={{ width: "42%" }}
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder=" رقم البنك"
                />

                <select onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value={"طريقة الدفع"} disabled selected>
                    طريقة الدفع{" "}
                  </option>
                  <option value={"credit_card"}>كارت ائتمان</option>
                  <option value={"bank_transfer "}>تحويل بنكي</option>
                  <option value={"paypal "}>بايبال</option>
                  <option value={"stripe "}>سترايب</option>
                  <option value={"mobile_cash "}>تحويل كاش</option>
                  <option value={"other "}>طريقة اخري</option>
                </select>

                <select onChange={(e) => setAccountType(e.target.value)}>
                  <option value={"حاله الحساب"} disabled selected>
                    حالة الحساب
                  </option>
                  <option value={"checking"}>تم الفحص</option>
                  <option value={"saving "}>تم الحفظ</option>
                  <option value={"business "}>اعمال</option>
                  <option value={"personal "}>شخصي</option>
                </select>
                <select onChange={(e) => setCardType(e.target.value)}>
                  <option value={"نوع البطاقة "} disabled selected>
                    نوع البطاقه{" "}
                  </option>
                  <option value={"visa "}>فيزا </option>
                  <option value={"MasterCard"}>ماستر كارد </option>
                  <option value={"American Express "}>امريكان اكسبريس</option>
                  <option value={"Discover "}>ديسكفر </option>
                </select>

                <select onChange={(e) => setStatusAcc(e.target.value)}>
                  <option value={"حالة الحساب "} disabled selected>
                    حالة الحساب{" "}
                  </option>
                  <option value={"active "}>مفعل </option>
                  <option value={"inactive"}>غير مفعل </option>
                  <option value={"susepend "}>معلق</option>
                </select>

                <input
                  type="text"
                  id="bankName"
                  style={{ width: "42%" }}
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder=" اسم البنك "
                />
                <input
                  type="text"
                  id="comments"
                  style={{ width: "100%" }}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder=" اترك تعليق "
                />
              </div>
              <button
                type="submit"
                style={{ marginTop: "10px" }}
                className="addIcon"
                // onClick={() => transFunctio(userId)}
              >
                اضافة
              </button>
            </Form>
          </Box>
        </Modal>
        <Modal
          open={editPyment}
          onClose={handleClosePayment}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style }}>
            <Form onSubmit={(e) => editPayment(e)}>
              <input
                style={{ width: "100%" }}
                type="text"
                id="accountNum"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder={getaccNumber || " رقم الحساب "}
              />
              <button
                type="submit"
                style={{ marginTop: "45px" }}
                className="addIcon"
              >
                {" "}
                تعديل
              </button>
            </Form>
          </Box>
        </Modal>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default TablePayment;
