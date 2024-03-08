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

const TableTeacherTransaction = (props) => {
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
  const [transactionTeacher, setTransactionsTeacher] = useState("");
  const [currencyData, setCurrencyData] = useState("");
  const [currencyID, setCurrencyId] = useState("");
  useEffect(() => {
    fetchDataWithRetries(
      `transactions/user/${params.TeacherId}`,
      setTransactionsTeacher,
      setStatus
    );
  }, []);

  useEffect(() => {
    fetchDataWithRetries(`currencies`, setCurrencyData, setStatus);
  }, []); // Assuming this useEffect is only for fetching currencies

  console.log(transactionTeacher);
  const createWallet = () => {
    console.log(params.TeacherId);
    const postedTeacher = {
      user_id: parseFloat(params.TeacherId),
      balance: parseFloat(crWalletBalance),
      paypal_email: "sasda@gmail.com",
      currency_id: parseFloat(currencyID),
    };
    if (postedTeacher.user_id === params.TeacherId) {
      Swal.fire({
        title: "! حدث خطأ",
        text: "تم انشاء محفظتك بالفعل ",
        icon: "error",
        showConfirmButton: false,
      });
      setOpen(false);
    } else {
      postData(`wallet`, postedTeacher, setError, setStatus);
      setOpen(false);

      Swal.fire({
        text: "تم انشاء محفظتك بنجاح ",
        icon: "success",
      });
    }
  };
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
    fetchDataWithRetries(`wallet`, setWalletId, setStatus, setError);
    console.log(walletId);
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
      id: "رقم المحفظة ",
      amount: " الكمية  ",
    },
  ];

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: props.hight }}>
          {/* {sortedRows.map((row, index) => ( */}
          <div style={{ display: "flex" }}>
            <div className="btn-Converter">
              <Button onClick={handleOpenWallet}>انشاء محفظة</Button>
            </div>
          </div>
          <Table
            stickyHeader
            aria-label="sticky table"
            style={{ overflowX: "scroll", width: "80%" }}
          >
            <TableHead>
              {headTable &&
                headTable.map((header) => (
                  <TableRow>
                    <TableCell>{header.id}</TableCell>
                    <TableCell>{header.amount}</TableCell>
                  </TableRow>
                ))}
            </TableHead>
            <TableBody>
              {walletId &&
                walletId.map((col) => (
                  <>
                    <TableRow>
                      <TableCell>{col.id}</TableCell>
                      <TableCell>{col.balance}</TableCell>
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
        <Modal
          open={openWallet}
          onClose={handleCloseWallet}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style }}>
            <input
              style={{ width: "100%" }}
              type="text"
              id="amount"
              value={crWalletBalance}
              onChange={(e) => setCrWalletBalance(e.target.value)}
              placeholder=" ادخل المبلغ"
            />
            <select
              onChange={(e) => setCurrencyId(e.target.value)}
              style={{ width: "100%" }}
            >
              {currencyData &&
                currencyData.map((data) => {
                  return <option value={data.id}>{data.name}</option>;
                })}
            </select>

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
    </>
  );
};

export default TableTeacherTransaction;
