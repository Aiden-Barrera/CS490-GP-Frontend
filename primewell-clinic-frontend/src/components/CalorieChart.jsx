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

        // Filter data for the last 7 days
        const lastWeekData = patientSurveyData.filter((entry) => {
            const entryDate = new Date(entry.Survey_Date);
            const today = new Date();
            const diffInDays = Math.ceil((today - entryDate) / (1000 * 60 * 60 * 24));
            return diffInDays <= 7;
        });
        console.log("Lastweekdata: ", lastWeekData);
        const calorieData = new Array(7).fill(0); // Initialize with 0
        const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const today = new Date();
        const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)

        // Populate calorieData with values from the last 7 days
        lastWeekData.forEach((entry) => {
            const date = new Date(entry.Survey_Date);
            const dayIndex = (date.getDay() + 6) % 7; // Adjust to start from Monday
            calorieData[dayIndex] = entry.Caloric_Intake;
        });

        // Reorder labels and calorieData to start from the most recent day
        const reorderedLabels = [];
        const reorderedCalorieData = [];
        for (let i = 0; i < 7; i++) {
            const index = (currentDay - i + 6) % 7;
            reorderedLabels.unshift(labels[index]);
            reorderedCalorieData.unshift(calorieData[index]);
        }


        if (chartRef.current) {
            chartInstanceRef.current = new ChartJS(chartRef.current, {
                type: 'bar',
                data: {
                    labels: reorderedLabels, // Use reordered labels
                    datasets: [
                        {
                            label: "Caloric Intake",
                            data: reorderedCalorieData, // Use reordered calorie data
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
                            beginAtZero: true, // Ensure y-axis starts at 0
                            // min: 2000,  // Removed hardcoded min/max
                            // max: 4000,
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