import { Flex, Modal, Form, message, Button, Input, Rate, notification } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import PaymentCard from "../../components/PaymentCard"

const Payment = ({userInfo}) => {
    const [paymentInfo, setPaymentInfo] = useState(null)

    const fetchPayments = async () => {
        const res = await axios.get(`http://localhost:3000/paymentAppointments/${userInfo?.patient_id}`)
        console.log(res.data)
        setPaymentInfo(res.data)
    }

    useEffect(() => {
        fetchPayments()
    }, [])

    return (
        <Flex vertical justify="start" align="center" gap="60px" style={{
            background: "#ffffff", 
            borderRadius: "12px",
            padding: "33px 40px",
            width: "100%",
            // overflow: "auto",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
        }}>
            <h1>Payment Portal</h1>
            <Flex vertical gap="20px" style={{
                width: "100%",
                // overflow: "auto"
            }}>
                {paymentInfo?.map((payment, index) => (
                    <PaymentCard key={index} paymentInfo={payment} fetchPayments={fetchPayments} userName={userInfo.First_Name + ' ' + userInfo.Last_Name}/>
                ))}
            </Flex>
        </Flex>

    )
}

export default Payment