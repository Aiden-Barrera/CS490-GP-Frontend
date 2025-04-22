import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

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
    <div>
      <h2>Room: {appt_id}</h2>
      <div style={{ height: "200px", overflowY: "scroll" }}>
        {chatLog.map((msg, index) => (
          <div key={index}>
            <strong>{msg.time}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ApptChannel;
