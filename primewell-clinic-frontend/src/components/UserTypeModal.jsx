import { Flex, Modal, message, Button } from "antd";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import PatientSignUpModal from "./PatientSignUpModal";

const UserTypeModal = (props) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isPatientSignUpModalOpen, setIsPatientSignUpModalOpen] = useState(false)

  const handlePatientClick = () => {
    handleClose()
    if (props.name === "Login"){
      props.setUserType("Patient")
      setIsLoginModalOpen(true)
    }
    else if(props.name === "Sign up"){
      props.setUserType("Patient")
      setIsPatientSignUpModalOpen(true)
    }
  }

  const handleDoctorClick = () => {
    handleClose()
    if (props.name === "Login"){
      props.setUserType("Doctor")
      setIsLoginModalOpen(true)
    }
  }

  const handlePharmClick = () => {
    handleClose()
    if (props.name === "Login"){
      props.setUserType("Pharmacist")
      setIsLoginModalOpen(true)
    }
  }

  const handleClose = () => {
    props.handleClose()
  }

  return (
    <>
      <Modal
        open={props.open}
        footer={null}
        onCancel={props.handleClose}
        centered
        className="style-modal"
      >
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
          <h1 style={{ fontSize: "64px", color: "#333333" }}>{props.name}</h1>
          <Flex vertical style={{ width: "100%", marginBottom: "32px" }}>
            <Flex
              vertical
              align="center"
              gap="50px"
              style={{
                width: "100%",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                className="custom-btn"
                style={{
                  width: "150px",
                  height: "50px",
                  borderRadius: "18px",
                  padding: "12px 0px",
                  backgroundColor: "#f09c96",
                }}
                onClick={handlePatientClick}
              >
                Patient
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="custom-btn"
                style={{
                  width: "150px",
                  height: "50px",
                  borderRadius: "18px",
                  padding: "12px 0px",
                  backgroundColor: "#f09c96",
                }}
                onClick={handleDoctorClick}
              >
                Doctor
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="custom-btn"
                style={{
                  width: "150px",
                  height: "50px",
                  borderRadius: "18px",
                  padding: "12px 0px",
                  backgroundColor: "#f09c96",
                }}
                onClick={handlePharmClick}
              >
                Pharmacy
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Modal>
      
      {/* Based on userType, that's what they're log in for */}
      <LoginModal open={isLoginModalOpen} userType={props.userType} auth={props.auth} info={props.info} handleClose={() => setIsLoginModalOpen(false)}/> 
      <PatientSignUpModal open={isPatientSignUpModalOpen} userType={props.userType} handleClose={() => setIsPatientSignUpModalOpen(false)}/> 
    </>
  );
};

export default UserTypeModal;
