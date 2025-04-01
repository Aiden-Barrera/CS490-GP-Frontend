import {Flex} from "antd"
import { useEffect, useState } from "react"
import axios from "axios"
import RequestCard from "../../components/RequestCard"

const PillPage = () => {
    const [pillsInfo, setPillsInfo] = useState([])

    const fetchDoctorInfo = async () => {
        const res = await axios.get("http://localhost:3000/pillbank")
        setPillsInfo(res.data)
    }

    useEffect(() => {
        fetchDoctorInfo()
        console.log(pillsInfo)
    }, [])

    return (
        <Flex vertical justify="start" align="center" gap="60px" style={{
            background: "#ffffff", 
            borderRadius: "12px",
            padding: "33px 40px",
            width: "100%",
            overflowY: "auto"
        }}>
            <h1 style={{color: "#333333", marginBottom: 0}}>Pill Page</h1>
            <Flex vertical gap="20px" style={{
                width: "100%",
            }}>
                {pillsInfo.map((user, index) => (
                    <RequestCard key={index} info={user} />
                ))}
            </Flex>
        </Flex>
    );
};

export default PillPage;