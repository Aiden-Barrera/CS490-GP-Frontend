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
        <Flex justify="center" align="center" style={{
            height: "90vh",
            width: "98vw",
            margin: "80px 20px 20px",
            borderRadius: "20px"
        }}>
            <Flex vertical justify="center" align="center" gap="60px" style={{
                    background: "#ffffff", 
                    borderRadius: "12px",
                    padding: "33px 40px",
                    width: "60%",
                    maxWidth: "60%",
                    overflowY: "auto"
                }}>
                    <h1 className="title" style={{ color: "#373b41", marginBottom: "10px", marginTop: 0, fontFamily: "Poppins"}} >List of Doctors</h1>
                    <Input placeholder="Enter Doctor Name" style={{height: "45px", width: "50%"}}/>
                <Flex vertical gap="20px" style={{
                        width: "100%",
                    }}>
                        <ReviewCard />
                        
                </Flex>
            </Flex>
        </Flex>
        
    )
}

export default Reviews
