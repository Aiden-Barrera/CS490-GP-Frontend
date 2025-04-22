import axios from "axios";
import { useState, useEffect } from "react";
import { Flex } from "antd";

const Regiment = ({ info }) => {
    const [regimentData, setRegimentData] = useState(null);
    const dayOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {
        const fetchRegimentInfo = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/regiment/${info.patient_id}`);
                console.log("Fetched data:", res.data);
    
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setRegimentData(res.data[0].Regiment); // Grab nested object
                } else {
                    setRegimentData({});
                }
            } catch (err) {
                console.error("Error Fetching Regiment: ", err);
            } 
        };

        if (info?.patient_id) {
            fetchRegimentInfo();
        }
    }, [info]);

    return (
        <Flex vertical 
        justify="flex-start" 
        align="center" 
        style={{ 
            backgroundColor: "#ffffff", 
            borderRadius: "16px", 
            width: "100%", 
            height: "100%", 
            padding: "20px",
            marginBottom: "20px",
            overflowY: "auto"
             }}>
            <h1>Regiment</h1>

            {regimentData &&
                Object.entries(regimentData).sort(([a], [b]) => dayOrder.indexOf(a) - dayOrder.indexOf(b)).map(([day, exercises]) => (
                    <Flex vertical  key={day} style={{ marginBottom: "15px", width: "80%", backgroundColor: "#f09c96", padding: "10px", borderRadius: "8px" }}>
                        <h2 style={{color: "#ffffff", marginTop: "-5px"}}>{day}</h2>
                        {exercises.length > 0 ? (
                            <Flex vertical>
                                {exercises.map((exercise, id) => (
                                    <Flex style={{color: "#ffffff"}} key={id} >{exercise}</Flex>
                                ))} 
                            </Flex>
                        ) : (
                            <Flex style={{ color: "#ffffff" }}>No exercises</Flex>
                        )}
                    </Flex>
                ))
            }
        </Flex>
    );
};

export default Regiment;
