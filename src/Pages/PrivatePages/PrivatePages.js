
import { React, useEffect, useState } from "react";
import Sidebar from "../../Component/Sidebar/Sidebar";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import "./PrivatePages.css";
import {postData} from "../../Component/function/FunctionApi"
import {putData} from "../../Component/function/FunctionApi"
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';
import { fetchDataWithRetries } from "../../Component/function/FunctionApi"


function PrivatePages() {
    const { quill, quillRef } = useQuill();
    const [selectedOption, setSelectedOption] = useState('active');
    const [content, setContent] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState("")
    const  Params  = useParams();
    const id = Params.discId

    
    useEffect(() => {
        const login = localStorage.getItem("login");
        if (login === null) {
            window.location.href = '/Dashboard';
        }
        }, []);

    useEffect(() => {
        fetchDataWithRetries(`pages/${id}`, setData)
    }, [])

    useEffect(() => {
        if (quill) {
            quill.on("text-change", () => {
                setContent(quill.root.innerHTML) // Get innerHTML using quill
            });
        }
    }, [quill]);

    useEffect(() => {
        if (data && data.page.title) {
            data &&  quill.clipboard.dangerouslyPasteHTML(data.page.content);
            setInputValue(data.page.title);
            setSelectedOption(data.page.status)
        }
        }, [data]);
    

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            title: inputValue,
            content: content,
            status: selectedOption,
        };
        const apiFunction = data ? putData(`pages/${id}`, formData ) : postData("pages", formData );
        apiFunction.then((res) => {
            Swal.fire({
                icon: "success",
                title: "تم العمليه بنجاح",
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                window.location.href = "/Dashboard/mainPrivatePages";
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
        <div className="apDiv privatePages">
            <Sidebar />
            <div className="body_container container" dir="rtl">
                <form className="formSub container" onSubmit={handleSubmit} dir="rtl">
                    <div className="firstSection">
                        <input type="text" value={inputValue} onChange={handleChange} placeholder="العنوان" />
                        <div className="inputRadio">
                            <label
                                className={selectedOption === "active" ? "label active green" : "label"}
                            >
                                <input
                                    type="radio"
                                    value="active"
                                    checked={selectedOption === "active"}
                                    onChange={handleRadioChange}
                                />
                                <span> تفعيل الصفحه </span>
                            </label>
                            <label
                                className={selectedOption === "draft" ? "label active red" : "label"}
                            >
                                <input
                                    type="radio"
                                    value="draft"
                                    checked={selectedOption === "draft"}
                                    onChange={handleRadioChange}
                                />
                                <span>عدم التفعيل </span>
                            </label>
                        </div>
                    </div>
                    <div className="quilljs">
                        <div ref={quillRef} style={{"height": "430px"}}/>
                    </div>
                    <button type="submit" className="submit">ارسال</button>
                </form>
            </div>
        </div>
    );
}

export default PrivatePages;
