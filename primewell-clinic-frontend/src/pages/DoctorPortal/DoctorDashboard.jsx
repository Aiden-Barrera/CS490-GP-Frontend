import { Button, Flex } from "antd";
import PatientCard from "../../components/PatientCard";
import UpcomingAptsCards from "../../components/UpcomingAptsCards";

const DoctorDashboard = (props) => {
  return (
    <Flex
      justify="start"
      align="center"
      gap="60px"
      style={{
        borderRadius: "12px",
        padding: "33px 40px",
        width: "100%",
        overflowY: "auto",
      }}
    >
      {/* Doctor's Patients */}
      <Flex
        vertical
        justify="center"
        align="center"
        gap="20px"
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          padding: "33px 40px",
          width: "100%",
        }}
      >
        <h1 style={{ color: "#333333" }}>Patients</h1>
        <PatientCard></PatientCard>
      </Flex>
      {/* Doctor's Upcoming Appointments */}
      <Flex
        vertical
        justify="center"
        align="center"
        gap="20px"
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          padding: "33px 40px",
          width: "100%",
        }}
      >
        <h1 style={{ color: "#333333" }}>Upcoming Appointments</h1>
        <UpcomingAptsCards></UpcomingAptsCards>
      </Flex>
    </Flex>
  );
};

export default DoctorDashboard;
