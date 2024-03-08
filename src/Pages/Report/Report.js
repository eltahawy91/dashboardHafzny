import Sidebar from '../../Component/Sidebar/Sidebar';
import "./Report.css"
import { useEffect } from 'react';
import { Link } from "react-router-dom"
import Header from "../../Component/Header/Header"

function Report() {
    
    useEffect(() => {
        const login = localStorage.getItem("login");
        if (login === null) {
            window.location.href = '/Dashboard';
        }
    }, []);

    return (
        <div className="apDiv report">
            <Sidebar/>
            <div className="body_container container" dir='rtl'>
                <Header title="تقارير"/>
                <div className='contentReport'>
                    <div className='block'>
                        <h1>1</h1>
                        <p>شهر يناير</p>
                        <Link to="#">اعرف المزيد</Link>
                    </div>
                    <div className='block'>
                        <h1>2</h1>
                        <p>شهر يناير</p>
                        <Link to="#">اعرف المزيد</Link>
                    </div>
                    <div className='block'>
                        <h1>3</h1>
                        <p>شهر يناير</p>
                        <Link to="#">اعرف المزيد</Link>
                    </div>
                    <div className='block'>
                        <h1>4</h1>
                        <p>شهر يناير</p>
                        <Link to="#">اعرف المزيد</Link>
                    </div>
                    <div className='block'>
                        <h1>1</h1>
                        <p>شهر يناير</p>
                        <Link to="#">اعرف المزيد</Link>
                    </div>
                    <div className='block'>
                        <h1>2</h1>
                        <p>شهر يناير</p>
                        <Link to="#">اعرف المزيد</Link>
                    </div>
                    <div className='block'>
                        <h1>3</h1>
                        <p>شهر يناير</p>
                        <Link to="#">اعرف المزيد</Link>
                    </div>
                    <div className='block'>
                        <h1>4</h1>
                        <p>شهر يناير</p>
                        <Link to="#">اعرف المزيد</Link>
                    </div>
                </div>
            </div>
        </div>
);
}

export default Report;
