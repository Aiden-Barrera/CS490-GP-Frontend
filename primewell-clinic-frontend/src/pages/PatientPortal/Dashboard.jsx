import { Button, Flex } from "antd"
import CalorieChart from "../../components/CalorieChart";
import WeightChart from "../../components/WeightChart";

const Dashboard = (props) => {
    return (
        <Flex vertical justify="start" align="center" gap="60px" style={{
            background: "#ffffff",
            borderRadius: "12px",
            padding: "10px 40px",
            width: "100%",
            overflowY: "auto",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            // flexDirection: "row"
        }}>
            <Flex justify="center" align="center" style={{ height: "100vh", margin: "25% 0" }}>
                <h1 style={{ color: "#333333", marginBottom: 0, marginTop: 0 }}>Welcome {props.info?.First_Name} to your Dashboard!</h1>
            </Flex>
            <Flex vertical justify="center" align="center" gap="50px" style={{ marginTop: "100px", maxWidth: "400px" }}>
                <h1 style={{ color: "#333333", marginBottom: 0, marginTop: 0 }}>Daily Progress</h1>
                <Flex gap="50px" style={{marginBottom: "100px"}}>
                    <CalorieChart info={props.info} />
                    <WeightChart info={props.info} />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Dashboard;