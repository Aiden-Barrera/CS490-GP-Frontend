import {Button, Flex, Calendar} from "antd"
import { useState } from "react"
import dayjs from 'dayjs';

const RequestCard = (props) => {
    const [btnClicked, setBtnClicked] = useState(false)
    const [selectDate, setSelectDate] = useState(() => dayjs('2017-01-25'))

    const handleSelect = (value) => {
        setSelectDate(value)
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
                <Flex style={{backgroundColor: "#ffe6e2"}}>
                    <Calendar fullscreen={false} onSelect={handleSelect} style={{width: "300px", border: "1px solid #666666", borderRadius: "9px"}} />
                    <Flex>
                        {selectDate.format('YYYY-MM-DD')}
                    </Flex>
                </Flex>
            )}
        </Flex>
    )
}

export default RequestCard