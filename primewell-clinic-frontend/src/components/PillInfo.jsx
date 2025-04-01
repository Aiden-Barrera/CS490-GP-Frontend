import { Flex, Input} from "antd"
import { useEffect, useState } from "react"
import axios from "axios"

const PillInfo = (props) => {
    const [reviewInfo, setReviewInfo] = useState([])
    const [searchedPill, setSearchedPill] = useState("")
    const [filteredInfo, setFilteredInfo] = useState([])

    const fetchReviewInfo = async () => {
        const res = await axios.get("http://localhost:3000/pillbank")
        setReviewInfo(res.data)
    }

    useEffect(() => {
            fetchReviewInfo()
        }, [])
    
        const handleSearch = (e) => {
            setSearchedPill(e.target.value)
        }
    
        const filteredPill = reviewInfo.filter((review) => {
            if ( searchedPill === "" ) return reviewInfo
             
            return review.first_name.toLowerCase().includes(searchedPill.toLowerCase())
        })
    
        useEffect(() => {
            setFilteredInfo(filteredPill)
        }, [searchedPill])

    return (
        <Flex 
                align="start" 
                style={{
                    borderRadius: "10px", 
                    height: "750px", 
                    backgroundColor: "#ffffff",
                    width: "1155px",
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
                            marginTop: "50px"
                            }} >
                    <span>Medicine Name</span>
                    <span>ID</span>
                    <span>Price</span>
                    <span>Description</span>
                    <span>Count</span>
                    </Flex>
                    <hr style={{ width: "99.8%", height: "1px", backgroundColor: "#A8C4A2"}} />
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
                        <span>{`${props.pill_name}`}</span>
                        <span>{`${props.pill_id}`}</span>
                        <span>{`${props.cost}`}</span>
                        <span>{`${props.dosage}`}</span>
                    </Flex>
                </Flex>
            </Flex>
    )
}

export default PillInfo