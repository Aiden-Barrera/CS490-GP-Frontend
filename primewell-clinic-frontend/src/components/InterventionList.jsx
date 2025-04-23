import { Flex } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const InterventionList = () => {
    const [interventions, setInterventions] = useState([]);

    return (
        <Flex
        vertical
        style={{
            background: "#ffffff",
            borderRadius: "12px",
            padding: "10px 10px",
            width: "100%",
            overflowY: "auto",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        }}
        >
            <Flex 
            justify="center" 
            align="center" 
            style={{
                width: "100%",
                height: "30px",
                fontWeight: "bold",
                background: "#F09C96",
                color: "#ffffff",
                borderRadius: "2px"}}>
                Intervention List 
            </Flex>
            <Flex 
            justify="left"
            style={{
                fontWeight: "bold",
            }}>Appointment Date: </Flex>
            <Flex
            style={{
                fontWeight: "bold",
            }}
            >
                Doctor: 
            </Flex>
            <Flex
            style={{
                fontWeight: "bold",
            }}
            >
                Doctor Feedback: 
            </Flex>
        </Flex>
    )
}

export default InterventionList