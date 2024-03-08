import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import DashBoard from "./Pages/Dashoard/Dashboard";
import Report from "./Pages/Report/Report";
import Login from "./Pages/Login/Login";
import Admins from "./Pages/Admins/Admins";
import Teacher from "./Pages/Teacher/Teacher";
import Subscription from "./Pages/Subscription/Subscription";
import Sessions from "./Pages/Sessions/Sessions";
import Student from "./Pages/Student/Student";
import Packages from "./Pages/Packages/packages";
import Notifications from "./Pages/Notifications/notifications";
import Alerts from "./Pages/Alerts/Alerts";
import NotFound from "./Pages/NotFound/NotFound";
import Ratings from "./Pages/Ratings/Ratings";
import PrivatePages from "./Pages/PrivatePages/PrivatePages";
import UsersPaths from "./Pages/UsersPaths/UsersPaths";
import FormPackages from "./Pages/Packages/FormPackages";
import AddSession from "./Pages/Sessions/AddSession";
import TablePrivatePage from "./Pages/PrivatePages/TablePrivate";
import TeacherProfiles from "./Pages/TeacherProfiles/TeacherProfiles";
import "./Component/StyleSweetAlert.css";
import ProfileTeacherDetail from "./Pages/ProfileTeacherDetail/ProfileTeacherDetail";
import Transaction from "./Pages/Transaction/Transaction";
import Withdrwal from "./Pages/withdrawal/Withdrwal";
import TeacherTransactions from "./Pages/TransactionTeacher/TeacherTransactions";
import Currency from "./Pages/currency/Currency";
import PaymentAccount from "./Pages/PaymentAccount/PaymentAccount";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/Dashboard/" element={<Login />} />
        <Route path="/Dashboard/HomePage" element={<DashBoard />} />
        <Route path="/Dashboard/reports" element={<Report />} />
        <Route path="/Dashboard/currency" element={<Currency />} />
        <Route path="/Dashboard/paymentAccount" element={<PaymentAccount />} />
        <Route path="/Dashboard/teacher" element={<Teacher />} />
        <Route path="/Dashboard/Student" element={<Student />} />
        <Route path="/Dashboard/Sessions" element={<Sessions />} />
        <Route path="/Dashboard/Packages" element={<Packages />} />
        <Route path="/Dashboard/Admins" element={<Admins />} />
        <Route path="/Dashboard/subscription" element={<Subscription />} />
        <Route path="/Dashboard/notifications" element={<Notifications />} />
        <Route path="/Dashboard/alerts" element={<Alerts />} />
        <Route path="/Dashboard/Rating" element={<Ratings />} />
        <Route path="/Dashboard/privatePages" element={<PrivatePages />} />
        <Route
          path="/Dashboard/privatePages/:discId"
          element={<PrivatePages />}
        />
        <Route
          path="/Dashboard/mainPrivatePages"
          element={<TablePrivatePage />}
        />
        <Route path="/Dashboard/usersPaths" element={<UsersPaths />} />
        <Route path="/Dashboard/FormPackages" element={<FormPackages />} />
        <Route
          path="/Dashboard/FormPackages/:discId"
          element={<FormPackages />}
        />
        <Route path="/Dashboard/AddSession" element={<AddSession />} />
        <Route path="/Dashboard/AddSession/:discId" element={<AddSession />} />
        <Route
          path="/Dashboard/teacherProfiles"
          element={<TeacherProfiles />}
        />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/Dashboard/teacher/ProfileTeacherDetail/:TeacherId"
          element={<ProfileTeacherDetail />}
        />
        <Route
          path="Dashboard/Transaction/:ID"
          element={<ProfileTeacherDetail />}
        />
        <Route
          path="Dashboard/teacherTransactions"
          element={<TeacherTransactions />}
        />
        <Route path="Dashboard/transactions" element={<Transaction />} />
        <Route path="Dashboard/withdrawal" element={<Withdrwal />} />
      </Routes>
    </>
  );
}
export default App;
