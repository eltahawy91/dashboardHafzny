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
import { Form } from "react-bootstrap";

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

const TableWithdrawal = (props) => {
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
  const [transactionType, setTransactionType] = useState("transfer");
  const [currency, setCurrency] = useState("SAR");
  const [error, setError] = useState("");
  const [wallet, setWallet] = useState("");
  const [crWalletBalance, setCrWalletBalance] = useState("");
  const [walletId, setWalletId] = useState("");
  const [wallet_id, setWallet_id] = useState("");
  const [user_id, setUser_id] = useState("");

  const params = useParams();

  // console.log(params);

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
  const [walletData, setWalletData] = useState("");
  const [users, setUsers] = useState("");
  const [trans, setTransa] = useState("");
  const [status, setStatus] = useState("");
  const [payment_account_id, setPayment_account_id] = useState("");

  console.log(transactionData);
  useEffect(() => {
    // fetchDataWithRetries(
    //   `transactions/user/${params.ID}`,
    //   setWalletTransaction,
    //   setStatus
    // );
    ///transaction id
    // fetchDataWithRetries(
    //   `wallet/user/${params.ID}`,
    //   setWallet,
    //   setStatus,
    //   setError
    // );

    fetchDataWithRetries(`wallet`, setWalletData, setStatus, setError);
    fetchDataWithRetries(`transactions`, setTransa, setStatus, setError);
    console.log(walletData);
    console.log(trans);
    // const idTrans=trans && trans.

    fetchDataWithRetries(`withdraw`, setTransactionData, setStatus, setError);
    // console.log(walletData && walletData);
    console.log(transactionData.transactions);
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

  console.log(walletId);
  const getId = (id, wallId, amount, payment_account_id) => {
    console.log(wallId);
    setWallet_id(wallId);
    setAmount(amount);
    setPayment_account_id(payment_account_id);
    setUser_id(id);
    handleOpen();
  };

  const sendWithdrawal = async (e) => {
    e.preventDefault();
    try {
      const postedTransaction = {
        user_id: user_id,
        wallet_id: wallet_id,
        currency: currency,
        amount: amount,
        status: "pending",
        payment_account_id: payment_account_id,
        transaction_type: transactionType,
      };

      await postData(`withdraw`, postedTransaction);
      setAmount("");
      setOpen(false);
      Swal.fire({
        text: "تم انشاء  طلب السحب ",
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

  const headTable = [
    {
      amount: "المبلغ   ",
      status: "حاله الدفع   ",
      user_id: " رقم المستخدم   ",
      payment_account_id: "رقم الحساب",
      // currency: "العملة   ",
      // transaction_Type: "نوع العمليه ",
    },
  ];

  // const d = walletData && walletData.map((s) => console.log(s.user));
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: props.hight }}>
          <div style={{ display: "flex" }}>
            {/* <div className="btn-Converter">
              <Button onClick={handleOpenWallet}>انشاء محفظة </Button>
            </div> */}
          </div>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              {headTable &&
                headTable.map((header) => (
                  <TableRow>
                    {/* <TableCell>{header.photo}</TableCell> */}
                    {/* <TableCell>{header.name}</TableCell> */}
                    <TableCell>{header.user_id}</TableCell>
                    <TableCell>{header.amount}</TableCell>
                    <TableCell>{header.status}</TableCell>
                    <TableCell>{header.payment_account_id}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
            </TableHead>
            <TableBody>
              {transactionData &&
                transactionData.map((col) => (
                  <>
                    <TableRow>
                      <TableCell>{col.user_id}</TableCell>
                      <TableCell>{col.amount}</TableCell>
                      <TableCell>{col.status}</TableCell>
                      <TableCell>{col.payment_account_id}</TableCell>

                      <TableCell>
                        <div className="btn-Converter">
                          {/* <Button onClick={handleOpen}>تحويل </Button> */}
                          <Button
                            onClick={() =>
                              getId(
                                col.user_id,
                                col.wallet_id,
                                col.amount,
                                col.payment_account_id
                              )
                            }
                          >
                            تحويل{" "}
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
            <Form onSubmit={sendWithdrawal}>
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
                  id="amount"
                  style={{ width: "100%" }}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder=" ادخل المبلغ"
                />
                {/* <input type="text" id="transaction_type" value={"تحويل"} /> */}
              </div>
              <button
                type="submit"
                style={{ marginTop: "10px" }}
                className="addIcon"
                // onClick={() => transFunctio(userId)}
              >
                تحويل
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

export default TableWithdrawal;
