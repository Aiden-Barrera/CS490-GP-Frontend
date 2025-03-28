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
    }, [])

    return (
        <Flex justify="center" align="center" style={{
            height: "auto", width: "100vw", marginTop: "180px", marginBottom: "100px"
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
                    {reviewInfo.map((user, index) => (
                        <ReviewCard key={index} info={user}/>     
                    ))}
                </Flex>
            </Flex>
        </Flex>
        
    )
}

export default Reviews
