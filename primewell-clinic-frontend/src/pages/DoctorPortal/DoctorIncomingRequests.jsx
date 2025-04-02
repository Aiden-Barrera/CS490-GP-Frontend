import { Button, Flex, Form, message, Input } from "antd";
import IncomingRequestCard from "../../components/IncomingRequestCard";
const DoctorPillRequest = (props) => {
  const [form] = Form.useForm();

  const onFinish = () => {};

  const onFail = () => {};

  return (
    <Flex
      vertical
      justify="start"
      align="center"
      gap="30px"
      fontFamily="Poppins"
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        padding: "33px 40px",
        width: "100%",
        overflowY: "auto",
        fontFamily: "Poppins",
      }}
    >
      <h1 style={{ color: "#333333", marginBottom: 0 }}>Incoming Requests</h1>
      <h2 style={{ color: "#333333", marginBottom: 0 }}>Received - X</h2>
      <Flex
        vertical
        gap="20px"
        style={{
          width: "50%",
        }}
      >
        <IncomingRequestCard></IncomingRequestCard>
        <IncomingRequestCard></IncomingRequestCard>{" "}
        <IncomingRequestCard></IncomingRequestCard>
      </Flex>
    </Flex>
  );
};

export default DoctorPillRequest;
