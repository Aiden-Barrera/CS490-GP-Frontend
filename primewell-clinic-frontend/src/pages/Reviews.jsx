import { useState, useEffect } from "react";
import {Flex, Input, Layout} from "antd"
import ReviewCard from "../components/ReviewCard"
import axios from "axios"

const Reviews = () => {

    const [reviewInfo, setReviewInfo] = useState([])
    
    const fetchReviewInfo = async () => {
        const res = await axios.get("http://localhost:3000/reviews")
        setReviewInfo(res.data)
    }
    
    useEffect(() => {
        fetchReviewInfo()
        console.log(reviewInfo)
    }, [])
    return (

    <Flex vertical justify="start" align="center" gap="60px" style={{
            background: "#ffffff", 
            borderRadius: "12px",
            padding: "33px 50px",
            width: "100%",
            overflowY: "auto",
            height: '1063px',
            marginLeft: '330px',
            
        }}>
            <h1 className="title" style={{ color: "#373b41", marginBottom: "10px", fontFamily: "Poppins"}} >List of Doctors</h1>

            <Input 
            style={{
                width: "500px", 
                borderRadius: 20,
                marginBottom: "20px"
                }} 
                size="large" 
                placeholder=" Search for doctors"/>
        
        <Flex vertical gap="20px" style={{
                width: "100%",
            }}>
                <ReviewCard />
                
        </Flex>
    </Flex>
        
    )
}

export default Reviews
