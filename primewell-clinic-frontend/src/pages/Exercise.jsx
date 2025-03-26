import { Flex, Row, Col, Card, Button } from "antd";
import Footer from "../components/Footer";
import { Image } from "antd";
import ExerciseModal from "../components/CreateExerciseModal";
import { useState } from "react";
import ExerciseListModal from "../components/ExerciseListModal";

const categories = [
    { name: "Upper Body", icon: <Image src= "/Upper.PNG" style={{ width: "150px", height: "150px", }}/>, description: "Effective exercises for toning and strengthening the arms, chest, and back." },
    { name: "Lower Body", icon: <Image src= "/Lower.PNG" style={{ width: "150px", height: "150px" }} />, description: "Leg day workouts, from squats to lunges, that help with muscle definition." },
    { name: "Core", icon: <Image src= "/Core.PNG" style={{ width: "150px", height: "150px" }} />, description: "Core-focused routines like crunches and planks for improved stability." },
    { name: "Full-Body & HIIT", icon: <Image src= "/HIIT.PNG" style={{ width: "150px", height: "150px" }} />, description: "Circuit training and total-body workouts to boost endurance and fat loss." },
    { name: "Endurance & Cardio", icon: <Image src= "/Cardio.PNG" style={{ width: "150px", height: "150px" }}  />, description: "Running, cycling, and other cardio workouts to boost and improve stamina." },
    { name: "Flexibility & Yoga", icon: <Image src= "/Yoga.PNG" style={{ width: "150px", height: "150px" }} />, description: "Stretching techniques and yoga poses for relaxation and flexibility." }
];

const Exercise = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            
                <Flex justify="center" align="center" style={{ height: "50vh", width: "100vw", backgroundColor: "#A8C4A2",  textAlign: "center"}}>
                    <h1 className="title" style={{ color: "#ffffff", fontSize: "52px", fontWeight: "bold" }}>Exercise Bank</h1>
                </Flex>
           
            
                <Flex justify="space-between" align="center" style={{ width: "100vw", backgroundColor: "#ffffff", textAlign: "center"}}>
                    <h3 style={{ color: "#F09C96", marginLeft: "50px" }}>Browse through the categories</h3>
                    <div>
                        <Button type="primary" style={{ backgroundColor: "#F09C96", marginRight: "10px" }}>+ Create new Regiment</Button>
                        <Button type="primary" style={{ backgroundColor: "#A8C4A2", borderColor: "#A8C4A2", marginRight:"65px" }} onClick={() => {showModal()}}>+ Add New Exercise</Button>
                    </div>
                    <ExerciseListModal open={isModalOpen} handleClose={handleCancel} />
                </Flex>
                <Flex justify="center" align="center" style={{ width: "100vw", backgroundColor: "#ffffff",  textAlign: "center"}}>
                <Row gutter={[48, 64]} style={{ padding: "20px 0" }}>
                        {categories.map((category, index) => (
                            <Col span={8} key={index} style={{ display: "flex", justifyContent: "center" }}>
                                <Card hoverable style={{ textAlign: "center", backgroundColor: "#FFE4E1", padding: "20px", borderRadius: "10px" }}>
                                    <div style={{ marginBottom: "50px" }}>{category.icon}</div>
                                    <h3 style={{ color: "#F09C96" }}>{category.name}</h3>
                                    <p style={{ fontSize: "12px", color: "#333" }}>{category.description}</p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Flex>
            
            <Flex justify="center" align="center" style={{ width: "100vw", margin: "25px" }}>
                <Footer />
            </Flex>
        </>
    );
};

export default Exercise;

