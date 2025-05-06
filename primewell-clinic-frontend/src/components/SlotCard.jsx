import {Button, Flex, Calendar} from "antd"
import "./../App.css"

const SlotCard = ({index, timeSlot, onClick, isActive}) => {

    return (
        <>
            <Flex id={`slot-card-${index}`} vertical justify="center" align="center" gap="5px" className={`slot-card ${isActive ? "active" : ""}`} onClick={() => onClick(timeSlot, index)} style={{ borderRadius: "9px", padding: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"}}>
                <h2>{timeSlot}</h2>
            </Flex>
        </>
    )
}

export default SlotCard