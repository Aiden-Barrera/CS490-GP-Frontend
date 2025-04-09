import {Button, Flex, Calendar} from "antd"

const SlotCard = ({index, timeSlot, onClick}) => {

    return (
        <>
            <Flex onClick={() => onClick(timeSlot, index)} style={{backgroundColor: "#ffe6e2", borderRadius: "9px", color: "#333333", padding: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"}}>
                <h2>{timeSlot}</h2>
            </Flex>
        </>
    )
}

export default SlotCard