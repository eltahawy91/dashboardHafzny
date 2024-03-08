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

import { useParams } from "react-router-dom";
import {
  fetchDataWithRetries,
  postData,
  putData,
} from "../../Component/function/FunctionApi";

import Box from "@mui/material/Box";
import Swal from "sweetalert2";

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

const TableTransaction = (props) => {
  const [openWallet, setOpenWallet] = React.useState(false);
  const handleOpenWallet = () => {
    setOpenWallet(true);
  };
  const handleCloseWallet = () => {
    setOpenWallet(false);
  };

  const [status, setStatus] = useState("");
  const [Tbalance, setTbalance] = useState("");
  const [userId, setUserID] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("withdraw");
  const [currency, setCurrency] = useState("SAR");
  const [error, setError] = useState("");
  const [wallet, setWallet] = useState("");
  const [walletData, setWalletData] = useState("");
  const [crWalletBalance, setCrWalletBalance] = useState("");
  const [walletId, setWalletId] = useState("");

  const params = useParams();

  // console.log(params);

  const createWallet = () => {
    const postedTeacher = {
      user_id: params.ID,
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
      Swal.fire({
        text: "تم انشاء محفظتك بنجاح ",
        icon: "success",
      });
    }
  };
  console.log(walletId);
  const [wallettransaction, setWalletTransaction] = useState("");
  useEffect(() => {
    fetchDataWithRetries(
      `transactions/user/${params.ID}`,
      setWalletTransaction,
      setStatus
    );
    ///transaction id
    fetchDataWithRetries(
      `wallet/user/${params.ID}`,
      setWallet,
      setStatus,
      setError
    );
    fetchDataWithRetries(`wallet`, setWalletData, setStatus, setError);
    fetchDataWithRetries(
      `wallet/${walletId}`,
      setWalletId,
      setStatus,
      setError
    );
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
      id: "رقم العمليه ",
      name: " اسم المعلم ",
      photo: "صوره المعلم  ",
      amount: "المبلغ   ",
      currency: "العملة   ",
      transaction_Type: "نوع العمليه ",
    },
  ];

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: props.hight }}>
          {/* {sortedRows.map((row, index) => ( */}

          <div style={{ display: "flex" }}>
            <div className="btn-Converter">
              {/* <Button onClick={handleOpenWallet}>انشاء محفظة </Button> */}
            </div>
          </div>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              {headTable &&
                headTable.map((header) => (
                  <TableRow>
                    <TableCell>{header.photo}</TableCell>
                    <TableCell>{header.name}</TableCell>
                    <TableCell>{header.id}</TableCell>
                    <TableCell>{header.amount}</TableCell>
                    <TableCell>{header.currency}</TableCell>
                    <TableCell>{header.transaction_Type}</TableCell>
                  </TableRow>
                ))}
            </TableHead>
            <TableBody>
              {props.arrayColum &&
                props.arrayColum.map((col) => (
                  <>
                    <TableRow>
                      <TableCell>
                        <img src={col.avatar} alt={col.avatar} />
                      </TableCell>
                      <TableCell>{col.user.name}</TableCell>
                      <TableCell>{col.id}</TableCell>

                      <TableCell>{col.amount}</TableCell>
                      <TableCell>
                        {col.currency === "SAR" && "ريال سعودي"}
                        {col.currency === "USD" && "دولار"}
                      </TableCell>

                      <TableCell>
                        {col.transaction_type === "purshase" && "شراء"}
                        {col.transaction_type === "subscription" && "اشتراك"}
                        {col.transaction_type === "deposit" && "ايداع"}
                        {col.transaction_type === "refund" && "استرداد"}
                        {col.transaction_type === "cancelation" && "الغاء"}
                        {col.transaction_type === "chargeback" &&
                          "رد المبالغ المدفوعة"}
                        {col.transaction_type === "transfer" && "تحويل"}
                        {col.transaction_type === "withdrawal" && "انسحاب"}
                        {col.transaction_type === "fee" && "مصاريف"}
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
            <h1 className="headBalance">
              {Tbalance} {currency} : الرصيد الكلي
            </h1>

            <input
              type="text"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder=" ادخل المبلغ"
            />

            <select onChange={(e) => setTransactionType(e.target.value)}>
              <option value="withdraw">سحب</option>
              <option value="deposit">ايداع</option>
              <option value="transfer">تحويل</option>
            </select>

            <select onChange={(e) => setCurrency(e.target.value)}>
              <option value="SAR">ريال سعودي</option>
              <option value="USD">دولار</option>
            </select>
            <button
              type="submit"
              style={{ marginTop: "45px" }}
              className="addIcon"
              onClick={() => transFunctio(userId)}
            >
              {" "}
              تحويل
            </button>
          </Box>
        </Modal>
        {/* <Modal
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
        </Modal> */}
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

export default TableTransaction;
