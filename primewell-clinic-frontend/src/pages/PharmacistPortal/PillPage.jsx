import {Flex, Input} from "antd"
import { useEffect, useState } from "react"
import PillFilter from "../../components/PillFilter"
import axios from "axios"
const PillPage = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get("http://localhost:3000/pharmacies"); // update with your actual API endpoint
                setUserInfo(response.data);
            } catch (error) {
                console.error("Failed to fetch user info:", error);
            } 
        };

        fetchUserInfo();
    }, []);
    return (
        <Flex vertical justify="start" align="center" gap="60px" style={{
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            padding: "33px 40px",
            width: "100%",
            overflowY: "auto"
        }}>
            <Flex 
                justify="space-between" 
                align="center" 
                style={{ 
                    backgroundColor: "#ffffff", 
                    textAlign: "center",
                    width:'100%'}}>
                    <Flex
                    vertical
                    justify="start"
                    align="start"
                    style={{ 
                        background: "#fffff", 
                        width: "100%", 
                        marginBottom: "-20px"
                    }}
                    >
                       <h2 style={{fontFamily: "Poppins", fontSize: "22px", color: "#000000"}}>Pill Page</h2> 
                       <div style={{marginTop: "-10px", fontFamily: "Poppins", fontSize: "14px", color: "#F09C96"}}> {userInfo?.[0]?.Company_Name} </div>
                    </Flex>
            </Flex>
            <Flex vertical gap="20px" style={{
                width: "100%",
            }}>
                <PillFilter/>
            </Flex>
        </Flex>
    );
};

export default PillPage;