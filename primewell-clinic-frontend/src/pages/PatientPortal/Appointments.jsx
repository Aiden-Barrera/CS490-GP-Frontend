import {Button, Flex} from "antd"
import { useEffect, useState } from "react"
import axios from "axios"
import RequestCard from "../../components/RequestCard"
import AppointmentCard from "../../components/AppointmentCard";

const Appointments = ({userInfo}) => {
    const [appointmentInfo, setAppointmentInfo] = useState([])

    const fetchDoctorInfo = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/appointment/patient/${userInfo?.patient_id}`)
            console.log(res.data)
            setAppointmentInfo(res.data)
        } catch (err) {
            console.log("Error Fetching Doctor: ", err)
        }
    }

    useEffect(() => {
        fetchDoctorInfo()
    }, [])

    return (
        <Flex vertical justify="start" align="center" gap="60px" style={{
            background: "#ffffff", 
            borderRadius: "12px",
            padding: "33px 40px",
            width: "100%",
            overflowY: "auto",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
        }}>
            <h1 style={{color: "#333333", marginBottom: 0}}>Upcoming Appointments</h1>
            <Flex vertical gap="20px" style={{
                width: "100%",
                overflow: "auto"
            }}>
                {appointmentInfo?.map((user, index) => (
                    <AppointmentCard key={index} apptInfo={user}/>
                ))}
            </Flex>
        </Flex>
    );
};

export default Appointments;