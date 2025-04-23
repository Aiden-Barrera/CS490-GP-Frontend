import { Button, Flex } from "antd";
import { LeftOutlined, RightOutlined  } from "@ant-design/icons";
import axios from "axios";
import { use, useEffect, useState } from "react";

const InterventionList = () => {
    const [interventions, setInterventions] = useState([]);
    const [arrayList, setArrayList] = useState(0);

    const minusIndex = () => {
        if (arrayList > 0)
        setArrayList(arrayList - 1);
    }

    const plusIndex = () => {
        setArrayList(arrayList + 1);
    }

    useEffect(() => {
        console.log("arrayList: ", arrayList);
    })
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
                fontSize: "16px",
                background: "#F09C96",
                color: "#ffffff",
                borderRadius: "2px"}}>
                Intervention List 
            </Flex>
            <Flex 
            justify="left"
            style={{
                fontWeight: "bold",
            }}
            >
                Appointment Date:
            </Flex>
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
            <Flex
            horizontal
            style={{
                background: "#ffffff",
                width: "50%",
                alignSelf: "center",
                gap: "10px"
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
            onClick={() => minusIndex()}
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
            onClick={() => plusIndex()}
            />
        </Flex>
        </Flex>
        
    )
}

export default InterventionList