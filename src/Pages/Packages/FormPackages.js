
import { React, useEffect, useState } from "react";
import Sidebar from "../../Component/Sidebar/Sidebar";
import imgEdit from "../../Component/img/solar_camera-minimalistic-linear.png"
import { postData } from "../../Component/function/FunctionApi"
import { putData } from "../../Component/function/FunctionApi"
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';
import { fetchDataWithRetries } from "../../Component/function/FunctionApi"
import "./packages.css";


function FormPackages() {
    const [data, setData] = useState("")
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [imageLink, setImageLink] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const Params = useParams();
    const id = Params.discId

    
    useEffect(() => {
        const login = localStorage.getItem("login");
        if (login === null) {
            window.location.href = '/Dashboard';
        }
        }, []);

    const [dataInput, setDataInput] = useState({
        name: "",
        description: "",
        price: "",
        total_hours: "",
        max_lectures: "",
        sort_order: "",
        is_default: "",
        discount: "",
        status: "active",
        icon: ""
    })

    useEffect(() => {
        fetchDataWithRetries(`plans/${id}`, setData)
    }, [])

    const plan = data.plan

    useEffect(() => {
        if (plan) {
            setDataInput({
                name: plan.name,
                description: plan.description,
                price: plan.price,
                total_hours: plan.total_hours,
                max_lectures: plan.max_lectures,
                sort_order: plan.sort_order,
                is_default: plan.is_default,
                discount: plan.discount,
                status: plan.status,
                icon: plan.icon
            })
        }
    }, [data]);

    function handleInputChange(e) {
        const newdata = { ...dataInput };

        if (e.target.type === 'file') {
            const image = e.target.files[0];
            if (image) {
                newdata.icon = image;
                setSelectedImage(image)
                const imgUrl = URL.createObjectURL(image);
                setImageLink(imgUrl);
            }
        } else {
            newdata[e.target.id] = e.target.value;

            if (e.target.type === 'checkbox' && e.target.id === 'is_default') {
                newdata.is_default = e.target.checked;
                setSelectedPlan(e.target.checked);
            }
        }

        setDataInput(newdata);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();

        Object.keys(dataInput).forEach(key => {
            formData.append(key, dataInput[key]);
            console.log(key, dataInput[key])
        });

        const apiFunction = data ? postData(`plans/${id}`, formData) : postData("plans", formData);
        
        apiFunction.then((res) => {
            Swal.fire({
                icon: "success",
                title: "تم العمليه بنجاح",
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                window.location.href = "/Dashboard/packages";
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

    return (
        <div className="apDiv formPackages packages">
            <Sidebar />
            <div className="body_container container" dir="rtl">
                <form className="formSub container" onSubmit={handleSubmit} dir="rtl">
                    <div className="firstSection">
                        <div className="inputText">
                            <div className="flexDiv">
                                <div className="editProfile">
                                    <input className="editProfileImg" type="file" id="icon" onChange={(e) => handleInputChange(e)} accept="image/*" multiple />
                                    {selectedImage ? (
                                        <label for="icon">
                                            {
                                                <div className='inputImg'>
                                                    <img src={imageLink} className="imgUser" alt='' />
                                                    <img src={imgEdit} className="imgEdit" alt="" />
                                                </div>
                                            }
                                        </label>
                                    ) : plan ? (
                                        <label for="icon">
                                            {
                                                <div className='inputImg'>
                                                    <img src={plan.icon} className="imgUser" alt='' />
                                                    <img src={imgEdit} className="imgEdit" alt="" />
                                                </div>
                                            }
                                        </label>
                                    ):(
                                        <label for="icon" className="upload">
                                        {
                                            <div className='inputImg'>
                                                <ion-icon name="cloud-upload-outline"></ion-icon>
                                                <img src={imgEdit} className="imgEdit" alt="" />
                                            </div>
                                        }
                                    </label>
                                    )}
                                </div>
                                <div>
                                    <div className="inputRadio">
                                        <label
                                            className={dataInput.status === "active" ? "label active green" : "label"}
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
                                            className={dataInput.status === "draft" ? "label active red" : "label"}
                                        >
                                            <input
                                                type="radio"
                                                id="status"
                                                value="draft"
                                                checked={dataInput.status === "draft"}
                                                onChange={(e) => handleInputChange(e)}
                                            />
                                            <span>عدم التفعيل </span>
                                        </label>
                                    </div>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedPlan === true}
                                            onChange={() => handleInputChange({
                                                target: {
                                                    id: 'is_default',
                                                    type: 'checkbox',
                                                    checked: !selectedPlan,
                                                }
                                            })}
                                        />
                                        <span>الوضع الافتراضي</span>
                                    </label>
                                </div>
                            </div>
                            <input type="text" id="name" value={dataInput.name} onChange={(e) => handleInputChange(e)} placeholder="اسم الباقه" />
                            <textarea id="description" value={dataInput.description} onChange={(e) => handleInputChange(e)} placeholder="محتوي الباقه" />
                        </div>
                        <div className="secondSection">
                            <input type="number" id="sort_order" value={dataInput.sort_order} onChange={(e) => handleInputChange(e)} placeholder="ترتيب الباقه" />
                            <input type="number" id="price" value={dataInput.price} onChange={(e) => handleInputChange(e)} placeholder="سعر الباقه" />
                            <input type="number" id="total_hours" value={dataInput.total_hours} onChange={(e) => handleInputChange(e)} placeholder="عدد الساعات المتاحه" />
                            <input type="number" id="max_lectures" value={dataInput.max_lectures} onChange={(e) => handleInputChange(e)} placeholder="عدد المحاضرات" />
                            <input type="number" id="discount" value={dataInput.discount} onChange={(e) => handleInputChange(e)} placeholder="عرض علي الباقه" />
                        </div>
                    </div>
                    <button type="submit" className="submit">ارسال</button>
                </form>
            </div>
        </div>
    );
}

export default FormPackages;
