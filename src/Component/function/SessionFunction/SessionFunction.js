import Swal from 'sweetalert2';
import {postData} from "../FunctionApi"
import {putData} from "../FunctionApi"

export  async function Sessions(url, id ,pathData )  {
    
    const Data = (pathData && pathData.find(pathData => pathData.id === id)) || "";

    let formData = {
        teacher_id : "",
        student_id : "",
        start_time: "",
        end_time: "",
        duration: "",
        topic : "",
        status: "",
        notes: ""
    };

    Swal.fire({
        title: 'اضافه',
        showCloseButton: true,
        allowOutsideClick: true,
        html: `
            <form id="myForm" class="custom-form">
                <input type="text" id="title" value= "${Data.title || ""}"  class="swal2-input name" autoComplete="off" placeholder="العنوان" style="direction: rtl; margin-bottom: 10px;" >
                <input type="text" id="description" value= "${Data.description || ""}" class="swal2-input email" autoComplete="off" placeholder="الوصف" style="direction: rtl; margin-bottom: 10px;">
                <input type="number" id="order" value= "${Data.order || ""}" class="swal2-input password" autoComplete="off" placeholder="الترتيب" style="direction: rtl; margin-bottom: 10px;">
                <input type="text" id="status" value= "${Data.status || ""}" class="swal2-input password" autoComplete="off" placeholder="الحاله" style="direction: rtl; margin-bottom: 10px;">
            </form>
        `,
        preConfirm: () => {
            formData.title = document.getElementById('title').value;
            formData.description = document.getElementById('description').value;
            formData.order = document.getElementById('order').value;
            formData.status = document.getElementById('status').value;

            if (!formData.title  || !formData.description || !formData.order || !formData.status) {
                Swal.showValidationMessage('يرجى ملء جميع الحقول');
            }
        },
        confirmButtonText: 'متابعه',
        confirmButtonClass: 'custom-confirm-button',
        }).then((result) => {
            if (result.isConfirmed) {
                const requestFunction = pathData ? putData :  postData;
                requestFunction(url, formData)
                .then(res =>{
                    Swal.fire({
                        icon: 'success',
                        title: "تمت العملية  بنجاح",
                        showConfirmButton: false,
                        timer: 1500
                        }).then(()=>{
                            window.location.href = "Dashboard/usersPaths";
                        })
                })
                .catch(err =>{
                    Swal.fire({
                        icon: 'error',
                        title: 'خطأ في عملية ',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    
                    })
            }
            });
};


