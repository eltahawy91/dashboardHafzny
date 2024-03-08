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
import Currency from "./Currency";
import { Delete } from "../../Component/function/Delete/DeletCondition";
import { Users } from "../../Component/function/UsersFunction/UsersFunction";
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

const TableCurrency = (props) => {
  const [openWallet, setOpenWallet] = React.useState(false);
  const handleOpenWallet = () => {
    setOpenWallet(true);
  };
  const handleCloseWallet = () => {
    setOpenWallet(false);
  };

  const [statuss, setStatuss] = useState("");
  const [Tbalance, setTbalance] = useState("");
  const [userId, setUserID] = useState("");
  const [amount, setAmount] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [transactionType, setTransactionType] = useState("transfer");
  const [error, setError] = useState("");
  const [wallet, setWallet] = useState("");
  const [crWalletBalance, setCrWalletBalance] = useState("");
  const [walletId, setWalletId] = useState("");
  const [wallet_id, setWallet_id] = useState("");
  const [user_id, setUser_id] = useState("");

  const params = useParams();

  // console.log(params);
  const [editPyment, setEditPayment] = React.useState(false);
  const [accId, setAccId] = useState("");
  const handleOpenPayment = (id) => {
    // console.log(id);
    setEditPayment(true);
  };
  const handleClosePayment = () => {
    setEditPayment(false);
  };
  const [payid, setPayId] = useState("");

  const getIdpayment = (id) => {
    console.log(id);
    setPayId(id);
    handleOpenPayment();
  };
  const [codeWal, setGetCodeWall] = useState("");
  const [nameWal, setGetNameWall] = useState("");
  const [symbolWal, setGetSymbolWall] = useState("");

  const editPayment = async (e) => {
    e.preventDefault();
    try {
      const postPayment = {
        code: code,
        name: name,
        symbol: symbol,
      };
      await putData(`currencies/${payid}`, postPayment);
      setEditPayment(false);
      Swal.fire({
        text: "تم التعديل بنجاح     ",
        icon: "success",
        showConfirmButton: false,
      });
      setStatus("Success");
      navigate("/Dashboard/currency");
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

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
  const [wallettransaction, setWalletTransaction] = useState("");
  const [transactionData, setTransactionData] = useState("");
  const [currencyData, setCurrency] = useState("");
  const [walletData, setWalletData] = useState("");
  const [users, setUsers] = useState("");
  const [trans, setTransa] = useState("");
  const [status, setStatus] = useState("");
  const [payment_account_id, setPayment_account_id] = useState("");
  const [payment_method, setpayment_method] = useState("");
  const [cardType, setCardType] = useState("");
  const [currencies, setCurrencies] = useState("");

  useEffect(() => {
    fetchDataWithRetries("currencies", setCurrency, setStatus);
  }, []);
  console.log(currencyData);
  // console.log(transactionData);
  useEffect(() => {
    fetchDataWithRetries(`wallet`, setWalletData, setStatus, setError);
    fetchDataWithRetries(`transactions`, setTransa, setStatus, setError);
    fetchDataWithRetries(`currencies`, setCurrencies, setStatus, setError);
    console.log(currencies);

    fetchDataWithRetries(`wallet`, setWalletId, setStatus, setError);
    fetchDataWithRetries(`users`, setUsers, setStatus, setError);
    const balance = wallet && wallet.balance;
    if (balance !== undefined && balance !== null) {
      setTbalance(balance);
      // console.log(balance);
    } else {
      console.error("Wallet balance is undefined or null");
    }
    console.log(wallet && wallet.id);
    setWalletId(wallet && wallet.id);
  }, []);

  useEffect(() => {
    if (currencies.length > 0) {
      const filteredData = currencies.filter((item) => item.id === payid);
      console.log(filteredData[0]);
      setGetCodeWall(filteredData[0]?.code);
      setGetNameWall(filteredData[0]?.name);
      setGetSymbolWall(filteredData[0]?.symbol);
    }
  }, [currencies, payid]);

  // console.log(walletId);
  const getId = (id, wallId, amount, payment_account_id) => {
    console.log(wallId);
    setWallet_id(wallId);
    setAmount(amount);
    setPayment_account_id(payment_account_id);
    setUser_id(id);
    handleOpen();
  };
  const navigate = useNavigate();
  const EditFunction = async (id) => {
    if (props.path === "/Dashboard/currency") {
      navigate(`/Dashboard/currency/${id.id}`);
    } else {
      Edit(id);
    }
  };

  const Edit = async (row) => {
    Users(
      `users/${row.id}`,
      props.role_id,
      props.path,
      props.setUploadPercentage,
      row
    );
  };

  const addCurrency = async (e) => {
    e.preventDefault();
    try {
      const postCurrency = {
        code: code,
        name: name,
        symbol: symbol,
        payment_method: payment_method,
        cardType: cardType,
      };

      await postData(`currencies`, postCurrency);
      setCode("");
      setName("");
      setSymbol("");
      setOpen(false);
      Swal.fire({
        text: "تمت اضافة العملة     ",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/Dashboard/currency");
      window.location.reload();
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

  const headTable = [
    {
      id: " رقم العملة   ",
      code: "كود العملة   ",
      name: "اسم العملة    ",
      symbol: "رمز العملة ",
    },
  ];

  // const d = walletData && walletData.map((s) => console.log(s.user));
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: props.hight }}>
          <div style={{ display: "flex" }}>
            <div className="btn-Converter">
              <Button onClick={() => getId()}>انشاء عملة </Button>{" "}
            </div>
          </div>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              {headTable &&
                headTable.map((header) => (
                  <TableRow>
                    <TableCell>{header.id}</TableCell>
                    <TableCell>{header.code}</TableCell>
                    <TableCell>{header.name}</TableCell>
                    <TableCell>{header.symbol}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
            </TableHead>
            <TableBody>
              {currencyData &&
                currencyData.map((col) => (
                  <>
                    <TableRow>
                      <TableCell>{col.id}</TableCell>
                      <TableCell>{col.code}</TableCell>
                      <TableCell>{col.name}</TableCell>
                      <TableCell>{col.symbol}</TableCell>

                      <TableCell>
                        <div
                          className="btn-Converter"
                          style={{ display: "flex" }}
                        >
                          <Button
                            variant="danger"
                            onClick={() => Delete(col.id, props.path)}
                          >
                            <i class="fa-solid fa-trash"></i>
                          </Button>
                          <Button
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

        {/* ///// edit modal cuurncy */}

        <Modal
          open={editPyment}
          onClose={handleClosePayment}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Form onSubmit={(e) => editPayment(e)}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                {" "}
                <input
                  type="text"
                  id="code"
                  style={{ width: "100%" }}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={codeWal || " كود العملة "}
                />
                <input
                  type="text"
                  id="name"
                  style={{ width: "100%" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={nameWal || "اسم العملة"}
                />
                <input
                  type="text"
                  id="symbol"
                  style={{ width: "100%" }}
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  placeholder={symbolWal || "رمز العملة"}
                />
              </div>
              <button
                type="submit"
                style={{ marginTop: "10px" }}
                className="addIcon"
                // onClick={() => transFunctio(userId)}
              >
                تعديل
              </button>
            </Form>
          </Box>
        </Modal>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Form onSubmit={addCurrency}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                {" "}
                <input
                  type="text"
                  id="code"
                  style={{ width: "100%" }}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder=" كود العملة "
                />
                <input
                  type="text"
                  id="name"
                  style={{ width: "100%" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder=" اسم العملة "
                />
                <input
                  type="text"
                  id="symbol"
                  style={{ width: "100%" }}
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  placeholder=" رمز العملة "
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
          open={openWallet}
          onClose={handleCloseWallet}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style }}>
            <input
              type="text"
              id="amount"
              value={crWalletBalance}
              onChange={(e) => setCrWalletBalance(e.target.value)}
              placeholder=" ادخل المبلغ"
            />
            <input
              type="text"
              id="userId"
              value={params.ID}
              placeholder=" كود المستخدم"
            />
            <button
              type="submit"
              style={{ marginTop: "45px" }}
              className="addIcon"
              onClick={createWallet}
            >
              {" "}
              انشاء محفظة
            </button>
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

export default TableCurrency;
