import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
    Chart as ChartJS,
    BarElement,
    BarController,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend);

const CalorieChart = (props) => {
    const [patientSurveyData, setPatientSurveyData] = useState([]);
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const getPatientSurveyData = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3000/patientsurvey/${props.info.patient_id}`
            );
            console.log(res.data);
            setPatientSurveyData(res.data);
        } catch (error) {
            console.error("Error fetching patient survey data:", error);
        }
    };

    useEffect(() => {
        getPatientSurveyData();
    }, []);

    useEffect(() => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const calorieData = new Array(7).fill(null);

        patientSurveyData.forEach((entry) => {
            const date = new Date(entry.Survey_Date);
            // console.log(date);
            const dayIndex = (date.getDay() + 6) % 7;
            calorieData[dayIndex] = entry.Caloric_Intake;
        });


        if (chartRef.current) {
            chartInstanceRef.current = new ChartJS(chartRef.current, {
                type: 'bar',
                data: {
                    labels: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"],
                    datasets: [
                        {
                            label: "Caloric Intake",
                            data: calorieData,
                            backgroundColor: [
                                "#a78bfa",
                                "#f87171",
                                "#67e8f9",
                                "#fbbf24",
                                "#4ade80",
                                "#c084fc",
                                "#60a5fa",
                            ],
                            borderRadius: 6,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: 2000,
                            max: 4000,
                            ticks: {
                                stepSize: 200,
                            },
                        },
                    },
                },
            });
        }

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [patientSurveyData]);

    return (
        <div
            style={{
                background: "#ffe6e6",
                borderRadius: "12px",
                padding: "33px 40px",
                width: "100%",
                height: "500px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
        >
            <canvas ref={chartRef} />
        </div>
    );
};

export default CalorieChart;
