import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import Item from "./item";
import logo from "../img/Group 3 (1).png";
import "./Sidebar.css";
import Cookie from "js-cookie";
import Cookies from "js-cookie";

function Sidebar() {
  const [open, setOpen] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    Cookie.clear();
    window.location.href = "/";
    Cookies.remove("token");
    Cookies.remove("login");
    Cookies.remove("nameUser");
    Cookies.remove("emailUser");
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const sideContainerVariants = {
    true: {
      width: "13rem",
    },
    false: {
      width: "5rem",
      transition: {
        delay: 0.6,
      },
    },
  };

  const sidebarVariants = {
    true: {
      width: "200px",
    },
    false: {
      width: "5rem",
      transition: {
        delay: 0.4,
      },
    },
  };

  const profileVariants = {
    true: {
      alignSelf: "center",
      marginBottom: "1rem",
      width: "4rem",
    },
    false: {
      display: "flex",
      justifyContent: "center",
      alignSelf: "flex-start",
      marginBottom: "1rem",
      marginTop: "1rem",
      width: "3rem",
    },
  };
  return (
    <motion.div
      data-open={open}
      variants={sideContainerVariants}
      initial={`${open}`}
      animate={`${open}`}
      className="sidebar_container"
    >
      <motion.div
        className="sidebar"
        initial={`${open}`}
        animate={`${open}`}
        variants={sidebarVariants}
      >
        <motion.div
          whileHover={{
            scale: 1.2,
            rotate: 180,
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(3.5px)",
            WebkitBackdropFilter: "blur(3.5px)",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
            transition: {
              delay: 0.2,
              duration: 0.4,
            },
          }}
          onClick={handleToggle}
          className="lines_icon"
        >
          <FontAwesomeIcon icon={faListUl} />
        </motion.div>
        <motion.div
          layout
          initial={`${open}`}
          animate={`${open}`}
          variants={profileVariants}
          className="profile"
          transition={{ duration: 0.4 }}
          whileHover={{
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            cursor: "pointer",
          }}
        >
          <img src={logo} alt="profile_img" />
        </motion.div>
        <div className="group">
          <Item
            id="one"
            icon="fas fa-tachometer-alt"
            name="لوحة التحكم"
            link="/Dashboard/HomePage"
          />
        </div>
        <div className="group">
          <Item
            id="nine"
            icon="fas fa-user-shield"
            name="ادمن"
            link="/Dashboard/Admins"
          />
        </div>
        <div className="group">
          <Item
            id="three"
            icon="fas fa-chalkboard-teacher"
            name="المعلمون"
            link="/Dashboard/teacher"
          />
        </div>
        <div className="group">
          <Item
            id="four"
            icon="fas fa-user-graduate"
            name="الطلاب"
            link="/Dashboard/Student"
          />
        </div>
        <div className="group">
          <Item
            id="five"
            icon="fas fa-users"
            name="الجلسات"
            link="/Dashboard/Sessions"
          />
        </div>
        <div className="group">
          <Item
            id="six"
            icon="fas fa-handshake"
            name="الاشتراكات"
            link="/Dashboard/subscription"
          />
        </div>
        <div className="group">
          <Item
            id="seven"
            icon="fas fa-box"
            name="الباقات"
            link="/Dashboard/packages"
          />
        </div>
        <div className="group">
          <Item
            id="eleventh"
            icon="fas fa-user-tie"
            name="بروفايل المعلم"
            link="/Dashboard/teacherProfiles"
          />
        </div>

        <div className="group">
          <Item
            id="transactions"
            icon="fas fa-money-check-alt"
            name="المعاملات المالية"
            link="/Dashboard/transactions"
          />
        </div>

        <div className="group">
          <Item
            id="withdrwal_request"
            icon="fa-solid fa-money-bill-transfer"
            name="طلبات السحب"
            link="/Dashboard/withdrawal"
          />
        </div>
        <div className="group">
          <Item
            id="twelve"
            icon="fas fa-star"
            name="التقيمات"
            link="/Dashboard/Rating"
          />
        </div>
        <div className="group">
          <Item
            id="eighth"
            icon="fas fa-bell"
            name="الاشعارات"
            link="/Dashboard/notifications"
          />
        </div>
        <div className="group">
          <Item
            id="fifteenth"
            icon="fas fa-exclamation-triangle"
            name=" التنبيهات"
            link="/Dashboard/alerts"
          />
        </div>

        <div className="group">
          <Item
            id="fifteenth"
            icon="fa-solid fa-coins"
            name=" العملات"
            link="/Dashboard/currency"
          />
        </div>
        <div className="group">
          <Item
            id="fifteenth"
            icon="fa-solid fa-money-check-dollar"
            name="حسابات الدفع"
            link="/Dashboard/paymentAccount"
          />
        </div>
        <div className="group">
          <Item
            id="thirteenth"
            icon="fas fa-file-alt"
            name="الصفحات الخاصه"
            link="/Dashboard/mainPrivatePages"
          />
        </div>
        <div className="group">
          <Item
            id="fourteenth"
            icon="fas fa-cogs"
            name="التفضيلات التعليميه"
            link="/Dashboard/usersPaths"
          />
        </div>
        <div className="group">
          <Item
            id="ten"
            icon="fas fa-sign-out-alt"
            name="تسجيل الخروج"
            handleLogout={handleLogout}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Sidebar;
