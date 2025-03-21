import { Flex, Modal, Form, message, Button, Input, Divider } from "antd"
import { useEffect, useState } from "react"

const LoginModal = (props) => {
    const [form] = Form.useForm()

    useEffect(() => {
        if (props.open) {
            form.resetFields()
            message.destroy()
        }
    }, [props.open])

    const onFinish = () => {
        message.success("Submit Success!")
    }

    const onFail = () => {
        message.error("Submit Failed!")
    }

    const handleClose = () => {
        message.destroy()
        props.handleClose()
    }

    return (
        <Modal open={props.open} footer={null} onCancel={handleClose} centered className="style-modal">
            <Flex vertical justify="center" align="center" style={{border: "1px solid #999999", borderRadius: "16px", padding: "25px"}}>
                <h1 style={{fontSize: "64px", color: "#333333"}}>Login</h1>
                <Flex vertical style={{width: "100%"}}>
                    <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFail} autoComplete="off">
                        <Form.Item name="email" label="Email" rules={[
                            {
                                required: true,
                                message: "Please input your Email!"
                            },
                        ]}
                        >
                            <Input placeholder="example@gmail.com" style={{height: "45px"}}/>
                        </Form.Item>
                        <Form.Item name="password" label="Password" rules={[
                            {
                                required: true,
                                message: "Please input your Password!"
                            },
                            {
                                min: 5,
                                message: "Password must be at least 5 characters"
                            }
                        ]}
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
                style={{width: "100%", border: "1px solid #999999", borderRadius: "18px", padding: "22px 0px", backgroundColor: "#ffe6e2", color: "#000000"}}>Create an account</Button>
        </Modal>
    )
}

export default LoginModal