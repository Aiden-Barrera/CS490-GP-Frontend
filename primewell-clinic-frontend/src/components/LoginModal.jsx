import { Flex, Modal, Form, message, Button, Input, Divider, notification } from "antd"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import PatientSignUpModal from "./PatientSignUpModal";
import DoctorSignUpModal from "./DoctorSignUpModal";
import PharmacySignUpModal from "./PharmacySignUpModal";
import apiDB from "../api";

const LoginModal = (props) => {
    const [form] = Form.useForm();
    const [isPatientSignUpModalOpen, setIsPatientSignUpModalOpen] =
        useState(false);
    const [isDoctorSignUpModalOpen, setIsDoctorSignUpModalOpen] = useState(false);
    const [isPharmacySignUpModalOpen, setIsPharmacySignUpModalOpen] =
        useState(false);
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if (props.open) {
            form.resetFields();
            message.destroy();
        }
    }, [props.open]);

    const onFinish = async (value) => {
        try {
            let res;
    
            if (props.userType === "Patient") {
                res = await apiDB.post("/passAuthPatient", value);
            } else if (props.userType === "Doctor") {
                res = await apiDB.post("/passAuthDoctor", value);
            } else {
                res = await apiDB.post("/passAuthPharm", value);
            }
    
            if (res.data.length === 0) {
                console.log("Couldn't log in");
                api.error({
                    message: "Login Failed",
                    description: "Invalid credentials",
                    placement: "topRight",
                });
                return;
            }
    
            console.log("Logged In");
    
            const enrichedData = {
                ...res.data,
                userType: props.userType,
            };
    
            props.info(enrichedData);
            props.auth(true);
    
            sessionStorage.setItem("userInfo", JSON.stringify(enrichedData));
            sessionStorage.setItem("userType", props.userType);
            sessionStorage.setItem("auth", true);
    
            if (props.userType === "Pharmacist") {
                props.setIsPharm(true);
                sessionStorage.setItem("isPharm", true);
                navigate("/PharmacistPortal");
            }
    
            handleClose();
        } catch (error) {
            if (
                error.response &&
                error.response.status === 401 &&
                error.response.data === "Invalid credentials"
            ) {
                api.error({
                    message: "Login Failed",
                    description: "Invalid credentials",
                    placement: "topRight",
                });
            } else {
                console.error("Login error:", error);
                api.error({
                    message: "Login Error",
                    description: "Something went wrong. Please try again.",
                    placement: "topRight",
                });
            }
        }
    };

    const onFail = () => {
        message.error("Submit Failed!");
    };

    const handleClose = () => {
        message.destroy();
        props.handleClose();
    };

    return (
        <>
            <Modal
                open={props.open}
                footer={null}
                onCancel={handleClose}
                centered
                className="style-modal"
            >
            {contextHolder}
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
                    <h1 style={{ fontSize: "51px", color: "#333333" }}>{props.userType} Login</h1>
                    <Flex vertical style={{ width: "100%" }}>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFail}
                            autoComplete="off"
                        >
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Email!",
                                    },
                                    {
                                        pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Please input a valid Email!",
                                    },
                                ]}
                                validateTrigger="onSubmit"
                            >
                                <Input
                                    placeholder="example@gmail.com"
                                    style={{ height: "45px" }}
                                />
                            </Form.Item>
                            <Form.Item
                                name="pw"
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Password!",
                                    },
                                    {
                                        min: 5,
                                        message: "Password must be at least 5 characters",
                                    },
                                ]}
                                validateTrigger="onSubmit"
                            >
                                <Input.Password
                                    placeholder="Enter your password"
                                    style={{ height: "45px" }}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                        width: "100%",
                                        borderRadius: "18px",
                                        padding: "22px 0px",
                                        backgroundColor: "#f09c96",
                                    }}
                                >
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </Flex>
                </Flex>
                <Divider>
                    <span style={{ color: "#666666" }}>New to our Clinic</span>
                </Divider>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                        width: "100%",
                        border: "1px solid #999999",
                        borderRadius: "18px",
                        padding: "22px 0px",
                        backgroundColor: "#ffe6e2",
                        color: "#000000",
                        marginBottom: "10px",
                    }}
                    onClick={() => {
                        if (props.userType === "Patient") {
                            setIsPatientSignUpModalOpen(true);
                        } else if (props.userType === "Doctor") {
                            setIsDoctorSignUpModalOpen(true);
                        } else if (props.userType === "Pharmacist") {
                            setIsPharmacySignUpModalOpen(true);
                        }
                    }}
                >
                    Create an account
                </Button>
            </Modal>
            {/* Based on userType, that's what they're log in for */}
            <PatientSignUpModal
                open={isPatientSignUpModalOpen}
                userType={props.userType}
                info={props.info}
                auth={props.auth}
                handleClose={() => {
                    setIsPatientSignUpModalOpen(false), props.handleClose();
                }}
            />
            <DoctorSignUpModal
                open={isDoctorSignUpModalOpen}
                userType={props.userType}
                info={props.info}
                auth={props.auth}
                handleClose={() => {
                    setIsDoctorSignUpModalOpen(false), props.handleClose();
                }}
            />
            <PharmacySignUpModal
                open={isPharmacySignUpModalOpen}
                userType={props.userType}
                info={props.info}
                auth={props.auth}
                setIsPharm={props.setIsPharm}
                handleClose={() => {
                    setIsPharmacySignUpModalOpen(false), props.handleClose();
                }}
            />
        </>
    );
};

export default LoginModal;
