import { Flex, Modal, Form, message, Button, Input, Divider, notification } from "antd"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useEffect, useState } from "react"

const LoginModal = (props) => {
    const [form] = Form.useForm()
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if (props.open) {
            form.resetFields()
            message.destroy()
        }
    }, [props.open])

    const onFinish = async (value) => {
        const loginEndpoints = {
            Patient: "http://localhost:3000/passAuthPatient",
            Doctor: "http://localhost:3000/passAuthDoctor",
            Pharmacist: "http://localhost:3000/passAuthPharm",
        };
    
        const endpoint = loginEndpoints[props.userType];
    
        try {
            const res = await axios.post(endpoint, value);
    
            if (res.data.length === 0) {
                api.open({
                    message: 'Invalid Credentials',
                    description: 'Please check your email and password.',
                    type: 'error',
                });
                return;
            }
    
            const enrichedData = {
                ...res.data,
                userType: props.userType
            };
    
            props.info(enrichedData);
            props.auth(true);
            sessionStorage.setItem("userInfo", JSON.stringify(enrichedData));
            sessionStorage.setItem("userType", props.userType);
            sessionStorage.setItem("auth", true);
    
            if (props.userType === "Pharmacist") {
                props.setIsPharm(true);
                sessionStorage.setItem("isPharm", true);
                navigate('/PharmacistPortal');
            }
    
            handleClose();
        } catch (err) {
            if (err.response && err.response.data.error === "Invalid credentials") {
                api.open({
                    message: 'Invalid Credentials',
                    description: 'Please check your email and password.',
                    type: 'error',
                });
            } else {
                console.error("Login Error:", err);
            }
        }
    };
    

    const onFail = () => {
        message.error("Submit Failed!")
    }

    const handleClose = () => {
        message.destroy()
        props.handleClose()
    }

    return (
        <Modal open={props.open} footer={null} onCancel={handleClose} centered className="style-modal">
            {contextHolder}
            <Flex vertical justify="center" align="center" style={{border: "1px solid #999999", borderRadius: "16px", padding: "25px"}}>
                <h1 style={{fontSize: "64px", color: "#333333"}}>Login</h1>
                <Flex vertical style={{width: "100%"}}>
                    <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFail} autoComplete="off">
                        <Form.Item name="email" label="Email" rules={[
                            {
                                required: true,
                                message: "Please input your Email!"
                            },
                            {
                                pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                                message: "Please input a valid Email!"
                            },
                        ]}
                        validateTrigger="onSubmit"
                        >
                            <Input placeholder="example@gmail.com" style={{height: "45px"}}/>
                        </Form.Item>
                        <Form.Item name="pw" label="Password" rules={[
                            {
                                required: true,
                                message: "Please input your Password!"
                            },
                            {
                                min: 5,
                                message: "Password must be at least 5 characters"
                            }
                        ]}
                        validateTrigger="onSubmit"
                        >
                            <Input.Password placeholder="Enter your password" style={{height: "45px"}}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" 
                                style={{width: "100%", borderRadius: "18px", padding: "22px 0px", backgroundColor: "#f09c96"}}>Log in</Button>
                        </Form.Item>
                    </Form>
                </Flex>
            </Flex>
            <Divider><span style={{color: "#666666"}}>New to our Clinic</span></Divider>
            <Button type="primary" htmlType="submit" 
                style={{width: "100%", border: "1px solid #999999", borderRadius: "18px", padding: "22px 0px", backgroundColor: "#ffe6e2", color: "#000000", marginBottom: "10px"}}>Create an account</Button>
        </Modal>
    )
}


export default LoginModal