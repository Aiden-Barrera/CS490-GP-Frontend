import { Flex } from "antd";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Chart as ChartJS, LineElement, LineController, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const WeightChart = (props) => {
    const [patientSurveyData, setPatientSurveyData] = useState([]);
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const getPatientSurveyData = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3000/patientsurvey/${props.info.patient_id}`
            );
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

        if (chartRef.current) {
            chartInstanceRef.current = new ChartJS(chartRef.current, {
                type: 'line',
                data: {
                    labels: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"],
                    datasets: [
                        {
                            label: "Weight",
                            data: patientSurveyData.map((entry) => entry.Weight),
                            borderColor: "#4ade80",
                            backgroundColor: "rgba(74, 222, 128, 0.2)",
                            borderWidth: 2,
                            tension: 0.4,
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
                            min: 70,
                            max: 300,
                            ticks: {
                                stepSize: 5,
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
        <Flex
            vertical
            justify="start"
            align="center"
            gap="30px"
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
        </Flex>
    );
};

export default WeightChart;

