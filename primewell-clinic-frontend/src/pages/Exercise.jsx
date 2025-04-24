import { Flex, Row, Col, Card, Button, message, Dropdown, Typography, Space } from "antd";
import Footer from "../components/Footer";
import { Image } from "antd";
import CreateExerciseModal from "../components/CreateExerciseModal";
import { useState, useEffect, use } from "react";
import ExerciseListModal from "../components/ExerciseListModal";
import AddCalendar from "../components/AddCalendar";
import { DownOutlined } from "@ant-design/icons";
import axios from "axios";

const categories = [
    { name: "Upper Body", icon: <Image src="/Upper.PNG" style={{ width: "150px", height: "150px" }} />, description: "Effective exercises for toning and strengthening the arms, chest, and back." },
    { name: "Lower Body", icon: <Image src="/Lower.PNG" style={{ width: "150px", height: "150px" }} />, description: "Leg day workouts, from squats to lunges, that help with muscle definition." },
    { name: "Core", icon: <Image src="/Core.PNG" style={{ width: "150px", height: "150px" }} />, description: "Core-focused routines like crunches and planks for improved stability." },
    { name: "Full-Body & HIIT", icon: <Image src="/HIIT.PNG" style={{ width: "150px", height: "150px" }} />, description: "Circuit training and total-body workouts to boost endurance and fat loss." },
    { name: "Endurance & Cardio", icon: <Image src="/Cardio.PNG" style={{ width: "150px", height: "150px" }} />, description: "Running, cycling, and other cardio workouts to boost and improve stamina." },
    { name: "Flexibility & Yoga", icon: <Image src="/Yoga.PNG" style={{ width: "150px", height: "150px" }} />, description: "Stretching techniques and yoga poses for relaxation and flexibility." }
];

const Exercise = ({ info }) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isListModalOpen, setIsListModalOpen] = useState(false);
    const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [doctorPatients, setDoctorPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        if (info?.doctor_id) {
            const getDoctorPatients = async () => {
                try {
                    const res = await axios.post("http://localhost:3000/doctorPatients", {
                        Doctor_ID: info.doctor_id
                    });
                    console.log("Doctor Patients: ", res.data);
                    setDoctorPatients(res.data);
                } catch (error) {
                    console.error("Error fetching doctor patient data:", error);
                }
            };
            getDoctorPatients();
        }
    }, [info?.doctor_id]);

    useEffect(() => {
        if (selectedPatient) {
            console.log("Selected Patient: ", selectedPatient);
        }
    }, [selectedPatient]);

    const showCreateModal = () => setIsCreateModalOpen(true);
    const showListModal = (category) => {
        setSelectedCategory(category);
        setIsListModalOpen(true);
    };
    const handleCreateCancel = () => setIsCreateModalOpen(false);
    const handleListCancel = () => {
        setIsListModalOpen(false);
        message.destroy();
    };
    const handleCalendarCancel = () => setIsCalendarModalOpen(false);

    const patientDropdown = doctorPatients.map((patient) => ({
        key: patient.Patient_ID,
        label: `${patient.First_Name} ${patient.Last_Name}`,
        onClick: () => setSelectedPatient(patient)
    }));

    return (
        <>
            <Flex justify="center" align="center" style={{ height: "50vh", width: "100vw", backgroundColor: "#a2c3a4", textAlign: "center" }}>
                <h1 className="title" style={{ color: "#ffffff", fontSize: "52px", fontWeight: "bold" }}>Exercise Bank</h1>
            </Flex>

            <Flex justify="space-between" align="center" style={{ width: "100vw", backgroundColor: "#ffffff", textAlign: "center" }}>
                <Flex vertical align="center" justify="space-between" style={{ marginLeft: "50px" }}>
                    <h3 style={{ color: "#F09C96" }}>Browse through the categories</h3>
                    <p style={{ color: "#F09C96", marginTop: "-5px", marginLeft: "10px" }}> Select exercises to add to your regiment </p>
                </Flex>

                {info?.doctor_id && (
                    <Dropdown
                        menu={{ items: patientDropdown }}
                        trigger={["click"]}
                    >
                        <Typography.Link onClick={(e) => e.preventDefault()} style={{ marginRight: 16 }}>
                            <Space>
                                {selectedPatient ? `${selectedPatient.First_Name} ${selectedPatient.Last_Name}` : "Select Patient"}
                                <DownOutlined />
                            </Space>
                        </Typography.Link>
                    </Dropdown>
                )}

                <Button
                    type="primary"
                    style={{ backgroundColor: "#a2c3a4", borderColor: "#a2c3a4", marginRight: "65px" }}
                    onClick={showCreateModal}
                >
                    + Add New Exercise
                </Button>

                <AddCalendar info={info} selectedPatient={selectedPatient} open={isCalendarModalOpen} handleClose={handleCalendarCancel} />
                <CreateExerciseModal open={isCreateModalOpen} handleClose={handleCreateCancel} />
            </Flex>

            <Flex justify="center" align="center" style={{ width: "100vw", backgroundColor: "#ffffff" }}>
                <Row gutter={[48, 64]} style={{ padding: "20px 0" }}>
                    {categories.map((category, index) => (
                        <Col span={8} key={index} style={{ display: "flex", justifyContent: "center" }}>
                            <Card
                                hoverable
                                style={{
                                    textAlign: "center",
                                    backgroundColor: "#FFE4E1",
                                    padding: "20px",
                                    borderRadius: "10px"
                                }}
                                onClick={() => showListModal(category.name)}
                            >
                                <div style={{ marginBottom: "20px", pointerEvents: "none" }}>{category.icon}</div>
                                <h3 style={{ color: "#F09C96" }}>{category.name}</h3>
                                <p style={{ fontSize: "12px", color: "#333" }}>{category.description}</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <ExerciseListModal info={info} selectedPatient={selectedPatient} open={isListModalOpen} handleClose={handleListCancel} categoryName={selectedCategory} />
            </Flex>

            <Flex justify="center" align="center" style={{ width: "100vw", margin: "25px" }}>
                <Footer />
            </Flex>
        </>
    );
};

export default Exercise;