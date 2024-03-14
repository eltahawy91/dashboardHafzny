import React, { useState } from "react";
import Select from "react-select";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import imgUSer from "../img/team-01.png";
import "./Header.css";

export default function Header(props) {
  const [isClearable] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  // const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    props.onSearchChange && props.onSearchChange(event.target.value);
  };
  // const [usersData, setUsersData] = useState([]);
  // useEffect(() => {
  //   fetch(`users`, setUsersData, setStatus)
  // }, [])
  // const data = Object.values(usersData);

  // const handleSearch = (e) => {
  //   const searchTerm = e.target.value;
  //   console.log(searchTerm);
  //   const filteredItems = data.map((innerArray) =>
  //     innerArray.filter((item) =>
  //       item.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //   );
  //   setFilteredData(filteredItems[0]);
  // };
  console.log(props.name);
  return (
    <div className="header">
      <h1>{props.title}</h1>
      {props.title === "لوحة التحكم" ? null : (
        <TextField
          label="البحث"
          variant="outlined"
          onChange={handleSearch}
          value={searchTerm}
          style={{ margin: "5px 0", textAlign: "right" }}
        />
      )}

      <div className="userDiv">
        {props.title === "بروفايل المعلم" || props.title === "حسابات الدفع" ? null : (
          <>
            {props.isHide !== "true" && (
              <button onClick={props.nameFunction} className="addIcon">
                اضافة{" "}
                <span>
                  <AddIcon />
                </span>
              </button>
            )}
          </>
        )}
        
        <img
          src={
            localStorage.getItem("imageUser") === "null"
              ? imgUSer
              : localStorage.getItem("imageUser")
          }
          alt=""
        />
        <div>
          <h4>{localStorage.getItem("nameUser")}</h4>
          <p>{localStorage.getItem("emailUser")}</p>
        </div>
      </div>
      {/* <div className='divButton'>
                {props.isHide !== "true" && <button onClick={props.nameFunction} className='addIcon'> اضافه <span> <AddIcon /> </span></button>}
                <button className='iconHeader'><FilterAltIcon /></button>
                <button className='iconHeader'><SortByAlphaIcon /></button>
            </div> */}
    </div>
  );
}
