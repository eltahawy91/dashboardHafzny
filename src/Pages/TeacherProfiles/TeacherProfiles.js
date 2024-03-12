import { useEffect, useState } from "react";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Header from "../../Component/Header/Header";
import { Users } from "../../Component/function/UsersFunction/UsersFunction";
import "./TeacherProfiles.css";
import CardProfile from "./CardProfile";

function TeacherProfiles() {
  const [setOnSearchChange] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login === null) {
      window.location.href = "/Dashboard";
    }
  }, []);

  return (
    <div className="apDiv teacherProfiles">
      <Sidebar />
      <div className="body_container container" dir="rtl">
        <Header
          title="بروفايل المعلم"
          nameFunction={() =>
            Users("users", 2, "/Dashboard/teacher", setUploadPercentage)
          }
          onSearchChange={setOnSearchChange}
        />
        <CardProfile />
      </div>
    </div>
  );
}

export default TeacherProfiles;
