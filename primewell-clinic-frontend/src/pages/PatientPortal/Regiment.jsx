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
        <Flex vertical 
        justify="flex-start" 
        align="center" 
        style={{ 
            backgroundColor: "#ffffff", 
            borderRadius: "16px", 
            width: "100%", 
            height: "100%", 
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", 
            padding: "20px",
            marginBottom: "20px",
            overflowY: "auto"
             }}>
            <h1>Regiment</h1>

            {regimentData &&
                Object.entries(regimentData).map(([day, exercises]) => (
                    <div key={day} style={{ marginBottom: "15px", width: "80%", backgroundColor: "#f09c96", padding: "10px", borderRadius: "8px" }}>
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
    );
};

export default Regiment;
