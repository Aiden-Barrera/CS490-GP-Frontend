import { Flex } from "antd"

const TopDoctorCard = (props) => {

    return (
        <>
            <Flex gap="150px" justify="center" align="center" style={{padding: "25px"}}>
                {props.side === "left" ? 
                    <>
                        <img src="/doctorImg.webp" alt="Img" style={{width: "350px", height: "auto"}} />
                        <Flex gap="10px" vertical align="start">
                            <h2 style={{color: "#000000", fontSize: "24px", margin: "0"}}>{props.name}</h2>
                            <p style={{color: "#666666", fontSize: "18px", margin: "0"}}>Specialist in Cardiology</p>
                        </Flex>
                    </>
                 : 
                    <>
                        <Flex gap="10px" vertical align="start">
                            <h2 style={{color: "#000000", fontSize: "24px", margin: "0"}}>{props.name}</h2>
                            <p style={{color: "#666666", fontSize: "18px", margin: "0"}}>Specialist in Cardiology</p>
                        </Flex>
                        <img src="/doctorImg.webp" alt="Img" style={{width: "350px", height: "auto"}} />
                    </>
                }
            </Flex>
        </>
    )
}

export default TopDoctorCard