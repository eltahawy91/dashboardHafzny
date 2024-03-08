import { React, useState } from "react";
import { postData } from "../../Component/function/FunctionApi";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import animation from "../../Component/img/Loader.gif";
import Cookie from "js-cookie";

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [setUploadPercentage] = useState(false);
  localStorage.clear();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  const userData = {
    email: data.email,
    password: data.password,
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await postData(
        "login",
        userData,
        setUploadPercentage,
        setError
      );
      if (result) {
        setTimeout(() => {
          setLoading(false);
          navigate("/Dashboard/HomePage");

          // Storing in localStorage
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("imageUser", result.data.user.avatar);
          localStorage.setItem("nameUser", result.data.user.name);
          localStorage.setItem("emailUser", result.data.user.email);
          localStorage.setItem("login", true);

          // Storing in cookies
          Cookie.set("token", result.data.token, { expires: 7 }); // expires in 7 days
          Cookie.set("imageUser", result.data.user.avatar, { expires: 7 });
          Cookie.set("nameUser", result.data.user.name, { expires: 7 });
          Cookie.set("emailUser", result.data.user.email, { expires: 7 });
          Cookie.set("login", true, { expires: 7 });
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="loading login">
          <img className="animation" src={animation} alt="" />
        </div>
      ) : (
        <div className="Login">
          <div className="container">
            <form onSubmit={(e) => handleFormSubmit(e)} dir="rtl">
              <h1>تسجيل الدخول</h1>
              <input
                type="email"
                id="email"
                value={data.email}
                onChange={(e) => handle(e)}
                placeholder="البريد الالكتروني"
              />
              <input
                type="password"
                id="password"
                value={data.password}
                onChange={(e) => handle(e)}
                placeholder="كلمة المرور"
              />
              <button type="submit">تسجيل دخول</button>
              {error && <p>{error}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
