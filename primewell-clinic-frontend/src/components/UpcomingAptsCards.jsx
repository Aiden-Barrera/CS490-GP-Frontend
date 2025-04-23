import { Flex, Layout, Button } from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

const { Content } = Layout;

const UpcomingAptsCards = (props) => {
  const [date, setDate] = useState(() => dayjs())
  const navigate = useNavigate()


  useEffect(() => {
    setDate(dayjs(props.Date))
  }, [])

  const PatientData = ({ name }) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center", // Vertically centers text
          height: "100%", // Takes full height of the parent
          paddingLeft: 10, // Ensures left alignment
        }}
      >
        <h2
          style={{
            color: "white",
            backgroundColor: "#f09c96",
            fontSize: 36,
            fontFamily: "Poppins",
            margin: 0,
          }}
        >
          {name}
        </h2>
      </div>
    );
  };

  const handleClick = async () => {
    console.log(props?.appt_id)
    const body = {
      Appointment_ID: props.appt_id,
      Doctor_ID: props.doctor_id
    }
    await axios.patch("http://localhost:3000/startAppointment", body)
    navigate("/DoctorPortal/ApptChannel", {
        state: {
          appt_id: props?.appt_id, 
        }
    })
  }

  return (
    <Layout
      style={{
        borderRadius: 8,
        overflow: "hidden",
        width: "100%",
        height: "150px",
        backgroundColor: "#f09c96",
        display: "flex",
        flexShrink: 0,
        alignItems: "center",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Content
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          width: "100%",
          height: "100%",
          color: "white",
        }}
      >
        <Flex style={{ flexDirection: "column", marginLeft: "20px" }} gap="10px">
          <Flex gap="10px">
            <CalendarOutlined style={{ fontSize: "24px", color: "white" }} />
            <h2 style={{color: "#ffffff", fontSize: "20px", borderRight: "3px solid #ffffff", paddingRight: "18px", margin: 0, fontWeight: "800"}}>
              {date.format("MMM D, YYYY")} 
            </h2>
            <h2 style={{color: "#ffffff", fontSize: "20px", paddingLeft: "9px", margin: 0, fontWeight: "800"}}>{props.Time}</h2>
          </Flex>
          <Flex gap="10px">
            <UserOutlined style={{ fontSize: "24px", color: "white" }} />
            <h2 style={{color: "#ffffff", fontSize: "20px", borderRight: "3px solid #ffffff", paddingRight: "18px", margin: 0, fontWeight: "800"}}>
              {props.Fname} {props.Lname} 
            </h2>
            <h2 style={{color: "#ffffff", fontSize: "20px", paddingLeft: "9px", margin: 0, fontWeight: "800"}}>{props.Tier}</h2>
          </Flex>
        </Flex>
        <Button type="primary" style={{fontWeight: "700", fontSize: "18px", backgroundColor: "#ffe6e2", color: "#333333", padding: "20px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"}} onClick={handleClick}>
            Start Appointment
        </Button>
      </Content>
    </Layout>
  );
};

export default UpcomingAptsCards;
