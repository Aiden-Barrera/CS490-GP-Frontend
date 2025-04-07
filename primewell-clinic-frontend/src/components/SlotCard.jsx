import {Button, Flex, Calendar} from "antd"
import axios from "axios"

const SlotCard = ({timeSlot}) => {

    return (
        <>
            <Flex style={{backgroundColor: "#ffe6e2", borderRadius: "9px", color: "#333333", padding: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"}}>
                <h2>{timeSlot}</h2>
            </Flex>
        </>
    )
}

export default SlotCard