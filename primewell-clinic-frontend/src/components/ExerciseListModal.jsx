import { Flex, Modal, message, Button, Input} from "antd"
import { useEffect, useState } from "react"

const ExerciseListModal = (props) => {

    useEffect(() => {
        if (props.open) {
            message.destroy()
        }
    }, [props.open])

    const handleClose = () => {
        message.destroy()
        props.handleClose()
    }

    return (
        <Modal open={props.open} footer={null} onCancel={handleClose} centered className="style-modal" width={1000} >
            <Flex 
                align="start" 
                style={{
                    borderRadius: "10px", 
                    height: "750px", 
                }}>
                <Flex vertical style={{ width: "100%" }}>
                    <Flex horizontal justify="space-between" align="start"  gap="20px"
                        style={{ 
                            justify:"space-between",
                            width: "100%",
                            gap:"20px",
                            backgroundColor: "#FFE4E1",
                            color: "#373b41", 
                            marginBottom: "10px", 
                            fontFamily: "Poppins",
                            marginTop: "20px"
                            }} >
                    <span>ID</span>
                    <span>Exercise Name</span>
                    <span>Muscle Group</span>
                    <span>Exercise Description</span>
                    <span>Reps</span>
                    <span>Sets</span>
                    </Flex>
                    <hr style={{ width: "100%", height: "1px", backgroundColor: "#ccc"}} />
                    <Flex horizontal justify="space-between" align="start"  gap="20px"
                        style={{ 
                            justify:"space-between",
                            width: "100%",
                            gap:"20px",
                            backgroundColor: "#ffffff",
                            color: "#373b41", 
                            marginBottom: "10px", 
                            fontFamily: "Poppins",
                            marginTop: "20px"
                            }} >
                        <span>1</span> 
                        <span>Push Ups</span>
                        <span>Shoulders</span>
                        <span>Push up exercise</span>
                        <span>10</span>
                        <span>3</span>
                    </Flex>
                </Flex>
            </Flex>
        </Modal>
    );
};

export default ExerciseListModal

{/* Format of exercises:
    <Flex horizontal justify="space-between" align="start"  gap="20px"
                    style={{ 
                        justify:"space-between",
                        width: "100%",
                        gap:"20px",
                        backgroundColor: "#ffffff",
                        color: "#373b41", 
                        marginBottom: "10px", 
                        fontFamily: "Poppins",
                        marginTop: "20px"
                        }} 
    >
                    <span>1</span>
                    <span>Push Ups</span>
                    <span>Shoulders</span>
                    <span>Push up exercise</span>
                    <span>10</span>
                    <span>3</span>
    </Flex>
*/}