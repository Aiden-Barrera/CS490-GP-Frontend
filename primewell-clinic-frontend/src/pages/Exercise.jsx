import { Flex, Row, Col, Card, Button, message, notification } from "antd";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { Image } from "antd";
import CreateExerciseModal from "../components/CreateExerciseModal";
import { useState, useEffect } from "react";
import ExerciseListModal from "../components/ExerciseListModal";
import AddCalendar from "../components/AddCalendar";
import axios from "axios";

const categories = [

    { name: "Upper Body", icon: <Image src= "/Upper.PNG" style={{ width: "150px", height: "150px", }}/>, description: "Effective exercises for toning and strengthening the arms, chest, and back." },
    { name: "Lower Body", icon: <Image src= "/Lower.PNG" style={{ width: "150px", height: "150px" }} />, description: "Leg day workouts, from squats to lunges, that help with muscle definition." },
    { name: "Core", icon: <Image src= "/Core.PNG" style={{ width: "150px", height: "150px" }} />, description: "Core-focused routines like crunches and planks for improved stability." },
    { name: "Full-Body & HIIT", icon: <Image src= "/HIIT.PNG" style={{ width: "150px", height: "150px" }} />, description: "Circuit training and total-body workouts to boost endurance and fat loss." },
    { name: "Endurance & Cardio", icon: <Image src= "/Cardio.PNG" style={{ width: "150px", height: "150px" }}  />, description: "Running, cycling, and other cardio workouts to boost and improve stamina." },
    { name: "Flexibility & Yoga", icon: <Image src= "/Yoga.PNG" style={{ width: "150px", height: "150px" }} />, description: "Stretching techniques and yoga poses for relaxation and flexibility." }
];

const Exercise = ({info}) => { //keep track of patient info for Regiment
    console.log(info?.patient_id);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isListModalOpen, setIsListModalOpen] = useState(false);
    const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const location = useLocation()
    const [patientID, setPatientID] = useState("")
    const [appt_id, setAppt_ID] = useState("")
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate()


    useEffect(() => {
        if (location.state?.patient_id){
            setPatientID(location.state.patient_id)
            setAppt_ID(location.state.appt_id)
        }
    }, [location.state])

    const showCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const showListModal = (category) => {
        setSelectedCategory(category)
        setIsListModalOpen(true);
    };

    const showCalendarModal = () => {
        setIsCalendarModalOpen(true);
    }

    const handleCreateCancel = () => {
        setIsCreateModalOpen(false);
    };

    const handleListCancel = () => {
        setIsListModalOpen(false);
        message.destroy();
        
    };

    const handleCalendarCancel = () => {
        setIsCalendarModalOpen(false);
    }

    const clearRegiment = async () => {
        try {
            const res = await axios.patch(`http://localhost:3000/regimentClear/${appt_id !== "" ? patientID : info?.patient_id}`)
            console.log(res.data)
            api.open({
                message: 'Regiment Cleared!',
                description: 'Regiment Schedule has been clear!',
            });
        } catch (err) {
            console.log("err: ", err)

    }
  }, [location.state]);

  const showCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const showListModal = (category) => {
    setSelectedCategory(category);
    setIsListModalOpen(true);
  };

  const showCalendarModal = () => {
    setIsCalendarModalOpen(true);
  };

                        {appt_id !== "" && (<Button type="primary" style={{ backgroundColor: "#f09c96", borderColor: "#f09c96" }} onClick={returnToAppt}>Go Back to Appointment</Button>)}
                        <Button type="primary" style={{ backgroundColor: "#f09c96", borderColor: "#f09c96" }} onClick={clearRegiment}>- Clear Regiment</Button>
                        <Button type="primary" style={{ backgroundColor: "#a2c3a4", borderColor: "#a2c3a4", marginRight:"65px" }} onClick={() => {showCreateModal()}}>+ Add New Exercise</Button>
                    </Flex>
                    <AddCalendar info={info} open={isCalendarModalOpen} handleClose={handleCalendarCancel} />
                    <CreateExerciseModal open={isCreateModalOpen} handleClose={handleCreateCancel} />
                </Flex>
                <Flex justify="center" align="center" style={{ width: "100vw", backgroundColor: "#ffffff"}}>
                <Row gutter={[48, 64]} style={{ padding: "20px 0" }}>
                        {categories.map((category, index) => (
                            <Col span={8} key={index} style={{ display: "flex", justifyContent: "center" }}>
                                <Card hoverable 
                                style={{ 
                                    textAlign: "center", 
                                    backgroundColor: "#FFE4E1", 
                                    padding: "20px", 
                                    borderRadius: "10px" }}
                                    onClick={() => {showListModal(category.name)}}
                                >
                                    <div style={{ marginBottom: "20px", pointerEvents: 'none'}}>{category.icon}</div>
                                    <h3 style={{ color: "#F09C96" }}>{category.name}</h3>
                                    <p style={{ fontSize: "12px", color: "#333" }}>{category.description}</p>
                                    {console.log("Category: " + category)}
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <ExerciseListModal info={patientID === "" ? info?.patient_id : patientID} open={isListModalOpen} handleClose={handleListCancel} categoryName={selectedCategory} appt_id={appt_id}/>
                </Flex>
            
            <Flex justify="center" align="center" style={{ width: "100vw", margin: "25px" }}>
                <Footer />
            </Flex>
        </>
    );
};

export default Exercise

