import { Flex } from "antd";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import dayjs from "dayjs";
import {
    Chart as ChartJS,
    LineElement,
    LineController,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import apiDB from "../api";

ChartJS.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const WeightChart = (props) => {
    const [patientSurveyData, setPatientSurveyData] = useState([]);
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const getPatientSurveyData = async () => {
        try {
            const res = await apiDB.get(
                `/patientsurvey/${props.info.patient_id}`
            );
            console.log("Survey Data for Weight: ", res.data);
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

        const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
        const weightSums = new Array(7).fill(0);
        const weightCounts = new Array(7).fill(0);

        // Group weights by weekday and sum them up
        patientSurveyData.forEach((entry) => {
            const date = dayjs(entry.Survey_Date);
            const weekdayIndex = date.day(); // 0 = Sunday, ..., 6 = Saturday
            weightSums[weekdayIndex] += entry.Weight;
            weightCounts[weekdayIndex] += 1;
        });

        // Compute average for each weekday
        const weightAverages = weightSums.map((sum, index) =>
            weightCounts[index] > 0 ? sum / weightCounts[index] : null
        );

        if (chartRef.current) {
            chartInstanceRef.current = new ChartJS(chartRef.current, {
                type: "line",
                data: {
                    labels: weekdayLabels,
                    datasets: [
                        {
                            label: "Weight",
                            data: weightAverages,
                            borderColor: "#4ade80",
                            backgroundColor: "rgba(74, 222, 128, 0.2)",
                            borderWidth: 2,
                            tension: 0.5,
                            segment: {
                            borderDash: ctx => {
                                const { p0, p1 } = ctx;
                                if (p0.skip || p1.skip || p0.parsed.y === null || p1.parsed.y === null) {
                                return [6, 6]; // dashed line
                                }
                                return undefined;
                            },
                            borderColor: ctx => {
                                const { p0, p1 } = ctx;
                                if (p0.parsed.y === null || p1.parsed.y === null) {
                                return "rgba(0,0,0,0.2)"; // faint gray line
                                }
                                return undefined;
                            }
                            },
                            spanGaps: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    spanGaps: true,
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
