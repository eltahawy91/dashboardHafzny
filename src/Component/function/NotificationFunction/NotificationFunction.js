import Swal from "sweetalert2";
import { postData } from "../FunctionApi";
import { putData } from "../FunctionApi";
import "./styleSwal.css";

export const TypeSend = (url, PathPage, pathData) => {
  Swal.fire({
    title: " حدد الفئه المستهدفه  ",
    showCloseButton: true,
    allowOutsideClick: true,
    customClass: {
      popup: "server-custom",
    },
    html: `
            <div class="Swal">
                <input type="radio" id="option1" name="choice" value="0">
                <div class="server people mb-15 rad-10 w-full">
                    <label class="d-block m-15" for="option1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="80" viewBox="0 0 640 512">
                    <path class="part" d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3V245.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5V416c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V389.2C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112h32c24 0 46.2 7.5 64.4 20.3zM448 416V394.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176h32c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2V416c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3V261.7c-10 11.3-16 26.1-16 42.3zm144-42.3v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2V448c0 17.7-14.3 32-32 32H288c-17.7 0-32-14.3-32-32V405.2c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112h32c61.9 0 112 50.1 112 112z"/>
                    </svg>
                    ارسال للجميع
                    </label>
                </div>
            </div>
            <div class="Swal">
                <input type="radio" id="option2" name="choice" value="1">
                <div class="server mb-15 rad-10 w-full">
                <label class="d-block m-15" for="option2">
                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="80" viewBox="0 0 320 512">
                <path class="part" d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152z"/>
                </svg>
                    ارسال للفرد
                </label>
            </div>
        </div>
        <div class="Swal">
                <input type="radio" id="option3" name="choice" value="2">
                <div class="server mb-15 rad-10 w-full">
                <label class="d-block m-15" for="option3">
                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="80" viewBox="0 0 640 512">
                <path class="part" d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H544c53 0 96-43 96-96V96c0-53-43-96-96-96H96zM64 96c0-17.7 14.3-32 32-32H544c17.7 0 32 14.3 32 32V416c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V96zm159.8 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM96 309.3c0 14.7 11.9 26.7 26.7 26.7h56.1c8-34.1 32.8-61.7 65.2-73.6c-7.5-4.1-16.2-6.4-25.3-6.4H149.3C119.9 256 96 279.9 96 309.3zM461.2 336h56.1c14.7 0 26.7-11.9 26.7-26.7c0-29.5-23.9-53.3-53.3-53.3H421.3c-9.2 0-17.8 2.3-25.3 6.4c32.4 11.9 57.2 39.5 65.2 73.6zM372 289c-3.9-.7-7.9-1-12-1H280c-4.1 0-8.1 .3-12 1c-26 4.4-47.3 22.7-55.9 47c-2.7 7.5-4.1 15.6-4.1 24c0 13.3 10.7 24 24 24H408c13.3 0 24-10.7 24-24c0-8.4-1.4-16.5-4.1-24c-8.6-24.3-29.9-42.6-55.9-47zM512 176a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM320 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"/>
                </svg>
                    لفئه معينه
                </label>
            </div>
        </div>
        `,
    confirmButtonText: "متابعه",
  }).then((result) => {
    if (result.isConfirmed) {
      const selectedChoice = document.querySelector(
        'input[name="choice"]:checked'
      );
      if (selectedChoice) {
        const choiceValue = selectedChoice.value;
        if (choiceValue === "0") {
          All_users(url, PathPage, pathData, false);
        } else if (choiceValue === "1") {
          one_user(url, PathPage, pathData);
        } else if (choiceValue === "2") {
          TypeCategory(url, PathPage, pathData);
        }
      } else {
        Swal.fire({
          title: "يجب عليك اختيار إجابة!",
          icon: "warning",
          confirmButtonText: "متابعه",
        }).then((result) => {
          if (result.isConfirmed) {
            TypeSend();
          }
        });
      }
    }
  });
};

export const TypeCategory = (url, PathPage, pathData) => {
  Swal.fire({
    title: " حدد الفئه المستخدمه  ",
    showCloseButton: true,
    allowOutsideClick: true,
    customClass: {
      popup: "server-custom",
    },
    html: `
            <div class="Swal">
                <input type="radio" id="option1" name="choice" value="0">
                <div class="server people mb-15 rad-10 w-full">
                    <label class="d-block m-15" for="option1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="80" viewBox="0 0 640 512">
                        <path class="part" d="M160 64c0-35.3 28.7-64 64-64H576c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H336.8c-11.8-25.5-29.9-47.5-52.4-64H384V320c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v32h64V64L224 64v49.1C205.2 102.2 183.3 96 160 96V64zm0 64a96 96 0 1 1 0 192 96 96 0 1 1 0-192zM133.3 352h53.3C260.3 352 320 411.7 320 485.3c0 14.7-11.9 26.7-26.7 26.7H26.7C11.9 512 0 500.1 0 485.3C0 411.7 59.7 352 133.3 352z"/>
                    </svg>
                    ارسال للطلاب
                    </label>
                </div>
            </div>
            <div class="Swal">
                <input type="radio" id="option2" name="choice" value="1">
                <div class="server mb-15 rad-10 w-full">
                <label class="d-block m-15" for="option2">
                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="80"  viewBox="0 0 640 512">
                <path class="part" d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9v28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5V291.9c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z"/>
                </svg>
                ارسال للمعلمين
                </label>
            </div>
        </div>
        `,
    confirmButtonText: "متابعه",
  }).then((result) => {
    if (result.isConfirmed) {
      const selectedChoice = document.querySelector(
        'input[name="choice"]:checked'
      );
      if (selectedChoice) {
        const choiceValueRole = selectedChoice.value;
        All_users(url, PathPage, pathData, true, choiceValueRole);
      } else {
        Swal.fire({
          title: "يجب عليك اختيار إجابة!",
          icon: "warning",
          confirmButtonText: "متابعه",
        }).then((result) => {
          if (result.isConfirmed) {
            TypeCategory();
          }
        });
      }
    }
  });
};

