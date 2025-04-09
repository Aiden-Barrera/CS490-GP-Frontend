import {Button, Flex, Calendar} from "antd"
import { useState, useEffect } from "react"
import axios from "axios";
import dayjs from 'dayjs';
import SlotCard from "./SlotCard";
const disabledDate = (current) => {
    const now = dayjs();
    return current.month() !== now.month() || current.year() !== now.year();
  };

const RequestCard = (props) => {
    const [btnClicked, setBtnClicked] = useState(false)
    const [selectDate, setSelectDate] = useState(() => dayjs())
    const [daySchedule, setDaySchedule] = useState(null)
    const [timeSlot, setTimeSlot] = useState("")

    const handleSelect = (value) => {
        setSelectDate(value)
    }

    const fetchDaySchudule = async () => {
        const body = {
            doc_id: props.info.doctor_id,
            day: selectDate.format("dddd")
        }
        console.log(body)
        const res = await axios.post("http://localhost:3000/getDoctorSchedule", body)
        setDaySchedule(res.data)
        console.log(res.data)
    }

    useEffect(()=>{
        fetchDaySchudule()
    }, [selectDate])

    const handleClick = (value, key) => {
        console.log(value + " " + key)
    }

    
    return (
        <Flex vertical gap="10px" style={{
            background: "#f09c96", 
            padding: "20px 30px", 
            width: "100%", 
            maxWidth: "100%", 
            borderRadius: "8px",
            boxSizing: "border-box",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
        }}>
            {/* Section for Displaying Doctor Info and Availablilty */}
            <Flex align="center" justify="space-between">
                <Flex>
                    <Flex gap="10px">
                        <img src="/firstAidIcon.svg" alt="Icon" style={{ 
                            width: "52px", 
                            height: "auto", 
                            borderRadius: "10px",
                            flexShrink: 0
                        }} />
                        <h2 style={{color: "#ffffff", fontSize: "32px", borderRight: "3px solid #ffffff", paddingRight: "18px", margin: 0}}>Dr. {`${props.info.first_name} ${props.info.last_name}`}</h2>
                        <h2 style={{color: "#ffffff", fontSize: "32px", borderRight: "3px solid #ffffff", paddingLeft: "9px", paddingRight: "18px", margin: 0}}>{`${props.info.specialty}`}</h2>
                        <h2 style={{color: "#ffffff", fontSize: "32px", paddingLeft: "9px", margin: 0}}>{props.info.availability === 1 ? "Available" : "Not Available"}</h2>
                    </Flex>
                </Flex>
                {props.info.availability === 1 ? (
                    <Button type="primary" style={{
                        borderRadius: "40%",  // Fully circular shape
                        width: "50px",        // Ensures the button remains a circle
                        height: "50px",
                        display: "flex",      // Centers the image inside
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#ffe6e2",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
                    }} onClick={() => setBtnClicked(!btnClicked)}>
                        <img src="/downArrow.svg" alt="Icon" style={{
                            width: "32px", // Ensures circular shape
                            height: "32px",
                        }} />
                    </Button>
                ) : null}
            </Flex>

            {/* Section for Displaying Sending Request */}
            {btnClicked && (
                <Flex gap="20px">
                    <Calendar fullscreen={false} onSelect={handleSelect} disabledDate={disabledDate} style={{width: "300px", border: "1px solid #999999", borderRadius: "9px", backgroundColor: "#ffe6e2", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"}} />
                    <Flex vertical gap="50px" justify="center" align="flex-start">
                        <Flex gap="20px" justify="center" align="flex-start">
                            {daySchedule?.[0]?.Slots.map((timeSlot, index) => (
                                <SlotCard key={index} index={index} timeSlot={timeSlot} setTimeSlot={setTimeSlot} onClick={handleClick}/>
                            ))}
                        </Flex>
                        <Flex >
                            <Button type="primary" style={{fontWeight: "700", fontSize: "24px", backgroundColor: "#ffe6e2", color: "#333333", padding: "20px"}} >
                                Send Request
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            )}
        </Flex>
    )
}
export default RequestCard