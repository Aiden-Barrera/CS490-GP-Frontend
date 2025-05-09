import { Flex, Modal, Form, message, Button, Input, notification, Select } from "antd";
import { useEffect, useState } from "react"
import axios from "axios";
import apiDB from './../api.js';

const AddPostModal = (props) => {
    const [form] = Form.useForm()
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if (props.open) {
            form.resetFields()
            message.destroy()
        }
    }, [props.open])

    const onFinish = async (value) => {
        message.success("New Exercise Added!");
        // console.log(value.Reps);
        const newValue = {
            ...value,
            Patient_ID: props.info.patient_id,
        };
        // console.log(newValue);
        try {
            const res = await apiDB.post("/forumPosts", newValue)
            console.log("Added Post: ", res.data)
            // props.onPostCreated(res.data);
            props.postCreated(true)
            handleClose();
        } catch (err) {
            if (err.response) {
                if (err.response.status === 400) {
                    api.open({
                        message: 'Invalid Credentials!',
                        description: 'Must be Signed In to Make a Post.',
                    });
                } else {
                    console.log("Error Fetching Comments: ", err);
                }
            }
        }
    };

    const onFail = () => {
        message.error("Unable to Add Exercise")
    }

    const handleClose = () => {
        message.destroy()
        props.handleClose()
    }

    return (
        <Modal open={props.open} footer={null} onCancel={handleClose} centered className="style-modal" >
            {contextHolder}
            <Flex
                vertical justify="center"
                align="center"
                style={{
                    border: "1px solid #999999",
                    borderRadius: "16px",
                    padding: "25px"
                }}
            >
                <h1 style={{ fontSize: "39px", color: "#333333" }}>Create Discussion Post</h1>
                <Flex
                    vertical style={{ width: "100%" }}
                >
                    <Form
                        form={form} layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFail}
                        autoComplete="off"
                    >
                        <Form.Item name="Exercise_Name" label="Exercise Name" rules={[
                            {
                                required: true,
                                message: "Exercise Name Required"
                            },
                        ]}
                        >
                            <Input placeholder="Exercise Name" style={{ height: "45px" }} />
                        </Form.Item>
                        <Form.Item name="Muscle_Group" label="Muscle Group" rules={[
                            {
                                required: true,
                                message: "Muscle Group Required"
                            },
                        ]}
                        >
                            <Input placeholder="Muscle Group" style={{ height: "45px" }} />
                        </Form.Item>
                        <Form.Item
                            name="Exercise_Class"
                            label="Exercise Class"
                            rules={[
                                {
                                    required: true,
                                    message: "Exercise Class Required"
                                },
                            ]}
                        >
                            <Select placeholder="Select Exercise Class" style={{ height: "45px" }}>
                                <Select.Option value="Upper Body">Upper Body</Select.Option>
                                <Select.Option value="Lower Body">Lower Body</Select.Option>
                                <Select.Option value="Core">Core</Select.Option>
                                <Select.Option value="Full-Body & HIIT">Full-Body & HIIT</Select.Option>
                                <Select.Option value="Endurance & Cardio">Endurance & Cardio</Select.Option>
                                <Select.Option value="Flexibility & Yoga">Flexibility & Yoga</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="Sets" label="Sets" rules={[
                            {
                                required: true,
                                message: "Sets Required "
                            },
                        ]}
                        >
                            <Input placeholder="# of Sets" style={{ height: "45px" }} />
                        </Form.Item>
                        <Form.Item name="Reps" label="Reps" rules={[
                            {
                                required: true,
                                message: "Reps Required"
                            },
                        ]}
                        >
                            <Input placeholder="# of Reps" style={{ height: "45px" }} />
                        </Form.Item>
                        <Form.Item name="Exercise_Description" label="Description" rules={[
                            {
                                required: true,
                                message: "Description Required"
                            },
                        ]}
                        >
                            <Input placeholder="Description" style={{ height: "45px" }} />
                        </Form.Item>
                        <Form.Item name="Forum_Text" label="Feedback" rules={[
                            {
                                required: true,
                                message: "Feedback Required"
                            },
                        ]}
                        >
                            <Input placeholder="Feedback" style={{ height: "45px" }} />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    width: "100%",
                                    borderRadius: "18px",
                                    padding: "22px 0px",
                                    backgroundColor: "#A3C3A4"
                                }}
                            >
                                Create Discussion Post
                            </Button>
                        </Form.Item>
                    </Form>
                </Flex>
            </Flex>
        </Modal>
    )
}

export default AddPostModal