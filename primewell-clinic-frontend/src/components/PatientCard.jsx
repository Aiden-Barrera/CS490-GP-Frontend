import { Flex, Input, Button, Popover, Modal, Form, Checkbox, message, Table, Layout } from "antd";
import { ControlOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState, } from "react";
import apiDB from '../api';
import CalorieChart from "./CalorieChart";
import WeightChart from "./WeightChart";

const { Content } = Layout;

const PatientCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState(false)
  const [form] = Form.useForm();
  const [symptoms, setSymptoms] = useState({});
  const [patientID, setPatientID] = useState("")

  const openModal = async () => {
    console.log(props)
    setPatientID(props.patient_id)
    const res = await apiDB.get(`/preliminaries/${props.patient_id}`)
    console.log("Preliminary Data: ", res.data)
    const patientData = res.data[0]; // since the data is in an array
    setSymptoms(patientData?.Symptoms || {});
    setIsModalOpen(true)
  }
  // console.log(props);
  const PatientName = ({ Fname, Lname }) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center", // Vertically centers text
          height: "100%", // Takes full height of the parent
          paddingLeft: "15px", // Ensures left alignment
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
          {Fname} {Lname}
        </h2>
      </div>
    );
  };

  return (
    <>
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
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
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
          }}
        >
          <Flex gap="10px">
            <UserOutlined style={{ fontSize: "40px", color: "white" }} />
            <PatientName Fname={props.Fname} Lname={props.Lname} />
          </Flex>

          <Flex vertical gap="15px">
            <Button
              style={{
                backgroundColor: "#FFE6E2",
                color: "black",
                borderColor: "#FFE6E2",
                fontFamily: "Poppins",
                fontSize: 10,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
              }}
              onClick={() => { setIsDashboardModalOpen(true) }}
            >
              <h2>View Dashboard</h2>
            </Button>
            <Button
              style={{
                backgroundColor: "#a2c3a4",
                color: "white",
                borderColor: "#a2c3a4",
                fontFamily: "Poppins",
                fontSize: 10,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
              }}
              onClick={openModal}
            >
              <h2>View forum</h2>
            </Button>
          </Flex>
        </Content>
      </Layout>
      <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={false} centered className="style-modal" width={650}>
        <Flex
          vertical
          justify="center"
          align="center"
          style={{
            border: "1px solid #999999",
            borderRadius: "16px",
            padding: "25px",
          }}
        >
          <h1 style={{ fontSize: "64px", color: "#333333" }}>Preliminary Form</h1>
          <Flex vertical style={{ width: "100%" }}>
            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
            >
              <Form.Item>
                <div>
                  <table style={{ textAlign: "left", width: "100%" }}>
                    <thead>
                      <tr>
                        <th style={{ padding: "0px 11px" }}>MUSCLE/JOINT/BONE</th>
                        <th style={{ padding: "0px 11px" }}>
                          EYES/EARS/NOSE/THROAT
                        </th>
                        <th style={{ padding: "0px 11px" }}>NEUROLOGIC</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ padding: "0px 11px" }}>
                          {[
                            "Back Pain",
                            "Leg Pain",
                            "Neck Pain",
                            "Arm Pain",
                            "Joint Pain",
                          ].map((symptom) => (
                            <div key={symptom}>
                              <Checkbox
                                disabled
                                checked={
                                  symptoms["Muscle/Joint/Bone"]?.includes(
                                    symptom
                                  ) || false
                                }

                              >
                                {symptom}
                              </Checkbox>
                              <br />
                            </div>
                          ))}
                        </td>
                        <td style={{ padding: "0px 11px" }}>
                          {[
                            "Blurred Vision",
                            "Loss of Hearing",
                            "Nose Bleeds",
                            "Sinus Problems",
                            "Strep Throat",
                          ].map((symptom) => (
                            <div key={symptom}>
                              <Checkbox
                                disabled
                                checked={
                                  symptoms["Eyes/Ears/Nose/Throat"]?.includes(
                                    symptom
                                  ) || false
                                }

                              >
                                {symptom}
                              </Checkbox>
                              <br />
                            </div>
                          ))}
                        </td>
                        <td style={{ padding: "0px 11px" }}>
                          {[
                            "Fainting",
                            "Dizziness",
                            "Headache",
                            "Memory Loss",
                            "Depression",
                          ].map((symptom) => (
                            <div key={symptom}>
                              <Checkbox
                                disabled
                                checked={
                                  symptoms["Neurologic"]?.includes(symptom) ||
                                  false
                                }

                              >
                                {symptom}
                              </Checkbox>
                              <br />
                            </div>
                          ))}
                        </td>
                      </tr>
                      <tr>
                        <th style={{ padding: "0px 11px" }}>SKIN</th>
                        <th style={{ padding: "0px 11px" }}>LUNGS</th>
                        <th style={{ padding: "0px 11px" }}>CARDIOVASCULAR</th>
                      </tr>
                      <tr>
                        <td style={{ padding: "0px 11px", paddingBottom: "20px" }}>
                          {["Itching", "Rash", "Callus"].map((symptom) => (
                            <div key={symptom}>
                              <Checkbox
                                disabled
                                checked={
                                  symptoms["Skin"]?.includes(symptom) || false
                                }

                              >
                                {symptom}
                              </Checkbox>
                              <br />
                            </div>
                          ))}
                        </td>
                        <td style={{ padding: "0px 11px" }}>
                          {[
                            "Shortness of Breath",
                            "Persistent Cough",
                            "Asthma",
                            "Sleep Apnea",
                          ].map((symptom) => (
                            <div key={symptom}>
                              <Checkbox
                                disabled
                                checked={
                                  symptoms["Lungs"]?.includes(symptom) || false
                                }

                              >
                                {symptom}
                              </Checkbox>
                              <br />
                            </div>
                          ))}
                        </td>
                        <td style={{ padding: "0px 11px" }}>
                          {[
                            "Chest Pain",
                            "Irregular Heart Beat",
                            "Heart Attack",
                            "Heart Disease",
                          ].map((symptom) => (
                            <div key={symptom}>
                              <Checkbox
                                disabled
                                checked={
                                  symptoms["Cardiovascular"]?.includes(symptom) ||
                                  false
                                }

                              >
                                {symptom}
                              </Checkbox>
                              <br />
                            </div>
                          ))}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Form.Item>
            </Form>
          </Flex>
        </Flex>
      </Modal>
      <Modal open={isDashboardModalOpen} onCancel={() => setIsDashboardModalOpen(false)} footer={false} centered className="style-modal" width={1200}>
        {/* <Flex justify="center" align="center" style={{ height: "100vh", margin: "25% 0" }}>
          <h1 style={{ color: "#333333", marginBottom: 0, marginTop: 0 }}>{props.Fname} {props.Lname}'s Data</h1>
        </Flex> */}
        <Flex vertical justify="center" align="center" gap="50px" style={{ marginTop: "100px", width: "100%" }}>
          <h1 style={{ color: "#333333", marginBottom: 0, marginTop: 0 }}>{props.Fname} {props.Lname}'s Daily Progress</h1>
          <Flex gap="100px" justify="center" style={{ marginBottom: "100px", width: "100%" }}>

            <Flex vertical justify="center" align="center" style={{ maxWidth: "500px" }}>
              <h2 style={{ textAlign: "center", marginBottom: "16px" }}>Caloric Intake Trends</h2>
              <CalorieChart info={{ patient_id: props.patient_id }} />
            </Flex>
            <Flex vertical gap="25px" justify="center" align="center">
              <Flex vertical align="center" justify="center" style={{ maxWidth: "500px" }}>
                <h2 style={{ textAlign: "center", marginBottom: "16px" }}>Weekly Weight Trends</h2>
                <WeightChart info={{ patient_id: props.patient_id }} />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default PatientCard;

