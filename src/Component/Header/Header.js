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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    props.onSearchChange && props.onSearchChange(event.target.value);
  };

  return (
    <div className="header">
      <h1>{props.title}</h1>
      <TextField
        label="البحث"
        variant="outlined"
        onChange={handleSearch}
        value={searchTerm}
        style={{ margin: "5px 0", textAlign: "right" }}
      />
      <div className="userDiv">
        {props.isHide !== "true" && (
          <button onClick={props.nameFunction} className="addIcon">
            {" "}
            اضافه{" "}
            <span>
              {" "}
              <AddIcon />{" "}
            </span>
          </button>
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