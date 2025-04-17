import { Flex, Modal, Form, message, notification, Button, Input, Rate } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"

const desc = ['Very Poor', 'Poor', 'Neutral', 'Good', 'Execellent']

const PostModal = ({open, handleClose, sent}) => {
    const [form] = Form.useForm()
    const [rating, setRating] = useState(0.0)    
    const [api, contextHolder] = notification.useNotification();


    useEffect(() => {
        if (open) {
            form.resetFields()
            message.destroy()
        }
    }, [open])

    const handleCloseHere = () => {
        message.destroy()
        handleClose()
    }

    const onFinish = async (value) => {
        
    }

    const onFail = () => {
        message.error("Submit Failed!")
    }


    return (
        <>
        {contextHolder}
        <Modal open={open} footer={null} onCancel={handleCloseHere} centered className="style-modal" style={{
            width: "auto",
            minWidth: "40vw",
        }}>
            <Flex vertical justify="center" align="center" style={{border: "1px solid #999999", borderRadius: "16px", padding: "25px"}}>
                <h1 style={{fontSize: "64px", color: "#333333"}}>Write your Exercise Post</h1>
                <Flex vertical style={{width: "100%"}}>
                    <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFail} autoComplete="off">
                        <Form.Item name="rating" label="Rating" rules={[
                            {
                                required: true,
                                message: "Please input your Rating!"
                            },
                        ]}
                        validateTrigger="onSubmit"
                        >
                            <Rate allowHalf tooltips={desc} value={rating} onChange={setRating} style={{
                                fontSize: "42px"
                            }}/>
                        </Form.Item>
                        <Form.Item name="review_text" label="Review Text" rules={[
                            {
                                required: true,
                                message: "Please make leave a review!"
                            },
                        ]}
                        validateTrigger="onSubmit"
                        >
                            <Input.TextArea rows={4} placeholder="Enter your Review!" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" 
                                style={{width: "100%", borderRadius: "18px", padding: "22px 0px", backgroundColor: "#f09c96", fontSize: "18px"}}>Submit</Button>
                        </Form.Item>
                    </Form>
                </Flex>
            </Flex>
        </Modal>
        </>
    )


}

export default PostModal