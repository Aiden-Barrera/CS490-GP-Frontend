import axios from "axios";
import { useState, useEffect } from "react";
import { Flex } from "antd";

const Regiment = ({ info }) => {
    const [regimentData, setRegimentData] = useState(null);
    const [loading, setLoading] = useState(true);

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
            } finally {
                setLoading(false);
            }
        };

        if (info?.patient_id) {
            fetchRegimentInfo();
        }
    }, [info]);

    return (
        <Flex vertical justify="start" align="center" gap="60px" style={{
            background: "#ffffff", 
            borderRadius: "12px",
            padding: "33px 40px",
            width: "100%",
            // overflow: "auto",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
        }}>
            <h1 style={{color: "#333333", marginBottom: 0}}>Regiment</h1>

             <Flex vertical gap="15px" justify="start" align="center" style={{width: "100%", overflow: "auto"}}>
                {regimentData &&
                    Object.entries(regimentData).map(([day, exercises]) => (
                        <div key={day} style={{ 
                            background: "#f09c96", 
                            padding: "20px 30px", 
                            width: "100%", 
                            maxWidth: "100%", 
                            borderRadius: "8px",
                            boxSizing: "border-box",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
                        }}>
                            <strong>{day}</strong>
                            {exercises.length > 0 ? (
                                <ul>
                                    {exercises.map((exercise, id) => (
                                        <p key={id}>{exercise}</p>
                                    ))} 
                                </ul>
                            ) : (
                                <p style={{ color: "#000000" }}>No exercises</p>
                            )}
                        </div>
                    ))
                }
             </Flex>
        </Flex>
    );
};

export default Regiment;
