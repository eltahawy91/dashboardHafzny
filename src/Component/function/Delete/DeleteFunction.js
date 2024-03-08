import Swal from 'sweetalert2';
import {deleteFunction} from "../FunctionApi"

export  async function DeleteAdmins (urlApi , location , title ,text  ) {
    Swal.fire({
        title: title,
        text: text,
        showCancelButton: true,
        cancelButtonText: 'لا', 
        confirmButtonText: 'نعم',
        customClass: {
            confirmButton: 'delete-account-button-class'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            deleteFunction(urlApi)
            .then((response) => {
                console.log(response)
                Swal.fire({
                    icon: 'success',
                    title: 'تم حذف  بنجاح.',
                    showConfirmButton: false,
                    timer: 1500
                })
                .then((res)=>{
                    window.location.href = location;
                })
                
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'حدث خطأ أثناء الحذف ',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
        }
    });
};