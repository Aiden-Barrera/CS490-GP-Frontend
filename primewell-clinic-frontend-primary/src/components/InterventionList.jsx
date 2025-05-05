import { Button, Flex } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
const InterventionList = ({ info }) => {
    const [interventions, setInterventions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const fetchInterventionInfo = async () => {
            try {
                console.log("Passed info: ", info);
                const res = await axios.get(`http://localhost:3000/appointmentInfo/${info?.patient_id}`);
                setInterventions(Array.isArray(res.data) ? res.data : [res.data]);
                setCurrentIndex(0); //for shifting through feedbacks
                console.log("API info: ", res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchInterventionInfo();
    }, []);
    const current = interventions[currentIndex];
    if (!current) return null;
    const formattedDate = dayjs(current.Appt_Date).format("MMMM D");
    return (
        <Flex
            vertical
            style={{
                background: "#ffffff",
                borderRadius: "12px",
                padding: "10px 10px",
                width: "100%",
                height: "200px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Flex
                justify="center"
                align="center"
                style={{
                    width: "600px",
                    height: "100px",
                    fontWeight: "bold",
                    fontSize: "16px",
                    background: "#F09C96",
                    color: "#ffffff",
                    borderRadius: "2px",
                    marginBottom: "5px",
                }}
            >
                Intervention List
            </Flex>
            <Flex style={{ fontWeight: "bold", marginBottom: "5px" }}>
                Appointment Date: {formattedDate}
            </Flex>
            <Flex style={{ fontWeight: "bold", marginBottom: "5px" }}>
                Doctor: {current.Doctor}
            </Flex>
            <Flex style={{ fontWeight: "bold", marginBottom: "5px", flex: 1 }}>
                Doctor Feedback: {current.Doctors_Feedback}
            </Flex>
    
            <Flex
                justify="end"
                align="center"
                style={{
                    width: "50%",
                    alignSelf: "center",
                    gap: "10px",
                    marginTop: "auto",
                }}
            >
                <Button
                    style={{
                        background: "#F09C96",
                        color: "#ffffff",
                        fontWeight: "bold",
                        width: "50%",
                        height: "30px",
                        borderRadius: "2px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                    icon={<LeftOutlined />}
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((i) => i - 1)}
                />
    
                <Button
                    style={{
                        background: "#F09C96",
                        color: "#ffffff",
                        fontWeight: "bold",
                        width: "50%",
                        height: "30px",
                        borderRadius: "2px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                    icon={<RightOutlined />}
                    disabled={currentIndex === interventions.length - 1}
                    onClick={() => setCurrentIndex((i) => i + 1)}
                />
            </Flex>
        </Flex>
    );
};
export default InterventionList;    