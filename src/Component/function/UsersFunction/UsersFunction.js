import Swal from "sweetalert2";
import { postData } from "../FunctionApi";
import { putData } from "../FunctionApi";

export async function Users(
  url,
  role_id,
  PathPage,
  setUploadPercentage,
  pathData
) {
  const data = (pathData && pathData) || "";

  let DataSend = new FormData();
  const gender = [
    { id: "male", name: "ذكر" },
    { id: "female", name: "انثي" },
  ];

  Swal.fire({
    title: "اضافه",
    showCloseButton: true,
    allowOutsideClick: true,
    html: `
            <form id="myForm" class="custom-form">
                <input type="text" id="name" value="${
                  data.name || ""
                }" class="swal2-input name" autoComplete="off" placeholder="الاسم" style="direction: rtl; margin-bottom: 10px;" >
                <input type="email" id="email" value="${
                  data.email || ""
                }" class="swal2-input email" autoComplete="off" placeholder="البريد الالكتروني" style="direction: rtl; margin-bottom: 10px;">
                <input type="phone" id="phone" value="${
                  data.phone || ""
                }" class="swal2-input email" autoComplete="off" placeholder="رقم التلفون" style="direction: rtl; margin-bottom: 10px;">
                <div class = "select">
                    <select id="gender" class="swal2-input" style="margin-bottom: 10px;"  >
                    ${gender
                      .map(
                        (role) => `
                        <option value="${role.id}" ${
                          data.role === role.id ? "selected" : ""
                        }>${role.name}</option>
                    `
                      )
                      .join("")}
                    </select>
                </div>
                <input type="password" id="password" value="${
                  data.status || ""
                }" class="swal2-input password" autoComplete="off" placeholder="كلمه السر" style="direction: rtl; margin-bottom: 10px;">
                <input type="password" id="confirm-password" class="swal2-input password" autoComplete="off" placeholder=" تأكيد كلمة  السر" style="direction: rtl; margin-bottom: 10px;">
                <input type="file" id="image" class="swal2-input" style="margin-bottom: 10px;">
            </form>
        `,
    preConfirm: () => {
      if (pathData) {
        data.name !== document.getElementById("name").value &&
          DataSend.append("name", document.getElementById("name").value);
        data.email !== document.getElementById("email").value &&
          DataSend.append("email", document.getElementById("email").value);
        document.getElementById("password").value !== "" &&
          DataSend.append(
            "password",
            document.getElementById("password").value
          );
        data.phone !== document.getElementById("phone").value &&
          DataSend.append("phone", document.getElementById("phone").value);
        data.gender !== document.getElementById("gender").value &&
          DataSend.append("gender", document.getElementById("gender").value);
      } else {
        DataSend.append("name", document.getElementById("name").value);
        DataSend.append("email", document.getElementById("email").value);
        DataSend.append("password", document.getElementById("password").value);
        DataSend.append("phone", document.getElementById("phone").value);
        DataSend.append("gender", document.getElementById("gender").value);
        DataSend.append("role_id", role_id);
      }
      const confirmPassword = document.getElementById("confirm-password").value;

      const imageInput = document.getElementById("image");
      if (imageInput.files.length > 0) {
        DataSend.set("avatar", imageInput.files[0]);
      }

      if (!pathData) {
        if (
          !DataSend.get("name") ||
          !DataSend.get("email") ||
          !DataSend.get("phone") ||
          !DataSend.get("gender") ||
          !DataSend.get("avatar")
        ) {
          Swal.showValidationMessage("يرجى ملء جميع الحقول");
        }
      }
      if (DataSend.get("password") !== null) {
        if (DataSend.get("password") !== confirmPassword) {
          Swal.showValidationMessage("كلمة السر وتأكيد كلمة السر غير متطابقين");
        }
      }
    },

    confirmButtonText: "متابعه",
    confirmButtonClass: "custom-confirm-button",
  }).then((result) => {
    if (result.isConfirmed) {
      postData(url, DataSend, setUploadPercentage)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "تمت العملية  بنجاح",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.href = PathPage;
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
    }
  });
}
