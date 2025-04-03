import { Flex, Modal, message, Button, Input, Form} from "antd"
import { useEffect } from "react"
const CreatePillModal = (props) => {
    const [form] = Form.useForm()

    useEffect(() => {
        if (props.open) {
            form.resetFields()
            message.destroy()
        }
    }, [props.open])

    const onFinish = () => {
        message.success("New Exercise Added!")
    }

    const onFail = () => {
        message.error("Unable to Add Exercise")
    }

    const handleClose = () => {
        message.destroy()
        props.handleClose()
    }

    return (
        <Modal 
            open={props.open}
            footer={null} 
            onCancel={handleClose} 
            centered className="style-modal"
            >
            <Flex 
            vertical justify="center" 
            align="center" 
            style={{
                borderRadius: "16px", 
                padding: "25px",
                backgroundColor:"#FFE6E2",
                margin: "-25px"
            }}
            >
                <h1 style={{fontSize: "35px", color: "#333333"}}>Enter Medicine Details</h1>
                <Flex 
                vertical style={{width: "100%"}}
                >
                    <Form 
                    form={form} layout="vertical" 
                    onFinish={onFinish} 
                    onFinishFailed={onFail} 
                    autoComplete="off"
                    >
                        <Form.Item name="Medicine Name" label="Medicine Name" rules={[
                            {
                                required: true,
                                message: "Medicine Name Required"
                            },
                        ]}
                        >
                            <Input placeholder="Medicine Name" style={{height: "45px"}}/>
                        </Form.Item>
                        <Form.Item name="ID" label="ID" rules={[
                            {
                                required: true,
                                message: "ID Required"
                            },
                        ]}
                        >
                            <Input placeholder="ID" style={{height: "45px"}}/>
                        </Form.Item>
                        <Form.Item name="Price" label="Price" rules={[
                            {
                                required: true,
                                message: "Price Required "
                            },
                        ]}
                        >
                            <Input placeholder="Price" style={{height: "45px"}}/>
                        </Form.Item>
                        <Form.Item name="Dosage" label="Dosage" rules={[
                            {
                                required: true,
                                message: "Dosage Required"
                            },
                        ]}
                        >
                            <Input placeholder="Dosage" style={{height: "45px"}}/>
                        </Form.Item>
                        <Form.Item>
                            <Flex justify="center">
                            <Button
                            type="primary" 
                            htmlType="submit" 
                            justify="center" 
                            align="center"
                            style={{ backgroundColor: "#A8C4A2" }}>
                            Submit new exercise entry
                            </Button>
                            </Flex>
                        </Form.Item>
                    </Form>
                </Flex>
            </Flex>
        </Modal>
    )
}

export default CreatePillModal