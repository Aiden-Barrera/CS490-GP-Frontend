import { useEffect, useState,  } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { Flex, Input, Button } from "antd";
import axios from "axios";
import dayjs from "dayjs";

const socket = io.connect("http://localhost:3000");

const ApptChannel = ({userInfo}) => {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [appt_id, setAppt_ID] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const [senderName, setSenderName] = useState("")

  const fetchMessages = async () => {
    const body = {
      Appointment_ID: location.state.appt_id
    }

    const res = await axios.post("http://localhost:3000/fetchApptMessages", body)

    setChatLog(res.data)
    console.log("Message Sent to DB: ", res.data)
  }

  useEffect(() => {
    if (location.state?.appt_id) {
      setAppt_ID(location.state.appt_id)
      console.log("Joining room:", location.state.appt_id); // <- check this
      fetchMessages()

      socket.emit("join_appointment", location.state.appt_id);


      socket.on("receive_msg", (data) => {
        setChatLog((prev) => [...prev, data]);
      });

      return () => {
        socket.off("receive_msg");
      };
    }
  }, [location.state]);

  const sendMessage = () => {
    const messageData = {
      appt_id,
      message,
      senderName: userInfo.First_Name + " " + userInfo.Last_Name,
      senderID: userInfo?.patient_id ? userInfo.patient_id : userInfo.doctor_id,
      senderType: userInfo.userType
    };
    console.log(userInfo, messageData)
    socket.emit("send_msg", messageData);
    setMessage("");
  };

  const endAppointment = async () => {
    const body = {
      Appointment_ID: appt_id,
      Doctor_ID: userInfo.doctor_id
    }
    await axios.patch("http://localhost:3000/endAppointment", body)
    navigate("/DoctorPortal/")
    
  }

  return (
    <div style={{display: "flex", flexDirection: "column", width: "100%", backgroundColor: "#ffffff", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", borderRadius: "12px", padding: "33px 40px"}}>
      <h2>Room: {appt_id}</h2>
      <div style={{ overflowY: "scroll", width: "100%", height: "90%", display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: "10px", marginTop: "20px" }}>
        {chatLog.map((msg, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: msg.senderType === "Patient" ? "flex-start" : "flex-end",
                width: "100%",
              }}
            >
              <div style={{ display: "flex", flexDirection: msg.senderType === "Patient" ? "row" : "row-reverse", alignItems: "flex-end", gap: "10px" }}>
                <img
                  src={msg.senderType === "Patient" ? `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.senderName)}&background=random&color=fff&size=42` : `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.senderName)}&background=random&color=fff&size=42`}
                  alt="Message Icon"
                  style={{
                    width: "42px",
                    height: "auto",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    backgroundColor: msg.senderType === "Patient" ? "#f0f0f0" : "#d9f7be",
                    borderRadius: "12px",
                    padding: msg.senderType === "Patient" ? "10px 10px 10px 20px" : "10px 20px 10px 10px",
                    width: "400px",
                  }}
                >
                  <p style={{ margin: 0, fontSize: "24px", textAlign: msg.senderType === "Patient" ? "left" : "right" }}>{msg.message}</p>
                  <p style={{ fontSize: "11px", margin: 0, textAlign: msg.senderType === "Patient" ? "left" : "right" }}>
                    <strong>{dayjs(msg.sent_at).format("h:mm A")}</strong>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Flex justify="center" align="center" gap="15px" style={{marginTop: "30px"}}>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
          style={{fontSize: "24px", width: "700px", }}
        />
        <Button type="primary" style={{fontWeight: "700", fontSize: "24px", backgroundColor: "#ffe6e2", color: "#333333", padding: "20px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"}}  onClick={sendMessage}>Send</Button>
        {userInfo?.doctor_id && (<Button type="primary" style={{fontWeight: "700", fontSize: "24px", backgroundColor: "rgb(239, 71, 111)", color: "#ffffff", padding: "20px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"}} onClick={endAppointment}>End Appointment</Button>)}
      </Flex>
    </div>
  );
};

export default ApptChannel;
