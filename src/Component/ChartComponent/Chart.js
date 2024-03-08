import { React, useEffect, useState } from "react";
import icon1 from "../img/Frame (1).png";
import icon2 from "../img/Frame (2).png";
import { Chart as Chartjs } from "chart.js/auto";
import { Bar, Doughnut, Line, PolarArea } from "react-chartjs-2";
import revenuData from "./revenueData.json";
import Data from "./Data.json";
import dataPolar from "./PolarArea.json"
import "./Chart.css";
import { fetchDataWithRetries } from "../function/FunctionApi";

function ContentDashboard() {
    const [apiData, setApiData] = useState("");

    useEffect(() => {
        fetchDataWithRetries("count", setApiData);
    }, []);

    return (
        <div className="contentDashboard" dir="rtl">
            <div className="content itemTwo">
                <div className="head">
                    <h3>عدد الباقات</h3>
                </div>
                <p>{apiData.offersCount}</p>
                <PolarArea
                    data={{
                        labels: ["الفضيه", "الذهبيه", "البرنزيه"],
                        datasets: [
                            {
                                label: "Dataset 1",
                                data: dataPolar.map((data) => data.revenue),
                                backgroundColor: ["#01745787", "#C4C4C487", "#D9AC6Bb3"],
                            },
                        ],
                    }}
                />
            </div>
            <div className="content itemOne">
                <div className="head">
                    <h3> عدد الجلسات</h3>
                    <img src={icon1} alt="" />
                </div>
                <p>{apiData.sliderCount}</p>
                <Bar
                    data={{
                        labels: ["A", "B", "C", "D", "E", "F", "G" , "H" , "I", "J" , "K"],
                        datasets: [
                            {
                                backgroundColor: [
                                    "#017457",
                                    "#C4C4C4",
                                    "#017457",
                                    "#C4C4C4",
                                    "#017457",
                                    "#C4C4C4",
                                    "#017457",
                                    "#C4C4C4",
                                    "#017457",
                                    "#C4C4C4",
                                ],
                                // label:"Revenue",
                                data: [50, 100, 200, 300, 400, 500, 400,  300 , 200, 100 , 50],
                                // borderRadius: 5,
                            },
                        ],
                    }}
                />
            </div>
            <div className="content itemFour">
                <div className="head">
                    <h3>عدد المعلمون و الطلاب</h3>
                </div>
                <p>{apiData.offersCount}</p>
                <Line
                    data={{
                        labels: revenuData.map((data) => data.label),
                        datasets: [
                            {
                                label: "المعلمون",
                                data: revenuData.map((data) => data.revenue),
                                backgroundColor: "#017457",
                                borderColor: "#017457",
                            },
                            {
                                label: "الطلاب",
                                data: Data.map((data) => data.revenue),
                                backgroundColor: "#D9AC6B",
                                borderColor: "#D9AC6B",
                            },
                        ],
                    }}
                />
            </div>
            <div className="content itemThree">
                <div className="head">
                    <h3> عدد الاشتركات</h3>
                    <img src={icon2} alt="" />
                </div>
                <p>{apiData.adminCount}</p>
                <div className="canvas">
                    <Doughnut
                        data={{
                            labels: ["A", "B", "C", "D"],
                            datasets: [
                                {
                                    backgroundColor: ["#C4C4C4", "#D9AC6B", "#017457", "#A4856B"],
                                    data: [200, 300, 300, 150],
                                    borderRadius: 5,
                                },
                            ],
                        }}
                        options={{ cutout: "60%" }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ContentDashboard;
