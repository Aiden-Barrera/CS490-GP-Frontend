import { useState } from "react";
import {Flex} from "antd"
import "./../App.css"
import TopDoctorCard from "../components/TopDoctorCard";

const Home = () => {

    return (
        <>
            <Flex justify="center" align="center" style={{height: "70vh", width: "100vw", marginTop: "180px", marginBottom: "100px"}}>
                <div className="text-container">
                    <h1 className="title" style={{color: "#ffffff"}}>Empowering healthier lives with <span style={{color: "#f09c96", fontWeight: "900"}}>expert care </span> 
                        and <span style={{color: "#f09c96", fontWeight: "900"}}>proven results</span>. 
                        Your wellness starts <span style={{color: "#f09c96", fontWeight: "900"}}>here</span>.
                    </h1>
                </div>
            </Flex>
            <Flex vertical className="topDoctor-container" justify="center" align="center" style={{ width: "100vw"}}>
                <Flex vertical gap="150px" justify="center" align="center" style={{margin: "140px"}}>
                    <TopDoctorCard name="Doctor 1" side="left" />
                    <TopDoctorCard name="Doctor 2" side="right" />
                    <TopDoctorCard name="Doctor 3" side="left" />
                </Flex>
            </Flex>
        </>
    )
}

export default Home