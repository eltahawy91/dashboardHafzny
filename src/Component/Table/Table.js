import { React, useEffect, useState } from "react";
import { Delete } from "../function/Delete/DeletCondition";
import { Users } from "../function/UsersFunction/UsersFunction";
import { SkeletonRow } from "./SkeletonRow";
import "react-loading-skeleton/dist/skeleton.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import { Link, useNavigate } from "react-router-dom";
import "./Table.css";
import { VscWorkspaceTrusted } from "react-icons/vsc";

import img from "../img/team-01.png";
import { fetchDataWithRetries, postData } from "../function/FunctionApi";

function TableComponent(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const EditFunction = async (id) => {
    console.log(props.path);
    if (props.path === "/Dashboard/mainPrivatePages") {
      navigate(`/Dashboard/privatePages/${id.id}`);
    } else if (props.path === "/Dashboard/Sessions") {
      navigate(`/Dashboard/AddSession/${id.id}`);
    } else if (props.path === "/Dashboard/FormPackages") {
      navigate(`/Dashboard/FormPackages/${id.id}`);
    } else if (props.path === "/Dashboard/alerts") {
      navigate(`/Dashboard/alerts/${id.id}`);
    } else if (props.path === "/Dashboard/paymentAccount") {
      navigate(`/Dashboard/paymentAccount/${id}`);
    } else if (props.path === "/Dashboard/currency") {
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

  const columns = props.arrayColum.map((item) => {
    const id = Object.keys(item)[0];
    const label = Object.values(item)[0];
    return { id, label, minWidth: 100 };
  });

  const handleSort = (key) => {
    setSortConfig((prevSortConfig) => {
      if (prevSortConfig.key === key) {
        return {
          ...prevSortConfig,
          direction: prevSortConfig.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedRows = [...props.rows].sort((a, b) => {
    if (sortConfig.key !== null) {
      const keyA = a[sortConfig.key];
      const keyB = b[sortConfig.key];

      if (sortConfig.direction === "asc") {
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
      } else {
        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
      }
    }

    return 0;
  });
  //   console.log(sortedRows.map((item) => console.log(item)));

  const filteredAndSortedRows = sortedRows.filter((row) => {
    return Object.values(row).some(
      (value) =>
        value &&
        value
          .toString()
          .toLowerCase()
          .includes(props.onSearchChange.toLowerCase())
    );
  });

  const [activationTeacher, setActivationTeacher] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (props.path === "/Dashboard/teacher") {
      fetchDataWithRetries(`teachers`, setActivationTeacher, setStatus);
    }
  }, []);

  return (
    <div className="TableMessage">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: props.hight }}>
          {/* {sortedRows.map((row, index) => ( */}
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              {props.title && (
                <TableRow>
                  <TableCell align="start" colSpan={props.numberColumns}>
                    {props.title}
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      top: props.title && 57,
                      minWidth: column.minWidth,
                    }}
                    className={
                      sortConfig.key === column.id
                        ? sortConfig.direction === "asc"
                          ? "asc"
                          : "desc"
                        : ""
                    }
                  >
                    <Button
                      onClick={() => handleSort(column.id)}
                      variant="text"
                      sx={{ textTransform: "none" }}
                    >
                      {" "}
                      {sortConfig.direction === "asc" ? (
                        <ion-icon name="chevron-up-outline"></ion-icon>
                      ) : (
                        <ion-icon name="chevron-down-outline"></ion-icon>
                      )}
                      {column.label}
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {props.rows && props.rows.length > 0 ? (
              <TableBody>
                {filteredAndSortedRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          if (column.id === "action") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <img
                                  className="delete"
                                  onClick={() => Delete(row.id, props.path)}
                                  src={value[0]}
                                  alt=""
                                />
                                {props.path !== "/Dashboard/notifications" &&
                                  props.path !== "/Dashboard/Rating" &&
                                  props.path !== "/Dashboard/alerts" &&
                                  props.path !== "/Dashboard/subscription" && (
                                    <img
                                      className="Edit"
                                      onClick={() => EditFunction(row)}
                                      src={value[1]}
                                      alt=""
                                    />
                                  )}

                                {/* <Button
                                  onClick={() => activationFunction(row.id)}
                                >
                                  {isActive ? "تفعيل" : "تعطيل"}
                                </Button> */}
                              </TableCell>
                            );
                          } else if (column.id === "image") {
                            return (
                              <TableCell
                                style={{ display: "flex" }}
                                className="imageTeacher"
                                key={column.id}
                                align={column.align}
                              >
                                <div style={{ display: "flex" }}>
                                  <img
                                    className="image "
                                    src={value || img}
                                    alt=""
                                  />

                                  {props.path === "/Dashboard/teacher" ? (
                                    <>
                                      {activationTeacher.teachers.map((item) =>
                                        item.id === row.id ? (
                                          <>
                                            <p className="activation">
                                              {item.isOnline === 1 ? (
                                                <span className="trusted"></span>
                                              ) : (
                                                <span className="untrusted"></span>
                                              )}
                                            </p>
                                            <p className="activation">
                                              {item.isActive === 1 ? (
                                                <h4
                                                  style={{
                                                    backgroundColor: "#68b7ff",
                                                    color: "white",
                                                    borderRadius: "4px",
                                                    padding: "4px 8px",
                                                  }}
                                                >
                                                  <VscWorkspaceTrusted
                                                    fontSize={20}
                                                  />
                                                </h4>
                                              ) : null}
                                            </p>
                                          </>
                                        ) : null
                                      )}
                                    </>
                                  ) : null}
                                </div>
                              </TableCell>
                            );
                          } else if (column.id === "gender") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value === "male" ? (
                                  <p className="gender male"> {value} </p>
                                ) : (
                                  <p className="gender female"> {value} </p>
                                )}
                              </TableCell>
                            );
                          } else if (column.id === "phone") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <p className="phone"> {value} </p>
                              </TableCell>
                            );
                          } else if (column.id === "rating") {
                            return (
                              <TableCell
                                className="rating"
                                key={column.id}
                                align={column.align}
                              >
                                {Array.from({ length: value }, () => (
                                  <StarBorderPurple500Icon />
                                ))}
                              </TableCell>
                            );
                          } else if (column.id === "moreInfo") {
                            return (
                              <TableCell
                                className="moreInfo"
                                key={column.id}
                                align={column.align}
                              >
                                <Link to={`ProfileTeacherDetail/${row.id}`}>
                                  عرض المعلومات
                                </Link>
                              </TableCell>
                            );
                          } else if (column.id === "target_type") {
                            return (
                              <TableCell
                                className="target_type"
                                key={column.id}
                                align={column.align}
                              >
                                {value === "all_users" ? (
                                  <p className="allPerson">
                                    <ion-icon name="person-add"></ion-icon>
                                    <span>ارسال للجميع</span>
                                  </p>
                                ) : value === "one_user" ? (
                                  <p className="person">
                                    <ion-icon name="person"></ion-icon>
                                    <span>ارسال للفرد</span>
                                  </p>
                                ) : value === "one_role" ? (
                                  <p className="peopleCircle">
                                    <ion-icon name="people-circle"></ion-icon>
                                    <span> ارسال لفئه معينه</span>
                                  </p>
                                ) : (
                                  ""
                                )}
                              </TableCell>
                            );
                          } else if (column.id === "read") {
                            return (
                              <TableCell
                                className="isRead"
                                key={column.id}
                                align={column.align}
                              >
                                {value === 1 ? (
                                  <p className="read">
                                    <ion-icon name="checkmark-done-outline"></ion-icon>
                                    <span>تم القراءه</span>
                                  </p>
                                ) : (
                                  <p className="DoNotRead">
                                    <ion-icon name="checkmark-done-outline"></ion-icon>
                                    <span>لم يتم القراءه</span>
                                  </p>
                                )}
                              </TableCell>
                            );
                          } else if (column.id === "status") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value === "active" ? (
                                  <p className="status active"> {value} </p>
                                ) : value === "draft" ? (
                                  <p className="status draft"> {value} </p>
                                ) : value === "completed" ? (
                                  <p className="status completed"> {value} </p>
                                ) : value === "scheduled" ? (
                                  <p className="status scheduled"> {value} </p>
                                ) : (
                                  <p className="status cancelled "> {value} </p>
                                )}
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            ) : props.status === 204 ? (
              <div className="noMassage">
                <h2>لا يوجد رسائل</h2>
              </div>
            ) : (
              Array(rowsPerPage)
                .fill()
                .map((_, index) => (
                  <SkeletonRow
                    key={index}
                    columns={columns}
                    path={props.path}
                  />
                ))
            )}
          </Table>
          {/* ))} */}
        </TableContainer>
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
    </div>
  );
}

export default TableComponent;
