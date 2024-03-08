import Swal from "sweetalert2";
import { postData } from "../FunctionApi";
import { putData } from "../FunctionApi";

export const AddProfileTeacher = (url, PathPage, name , description ) => {
    
    let DataSend = new FormData();

    console.log(url)
    Swal.fire({
        title: "اضافه",
        showCloseButton: true,
        allowOutsideClick: true,
        html: `
            <div>
                <form id="myForm" class="custom-form">
                    <input type="text" id="name" value="${name || ""
                }" class="swal2-input name" autoComplete="off" placeholder="العنوان" style="direction: rtl; margin-bottom: 10px;" >
                    <input type="text" id="description" value="${description || ""
                }" class="swal2-input description" autoComplete="off" placeholder="المحتوي" style="direction: rtl; margin-bottom: 10px;">
                </form>
            </div>
        `,
        preConfirm: () => {
            if (name) {
                name !== document.getElementById("name").value &&
                    DataSend.append("name", document.getElementById("name").value);
                description !== document.getElementById("description").value &&
                    DataSend.append("description", document.getElementById("description").value);
            } else {
                DataSend.append("name", document.getElementById("name").value);
                DataSend.append("description", document.getElementById("description").value);
            }
            
        },
        confirmButtonText: "متابعه",
        confirmButtonClass: "custom-confirm-button",
    }).then((result) => {
        if (result.isConfirmed) {
            
            const requestFunction = name ? putData : postData ;
            requestFunction(url, DataSend)
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
