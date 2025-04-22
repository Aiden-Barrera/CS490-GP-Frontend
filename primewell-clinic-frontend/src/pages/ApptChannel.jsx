import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import { Flex, Input, Button } from "antd";

const socket = io.connect("http://localhost:3000");

const ApptChannel = ({userInfo}) => {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [appt_id, setAppt_ID] = useState("")
  const location = useLocation()

  useEffect(() => {
    if (location.state?.appt_id) {
      setAppt_ID(location.state.appt_id)
      console.log("Joining room:", location.state.appt_id); // <- check this
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
      time: new Date(Date.now()).toLocaleTimeString(),
    };
    socket.emit("send_msg", messageData);
    setMessage("");
  };

  return (
    <div style={{display: "flex", flexDirection: "column", width: "100%", backgroundColor: "#ffffff", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", borderRadius: "12px", padding: "33px 40px"}}>
      <h2>Room: {appt_id}</h2>
      <div style={{ overflowY: "scroll", width: "100%", height: "90%", display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: "10px" }}>
        {chatLog.map((msg, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: isEven ? "flex-start" : "flex-end", // alternate left/right
                width: "100%",
              }}
            >
              <div
                style={{
                  backgroundColor: isEven ? "#f0f0f0" : "#d9f7be", // optional: change bubble color
                  borderRadius: "12px",
                  padding: "10px",
                  maxWidth: "350px",
                }}
              >
                <p style={{ margin: 0 }}>{msg.message}</p>
                <p style={{ fontSize: "10px", margin: 0, textAlign: isEven ? "left" : "right" }}>
                  <strong>{msg.time}</strong>
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <Button onClick={sendMessage}>Send</Button>
    </div>
  );
};

export default ApptChannel;
