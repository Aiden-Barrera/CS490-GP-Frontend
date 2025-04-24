import { Button, Flex } from "antd";
import PatientCard from "../../components/PatientCard";
import UpcomingAptsCards from "../../components/UpcomingAptsCards";
import axios from "axios";
import { useEffect, useState } from "react";

const DoctorDashboard = (props) => {
  const [doctorPatients, setDoctorPatients] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  // console.log(props.info);

  const getDoctorPatients = async () => {
    try {
      const res = await axios.post("http://localhost:3000/doctorPatients", {
        Doctor_ID: props.info.doctor_id,
      });
      // console.log(res.data);
      setDoctorPatients(res.data);
    } catch (error) {
      console.error("Error fetching doctor patient data:", error);
    }
  };

  const getUpcomingPatients = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/appointment/doctor/${props.info.doctor_id}`
      );
      console.log("Upcoming Appt: ", res.data);
      setUpcomingAppointments(res.data);
      if (res.data.length === 0) {
        console.log("Couldn't get doctor patient data");
      } else {
        console.log("Doctor patient data retrieved successfully");
      }
    } catch (error) {
      console.error("Error fetching doctor patient data:", error);
    }
  };

  useEffect(() => {
    getDoctorPatients();
    getUpcomingPatients();
  }, []);

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
          height: "90%",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          boxSizing: "border-box",
        }}
      >
        <h1 style={{ color: "#333333" }}>Patients</h1>

        <Flex vertical gap="10px" style={{width: "100%", overflow: "auto", padding: "10px"}}>
          {doctorPatients.length > 0 ?
            doctorPatients.map((patient) => (
              <PatientCard Fname={patient.First_Name} Lname={patient.Last_Name} />
            )) : (
              <p style={{ margin: 0, color: "#333333", fontSize: "24px" }}>No Patients</p>
            )}
        </Flex>
      </Flex>
      {/* Doctor's Upcoming Appointments */}
      <Flex
        vertical
        justify="flex-start"
        align="center"
        gap="20px"
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          padding: "33px 40px",
          width: "100%",
          height: "90%", // You can adjust this as needed
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          boxSizing: "border-box",
        }}
      >
        <h1 style={{ color: "#333333", marginBottom: "20px" }}>Upcoming Appointments</h1>

        <Flex vertical gap="10px" style={{width: "100%", overflow: "auto", padding: "10px"}}>
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((patient, index) => (
              <UpcomingAptsCards
                key={index}
                Fname={patient.First_Name}
                Lname={patient.Last_Name}
                Date={patient.Appt_Date}
                Time={patient.Appt_Time}
                Tier={patient.Tier}
                appt_id={patient.Appointment_ID}
                doctor_id={props.info.doctor_id}
              />
            ))
          ) : (
            <p style={{ margin: 0, color: "#333333", fontSize: "24px" }}>
              No Upcoming Appointments
            </p>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DoctorDashboard;
