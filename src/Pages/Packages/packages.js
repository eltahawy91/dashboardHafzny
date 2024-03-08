import {React, useState, useEffect} from 'react';
import Sidebar from '../../Component/Sidebar/Sidebar';
import TablePackages from './TablePackages';
import Header from '../../Component/Header/Header';
import { useNavigate } from 'react-router-dom';
import { fetchDataWithRetries } from "../../Component/function/FunctionApi";
import NoDataImage from "../../Component/img/App Illustrations.jpg"
import './packages.css';

const Product = () => {
    const navigate = useNavigate();
    const [data, setData] = useState("");

    
    useEffect(() => {
        const login = localStorage.getItem("login");
        if (login === null) {
            window.location.href = '/Dashboard';
        }
        }, []);
    
    useEffect(() => {
        fetchDataWithRetries("plans", setData);
    }, []);

    const plans = data.plans;


    return (
        <div className="apDiv packages">
            <Sidebar />
            <div className="body_container container" dir='rtl'>
                <Header title="الباقات" nameFunction={() => navigate("/Dashboard/FormPackages")} />
                { data && plans.length === 0 ? (
                    <div className="noMassage">
                        <img src={NoDataImage}  alt=""/>
                        <h2>لا يوجد بيانات</h2>
                    </div>
                    ) : 
                    <TablePackages data = {plans} />
                }
            </div>
        </div>
    );
};

export default Product;
