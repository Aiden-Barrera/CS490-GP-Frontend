import {Flex, Input} from "antd"
import { useEffect, useState } from "react"
import axios from "axios"
import RequestCard from "../../components/RequestCard"
import PillInfo from "../../components/PillInfo"

const PillPage = () => {
    const [pillsInfo, setPillsInfo] = useState([])
    const [reviewInfo, setReviewInfo] = useState([])
    const [searchedPill, setSearchedPill] = useState("")
    const [filteredInfo, setFilteredInfo] = useState([])

    const fetchPillsInfo = async () => {
        const res = await axios.get("http://localhost:3000/pillbank")
        setReviewInfo(res.data)
    }
    
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

        useEffect(() => {
            fetchPillsInfo()
            console.log(pillsInfo)
        }, [])

    return (
        <Flex vertical justify="start" align="center" gap="60px" style={{
            background: "#ffffff", 
            borderRadius: "12px",
            padding: "33px 40px",
            width: "100%",
            overflowY: "auto"
        }}>
            <Flex 
                justify="space-between" 
                align="center" 
                style={{ 
                    backgroundColor: "#000000", 
                    textAlign: "center",
                    width:'100%'}}>
                    <Flex
                    vertical
                    justify="start"
                    align="start"
                    style={{ 
                        background: "#A8C4A2", 
                        padding: "20px 30px", 
                        width: "100%", 
                    }}
                    >
                       <h2>Pill Page</h2> 
                       <div style={{marginLeft: "20px"}}>CVS</div>
                    </Flex>
                    <Input placeholder="Search by Pill Name" value={searchedPill} onChange={handleSearch} enterButton={false} style={{fontSize: "14px", height: "40px", width: "257px", marginRight: "20px"}}
                        prefix={<img src="/searchIcon.svg" alt="Icon" style={{width: "24px", marginRight: "5px"}}/>}
                    />
                    {/* Replace with filtering option */}
                    <Input placeholder="Search by Pill Name" value={searchedPill} onChange={handleSearch} enterButton={false} style={{fontSize: "14px", height: "40px", width: "257px", marginRight: "20px"}}
                        prefix={<img src="/searchIcon.svg" alt="Icon" style={{width: "24px", marginRight: "5px"}}/>}
                    /> 
                    </Flex>
            <Flex vertical gap="20px" style={{
                width: "100%",
            }}>
                {pillsInfo.map((user, index) => (
                    <RequestCard key={index} info={user} />
                ))}
            </Flex>
        </Flex>
    );
};

export default PillPage;