import { React, useEffect, useState } from "react";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Select from "react-select";
import { postData } from "../../Component/function/FunctionApi";
import { putData } from "../../Component/function/FunctionApi";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { fetchDataWithRetries } from "../../Component/function/FunctionApi";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./Sessions.css";

function AddSession(props) {
  const [data, setData] = useState("");
  const [student, setStudent] = useState("");
  const [teacher, setTeacher] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isClearable] = useState(true);

  const Params = useParams();
  const id = Params.discId;

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login === null) {
      window.location.href = "/Dashboard";
    }
  }, []);

  const [dataInput, setDataInput] = useState({
    teacher_id: "",
    student_id: "",
    start_time: "",
    end_time: "",
    duration: "",
    topic: "",
    status: "active",
    notes: "",
  });

  useEffect(() => {
    fetchDataWithRetries(`lectures/${id}`, setData);
    fetchDataWithRetries(`students`, setStudent);
    fetchDataWithRetries(`teachers`, setTeacher);
  }, []);

  const lectures = data.lecture;

  useEffect(() => {
    if (lectures) {
      setDataInput({
        teacher_id: lectures.teacher_id,
        student_id: lectures.student_id,
        start_time: lectures.start_time,
        end_time: lectures.end_time,
        duration: lectures.duration,
        topic: lectures.topic,
        status: lectures.status,
        notes: lectures.notes,
      });
    }
  }, [data]);

  function handleInputChange(e) {
    const newdata = { ...dataInput };
    newdata[e.target.id] = e.target.value;
    setDataInput(newdata);
  }

  const handleStudentChange = (selectedOption) => {
    const selectedStudentName = selectedOption.value
      ? student.students.find((item) => item.name === selectedOption.value)
      : "";
    const selectedStudentId = selectedStudentName ? selectedStudentName.id : "";
    setDataInput((prevDataInput) => ({
      ...prevDataInput,
      student_id: selectedStudentId,
    }));
  };
  const handleTeacherChange = (selectedOption) => {
    const selectedTeacherName = selectedOption.value
      ? teacher.teachers.find((item) => item.name === selectedOption.value)
      : "";
    const selectedTeacherId = selectedTeacherName ? selectedTeacherName.id : "";
    setDataInput((prevDataInput) => ({
      ...prevDataInput,
      teacher_id: selectedTeacherId,
    }));
  };
  function handleDateChange(date, field, setDate) {
    setDate(date);
    const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss");
    setDataInput((prevDataInput) => ({
      ...prevDataInput,
      [field]: formattedDate,
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const apiFunction = data
      ? putData(`lectures/${id}`, dataInput, props.setUploadPercentage)
      : postData("lectures", dataInput, props.setUploadPercentage);
    apiFunction
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "تم العمليه بنجاح",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.href = "/Dashboard/Sessions";
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "خطأ في عملية ",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const studentNames = student ? student.students.map((item) => item.name) : [];
  const studentData = studentNames.map((name) => ({
    value: name,
    label: name,
  }));
  const teacherNames = teacher ? teacher.teachers.map((item) => item.name) : [];
  const teacherData = teacherNames.map((name) => ({
    value: name,
    label: name,
  }));

  return (
    <div className="apDiv addSession session">
      <Sidebar />
      <div className="body_container container" dir="rtl">
        <form className="formSub container" onSubmit={handleSubmit} dir="rtl">
          <div className="firstSection">
            <div className="inputRadio">
              <label
                className={
                  dataInput.status === "active" ? "label active green" : "label"
                }
              >
                <input
                  type="radio"
                  id="status"
                  value="active"
                  checked={dataInput.status === "active"}
                  onChange={(e) => handleInputChange(e)}
                />
                <span> تفعيل الصفحه </span>
              </label>
              <label
                className={
                  dataInput.status === "cancelled"
                    ? "label active red"
                    : "label"
                }
              >
                <input
                  type="radio"
                  id="status"
                  value="cancelled"
                  checked={dataInput.status === "cancelled"}
                  onChange={(e) => handleInputChange(e)}
                />
                <span>عدم التفعيل </span>
              </label>
              <label
                className={
                  dataInput.status === "scheduled"
                    ? "label active red"
                    : "label"
                }
              >
                <input
                  type="radio"
                  id="status"
                  value="scheduled"
                  checked={dataInput.status === "scheduled"}
                  onChange={(e) => handleInputChange(e)}
                />
                <span>مقرر</span>
              </label>
              <label
                className={
                  dataInput.status === "completed"
                    ? "label active red"
                    : "label"
                }
              >
                <input
                  type="radio"
                  id="status"
                  value="completed"
                  checked={dataInput.status === "completed"}
                  onChange={(e) => handleInputChange(e)}
                />
                <span>مكتمل</span>
              </label>
            </div>
            <div className="dropDown">
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={studentData[0]}
                isClearable={isClearable}
                name="color"
                options={studentData}
                onChange={(select) => handleStudentChange(select)}
              />
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={teacherData[0]}
                isClearable={isClearable}
                name="color"
                options={teacherData}
                onChange={(select) => handleTeacherChange(select)}
              />
            </div>
            <input
              type="text"
              id="topic"
              value={dataInput.topic}
              onChange={(e) => handleInputChange(e)}
              placeholder="موضوع الحصه"
            />
            <input
              type="number"
              id="duration"
              value={dataInput.duration}
              onChange={(e) => handleInputChange(e)}
              placeholder="مده الحصه"
            />
            <DatePicker
              selected={startDate}
              onChange={(date) =>
                handleDateChange(date, "start_time", setStartDate)
              }
              dateFormat="yyyy-MM-dd'T'HH:mm:ss"
              showTimeInput
              placeholderText="وقت بداء الحصه"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) =>
                handleDateChange(date, "end_time", setEndDate)
              }
              dateFormat="yyyy-MM-dd'T'HH:mm:ss"
              showTimeInput
              placeholderText="وقت انهاء الحصه"
            />
            <input
              type="text"
              id="notes"
              value={dataInput.notes}
              onChange={(e) => handleInputChange(e)}
              placeholder="ملحوظه"
            />
          </div>
          <button type="submit" className="submit">
            ارسال
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddSession;