const All_users = (url, PathPage, pathData, is_role, choiceValueRole) => {
  const data = (pathData && pathData) || "";

  let DataSend = new FormData();
  Swal.fire({
    title: "اضافه",
    showCloseButton: true,
    allowOutsideClick: true,
    html: `
            <div>
                <form id="myForm" class="custom-form">
                    <input type="text" id="title" value="${
                      data.title || ""
                    }" class="swal2-input title" autoComplete="off" placeholder="العنوان" style="direction: rtl; margin-bottom: 10px;" >
                    <input type="text" id="message" value="${
                      data.message || ""
                    }" class="swal2-input message" autoComplete="off" placeholder="المحتوي" style="direction: rtl; margin-bottom: 10px;">
                </form>
            </div>
        `,
    preConfirm: () => {
      if (pathData) {
        data.title !== document.getElementById("title").value &&
          DataSend.append("title", document.getElementById("title").value);
        data.message !== document.getElementById("message").value &&
          DataSend.append("message", document.getElementById("message").value);
      } else {
        DataSend.append("title", document.getElementById("title").value);
        DataSend.append("message", document.getElementById("message").value);
        is_role === false
          ? DataSend.append("target_type", "all_users")
          : DataSend.append("target_type", "one_role");
        is_role === true && DataSend.append("target_id", choiceValueRole);
      }
      if (!pathData) {
        if (!DataSend.get("title") || !DataSend.get("message")) {
          Swal.showValidationMessage("يرجى ملء جميع الحقول");
        }
      }
    },
    confirmButtonText: "متابعه",
    confirmButtonClass: "custom-confirm-button",
  }).then((result) => {
    if (result.isConfirmed) {
      const objectData = {};
      DataSend.forEach((value, key) => {
        objectData[key] = value;
      });

      const dataSend = objectData;

      const requestFunction = pathData ? putData : postData;

      requestFunction(url, dataSend)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "تم العمليه بنجاح",
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
};

const one_user = (url, PathPage, pathData) => {
  const data = (pathData && pathData) || "";
  let DataSend = new FormData();

  Swal.fire({
    title: "اضافه",
    showCloseButton: true,
    allowOutsideClick: true,
    html: `
            <div>
                <form id="myForm" class="custom-form">
                    <input type="text" id="title" value="${
                      data.title || ""
                    }" class="swal2-input title" autoComplete="off" placeholder="العنوان" style="direction: rtl; margin-bottom: 10px;" >
                    <input type="text" id="message" value="${
                      data.message || ""
                    }" class="swal2-input message" autoComplete="off" placeholder="المحتوي" style="direction: rtl; margin-bottom: 10px;">
                <input type="number" id="target_id" value="${
                  data.target_id || ""
                }" class="swal2-input target_id" autoComplete="off" placeholder="id user" style="direction: rtl; margin-bottom: 10px;">
                </form>
            </div>
        `,
    preConfirm: () => {
      if (pathData) {
        data.title !== document.getElementById("title").value &&
          DataSend.append("title", document.getElementById("title").value);
        data.message !== document.getElementById("message").value &&
          DataSend.append("message", document.getElementById("message").value);
      } else {
        DataSend.append("title", document.getElementById("title").value);
        DataSend.append("message", document.getElementById("message").value);
        DataSend.append(
          "target_id",
          document.getElementById("target_id").value
        );
        DataSend.append("target_type", "one_role");
      }

      if (!pathData) {
        if (
          !DataSend.get("title") ||
          !DataSend.get("message") ||
          !DataSend.get("target_id")
        ) {
          Swal.showValidationMessage("يرجى ملء جميع الحقول");
        }
      }
    },

    confirmButtonText: "متابعه",
    confirmButtonClass: "custom-confirm-button",
  }).then((result) => {
    if (result.isConfirmed) {
      const objectData = {};
      DataSend.forEach((value, key) => {
        objectData[key] = value;
      });

      const dataSend = objectData;
      const requestFunction = pathData ? putData : postData;
      requestFunction(url, dataSend)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "تم العمليه بنجاح",
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
};
