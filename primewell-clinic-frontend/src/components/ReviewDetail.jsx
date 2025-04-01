import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Flex } from "antd";

const ReviewDetail = () => {
    const { id } = useParams(); // Get the review ID from the URL
    const [review, setReview] = useState(null);
    const [doctorInfo, setDoctorInfo] = useState(null)
    const [rating, setRating] = useState(0)

    const fetchDoctorInfo = async () => {
        try {
            const res1 = await axios.get(`http://localhost:3000/reviews/comments/${id}`)
            setReview(res1.data)
    
            const res2 = await axios.get(`http://localhost:3000/reviews/${id}`)
            setDoctorInfo(res2.data[0])
            setRating(parseFloat(res2.data[0]?.rating).toFixed(1))
        } catch (err) {
            console.log('Error getting Info: ', err)
        }
    }

    useEffect(() => {
        fetchDoctorInfo()
    }, [id]);


    return (
        <>
            <Flex vertical justify="center" align="center" style={{width: "100vw"}}>
                <Flex vertical justify="center" align="center" gap="20px" style={{
                    background: "#ffffff", 
                    borderRadius: "12px",
                    padding: "33px 40px",
                    width: "60%",
                    overflowY: "auto"
                }}>
                {/* Doctor Name with their Rating */}
                    <Flex justify="space-between" align="center" style={{width: "100%"}}>
                        <Flex vertical justify="center" align="flex-start" gap="5px" style={{color: "#333333", flex: 1}}> 
                            <h2>Quality</h2> 
                            <Flex justify="center" align="center"
                                style={{
                                    width: 'auto',
                                    borderRadius: "8px",
                                    backgroundColor: rating >= 4 ? '#80ed99' : rating >= 3 ? "#fee440" : "#ef476f",
                                    color: "#333333",
                                }}
                            >     
                                    <p style={{ fontSize: '50px', fontWeight: 'bold', margin: 0, padding: "15px" }}>{rating}<span style={{ fontSize: '25px', verticalAlign: 'super', marginLeft: '2px' }}> /5</span></p>
                            </Flex>
                            <p style={{fontWeight: "bold"}}>{doctorInfo?.cnt} Ratings</p>
                        </Flex>
                        <Flex vertical gap="5px" justify="center" style={{margin: "20px", height:"100%", flex: 1}}>
                            <Flex gap="10px" align="center">
                                <img src="/MaleDoctorIcon.svg" alt="Icon" style={{width: "48px"}} />
                                <h1 style={{margin: 0, color: "#333333"}}>{`${doctorInfo?.first_name} ${doctorInfo?.last_name}`}</h1>
                            </Flex>
                            <h2 style={{margin: 0, color: "#333333"}}>{doctorInfo?.specialty}</h2>   
                        </Flex>
                    </Flex>

                    {/* Section for comments */}

                </Flex>
            </Flex>
        </>
    )
}

export default ReviewDetail;