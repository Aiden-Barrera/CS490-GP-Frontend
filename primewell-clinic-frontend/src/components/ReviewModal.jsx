import { Flex, Modal, Form, message, Button, Input, Rate } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"

const desc = ['Very Poor', 'Poor', 'Neutral', 'Good', 'Execellent']

const ReviewModal = ({open, handleClose, userInfo, doctorInfo, sent}) => {
    const [form] = Form.useForm()
    const [patient, setPatient] = useState(null)
    const [rating, setRating] = useState(0.0)

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

    const sendReview = async (body) => {
        try {
            const res = axios.post("http://localhost:3000/reviews", body)

            sent(true)
            handleClose()
        } catch (err) {
            console.log("Error Sending Review: ", err)
        }
    } 

    const onFinish = async (value) => {
        const updatedBody = {
            Patient_ID: userInfo?.patient_id,
            Doctor_ID: doctorInfo?.[0]?.doctor_id, 
            Review_Text: value.review_text,
            Rating: value.rating
        };
        console.log("Updated Body: ", )
        await sendReview(updatedBody)
    }

    const onFail = () => {
        message.error("Submit Failed!")
    }


    return (
        <>
        <Modal open={open} footer={null} onCancel={handleCloseHere} centered className="style-modal" style={{
            width: "auto",
            minWidth: "40vw",
        }}>
            <Flex vertical justify="center" align="center" style={{border: "1px solid #999999", borderRadius: "16px", padding: "25px"}}>
                <h1 style={{fontSize: "64px", color: "#333333"}}>Write your Review</h1>
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
                        <Form.Item name="review_text" label="Review_Text" rules={[
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

export default ReviewModal