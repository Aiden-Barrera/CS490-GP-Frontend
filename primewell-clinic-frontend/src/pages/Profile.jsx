import { Flex, Modal, Form, message, Button, Input, Divider } from "antd"
import { useState, useEffect } from "react"
import axios from "axios"

const Profile = ({ userInfo, fetchUserInfo }) => {
    const [userProfile, setUserProfile] = useState(null)
    const [userType, setUserType] = useState("")
    const [assignedPharm, setAssignedPharm] = useState(null)
    const [assignedDoct, setAssignedDoct] = useState(null)
    const [editProfileModalOpen, setEditProfileModalOpen] = useState(false)
    const [form] = Form.useForm();


    const fetchUserProfile = async () => {
        try {
            let endpoint = ""
            let type = ""

            if (!userInfo) return
            console.log("Fetch Profile: ", userInfo)
            if (userInfo.patient_id) {
                endpoint = `http://localhost:3000/patientInfo/${userInfo.patient_id}`
                type = "Patient"
                setUserType('Patient')
            } else if (userInfo.doctor_id) {
                endpoint = `http://localhost:3000/doctorInfo/${userInfo.doctor_id}`
                type = "Doctor"
                setUserType('Doctor')
            } else if (userInfo.pharm_id) {
                endpoint = `http://localhost:3000/pharmInfo/${userInfo.pharm_id}`
                type = "Pharmacy"
                setUserType('Pharmacy')
            } else {
                console.warn("No Valid User ID Found for Profile")
            }

            const res = await axios.get(endpoint)
            const info = res.data
            setUserProfile(info[0])
            if (type === "Patient") {
                const pharmRes = await axios.get(`http://localhost:3000/pharmInfo/${info[0]?.Pharm_ID}`)
                console.log("Pharm Fetched Data: ", pharmRes.data)
                setAssignedPharm(pharmRes.data)
                if (info[0].Doctor_ID) {
                    const doctRes = await axios.get(`http://localhost:3000/doctorInfo/${info[0]?.Doctor_ID}`)
                    setAssignedDoct(doctRes.data)
                    console.log("Doctor Fetched Data:", doctRes.data)
                }
            }
            console.log("Fetched Data: ", info)
        } catch (err) {
            console.error(err)
        }
        //const res = await axios.get('"http://localhost:3000/pati')
    }

    useEffect(() => {
        fetchUserProfile()
    }, [userInfo])

    const handleClose = () => {
        message.destroy();
        form.resetFields();
        setEditProfileModalOpen(false);
    };

    const onFail = () => {
        message.error("Submit Failed!");
    };

    const onFinish = async (value) => {
        // console.log(props.info)
        if (userType === "Patient") {
            if (value.First_Name === undefined) {
                console.log("first name");
                value.First_Name = userProfile.First_Name;
            }
            if (value.Last_Name === undefined) {
                value.Last_Name = userProfile.Last_Name;
            }
            if (value.Email === undefined) {
                value.Email = userProfile.Email;
            }
            if (value.Phone === undefined) {
                value.Phone = userProfile.Phone;
            }
            if (value.Address === undefined) {
                value.Address = userProfile.Address;
            }
            if (value.Zip === undefined) {
                value.Zip = userProfile.Zip;
            }
            try {
                const res = await axios.patch(`http://localhost:3000/patient/${userInfo.patient_id}`, value);
                if (res.data.length === 0) {
                    console.log("Couldn't update patient info");
                } else {

                    fetchUserInfo()
                    // sessionStorage.setItem("userInfo", JSON.stringify(enrichedData));

                    console.log("Patient info Updated");
                }
            } catch (err) {
                console.log("Error Updating Patient: ", err);
            }
            // userInfo.First_Name = value.First_Name;
            // console.log(userInfo.First_Name);
        }
        else if (userType === "Doctor") {
            if (value.First_Name === undefined) {
                value.First_Name = userProfile.First_Name;
            }
            if (value.Last_Name === undefined) {
                value.Last_Name = userProfile.Last_Name;
            }
            if (value.Email === undefined) {
                value.Email = userProfile.Email;
            }
            if (value.Phone === undefined) {
                value.Phone = userProfile.Phone;
            }
            try {
                console.log("DoctorID: ", userInfo.doctor_id)
                const res = await axios.patch(`http://localhost:3000/doctor/${userInfo.doctor_id}`, value);
                if (res.data.length === 0) {
                    console.log("Couldn't update doctor info");
                } else {

                    // props.info(enrichedData);

                    // sessionStorage.setItem("userInfo", JSON.stringify(enrichedData));
                    fetchUserInfo()
                    console.log("Doctor info Updated");
                }
            } catch (err) {
                console.log("Error Updating Doctor: ", err);
            }
        }
        else if (userType === "Pharmacist") {
            if (value.Company_Name === undefined) {
                value.Company_Name = userProfile.Company_Name;
            }
            if (value.Address === undefined) {
                value.Address = userProfile.Address;
            }
            if (value.Zip === undefined) {
                value.Zip = userProfile.Zip;
            }
<<<<<<< HEAD
            try {
                const res = await axios.patch(`http://localhost:3000/doctor/${userInfo.doctor_id}`, value);
                if (res.data.length === 0) {
                    console.log("Couldn't update doctor info");
                } else {
=======
            // try {
            //     const res = await axios.patch(`http://localhost:3000//doctor/${userInfo.doctor_id}`, value);
            //     if (res.data.length === 0) {
            //         console.log("Couldn't update doctor info");
            //     } else {
>>>>>>> 260d32681a6369cce8d2f39c3d63ed26abc8971d

            //         // props.info(enrichedData);

<<<<<<< HEAD
                    // sessionStorage.setItem("userInfo", JSON.stringify(enrichedData));
                    fetchUserInfo()
                    console.log("Doctor info Updated");
                }
            } catch (err) {
                console.log("Error Updating Doctor: ", err);
            }
=======
            //         sessionStorage.setItem("userInfo", JSON.stringify(enrichedData));

            //         console.log("Doctor info Updated");
            //     }
            // } catch (err) {
            //     console.log("Error Updating Doctor: ", err);
            // }
>>>>>>> 260d32681a6369cce8d2f39c3d63ed26abc8971d
        }
        console.log(value);
        fetchUserProfile()
        handleClose();
    };

    return (
        <>
            <Flex justify="center" align="center" style={{
                height: "auto", width: "100vw", marginTop: "180px", marginBottom: "100px"
            }}>
                <Flex vertical gap="20px" style={{
                    background: "#ffffff",
                    borderRadius: "12px",
                    padding: "33px 40px",
                    width: "60%",
                    maxWidth: "60%",
                    overflowY: "auto",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
                }}>
                    <Flex justify="center" align="center">
                        {userType === 'Patient' && (
                            <h1 className="title" style={{ color: "#373b41", marginBottom: "10px", marginTop: 0, fontFamily: "Poppins" }}>{userProfile?.First_Name + " " + userProfile?.Last_Name}'s Profile</h1>
                        )}
                        {userType === 'Doctor' && (
                            <h1 className="title" style={{ color: "#373b41", marginBottom: "10px", marginTop: 0, fontFamily: "Poppins" }}>{userProfile?.First_Name + " " + userProfile?.Last_Name}'s Profile</h1>
                        )}
                        {userType === 'Pharmacy' && (
                            <h1 className="title" style={{ color: "#373b41", marginBottom: "10px", marginTop: 0, fontFamily: "Poppins" }}>{userProfile?.Company_Name} Profile</h1>
                        )}
                    </Flex>
                    <Flex vertical style={{ color: "#333333", fontSize: "18px" }}>
                        {userType === 'Patient' && (
                            <>
                                <p>First Name: {userProfile?.First_Name}</p>
                                <p>Last Name: {userProfile?.Last_Name}</p>
                                <p>Email: {userProfile?.Email}</p>
                                <p>Phone: {userProfile?.Phone}</p>
                                <p>Address: {userProfile?.Address}</p>
                                <p>Zip: {userProfile?.Zip}</p>
                                <p>Assigned Pharmacy: {assignedPharm?.[0]?.Company_Name} at {assignedPharm?.[0]?.Address}, {assignedPharm?.[0]?.Zip}</p>
                                <p>Assigned Doctor: {assignedDoct ? assignedDoct?.[0]?.First_Name + " " + assignedDoct?.[0]?.Last_Name : "No Doctor Requested Yet"}</p>
                            </>
                        )}
                        {userType === 'Doctor' && (
                            <>
                                <p>First Name: {userProfile?.First_Name}</p>
                                <p>Last Name: {userProfile?.Last_Name}</p>
                                <p>Specialty: {userProfile?.Specialty}</p>
                                <p>Email: {userProfile?.Email}</p>
                                <p>Phone: {userProfile?.Phone}</p>
                                <p>Doctor License ID: {userProfile?.License_Serial}</p>
                                <p>Availability: {userProfile?.Availability === 1 ? "Accepting Request" : "Not Accepting Requests"}</p>
                            </>
                        )}
                        {userType === "Pharmacy" && (
                            <>
                                <p>Pharmacy Name: {userProfile?.Company_Name}</p>
                                <p>Address: {userProfile?.Address}</p>
                                <p>Zip Code: {userProfile?.Zip}</p>
                            </>
                        )}
                    </Flex>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            width: "20%",
                            border: "1px solid #999999",
                            borderRadius: "18px",
                            padding: "22px 0px",
                            backgroundColor: "#f09c96",
                            color: "#000000",
                            marginBottom: "10px",
                        }}
                        onClick={() => {
                            setEditProfileModalOpen(true);
                        }}
                    >
                        Edit profile
                    </Button>
                </Flex>
            </Flex>
            <Modal
                open={editProfileModalOpen}
                footer={null}
                onCancel={handleClose}
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
                    <h1 style={{ fontSize: "51px", color: "#333333" }}>Edit Profile</h1>
                    <Flex vertical style={{ width: "100%" }}>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFail}
                            autoComplete="off"
                        // initialValues={userProfile}
                        >
                            {userType === 'Patient' && (
                                <>
                                    <Form.Item
                                        name="First_Name"
                                        label="First Name"
                                        initialValue={userProfile?.First_Name}
                                        rules={[
                                            {
                                                required: false,
                                                message: "Please input your First Name!",
                                            },
                                            {
                                                pattern: /^[A-Z]{1}[a-z]+$/,
                                                message: "Please input a valid First Name!",
                                            },
                                        ]}
                                        validateTrigger="onSubmit"
                                    >
                                        <Input
                                            placeholder="Enter your first name"
                                            style={{ height: "45px" }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="Last_Name"
                                        label="Last Name"
                                        initialValue={userProfile?.Last_Name}
                                        rules={[
                                            {
                                                required: false,
                                                message: "Please input your Last Name!",
                                            },
                                            {
                                                pattern: /^[A-Z]{1}[a-z]+$/,
                                                message: "Please input a valid Last Name!",
                                            },
                                        ]}
                                        validateTrigger="onSubmit"
                                    >
                                        <Input
                                            placeholder="Enter your last name"
                                            style={{ height: "45px" }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="Email"
                                        label="Email"
                                        initialValue={userProfile?.Email}
                                        rules={[
                                            {
                                                required: false,
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
                                        name="Phone"
                                        label="Phone Number"
                                        initialValue={userProfile?.Phone}
                                        rules={[
                                            {
                                                required: false,
                                                message: "Please input your Phone Number!",
                                            },
                                            {
                                                pattern: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
                                                message: "Please input a valid Phone Number!",
                                            },
                                        ]}
                                        validateTrigger="onSubmit"
                                    >
                                        <Input
                                            placeholder="Enter your phone number"
                                            style={{ height: "45px" }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="Address"
                                        label="Address"
                                        initialValue={userProfile?.Address}
                                        rules={[
                                            {
                                                required: false,
                                                message: "Please input your Address!",
                                            },
                                            {
                                                pattern: /^[0-9]+ [A-Za-z]+ [A-Za-z]+$/,
                                                message: "Please input a valid Address!",
                                            },
                                        ]}
                                        validateTrigger="onSubmit"
                                    >
                                        <Input
                                            placeholder="Enter your address"
                                            style={{ height: "45px" }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="Zip"
                                        label="Zip Code"
                                        initialValue={userProfile?.Zip}
                                        rules={[
                                            {
                                                required: false,
                                                message: "Please input your Zip Code!",
                                            },
                                            {
                                                pattern: /^[0-9]{5}$/,
                                                message: "Please input a valid Zip Code!",
                                            },
                                        ]}
                                        validateTrigger="onSubmit"
                                    >
                                        <Input
                                            placeholder="Enter your zip code"
                                            style={{ width: "100%", height: "45px" }}
                                        />
                                    </Form.Item>
                                </>
                            )}
                            {userType === 'Doctor' && (
                                <>
                                    <Form.Item
                                        name="First_Name"
                                        label="First Name"
                                        initialValue={userProfile?.First_Name}
                                        rules={[
                                            {
                                                required: false,
                                                message: "Please input your First Name!",
                                            },
                                            {
                                                pattern: /^[A-Z]{1}[a-z]+$/,
                                                message: "Please input a valid First Name!",
                                            },
                                        ]}
                                        validateTrigger="onSubmit"
                                    >
                                        <Input
                                            placeholder="Enter your first name"
                                            style={{ height: "45px" }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="Last_Name"
                                        label="Last Name"
                                        initialValue={userProfile?.Last_Name}
                                        rules={[
                                            {
                                                required: false,
                                                message: "Please input your Last Name!",
                                            },
                                            {
                                                pattern: /^[A-Z]{1}[a-z]+$/,
                                                message: "Please input a valid Last Name!",
                                            },
                                        ]}
                                        validateTrigger="onSubmit"
                                    >
                                        <Input
                                            placeholder="Enter your last name"
                                            style={{ height: "45px" }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="Email"
                                        label="Email"
                                        initialValue={userProfile?.Email}
                                        rules={[
                                            {
                                                required: false,
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
                                        name="Phone"
                                        label="Phone Number"
                                        initialValue={userProfile?.Phone}
                                        rules={[
                                            {
                                                required: false,
                                                message: "Please input your Phone Number!",
                                            },
                                            {
                                                pattern: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
                                                message: "Please input a valid Phone Number!",
                                            },
                                        ]}
                                        validateTrigger="onSubmit"
                                    >
                                        <Input
                                            placeholder="Enter your phone number"
                                            style={{ height: "45px" }}
                                        />
                                    </Form.Item>
                                </>
                            )}
                            {userType === 'Pharmacist' && (
                                <>
                                    <Form.Item
                                        name="Company_Name"
                                        label="Pharmacy Name"
                                        initialValue={userProfile?.Company_Name}
                                        rules={[
                                            {
                                                required: false,
                                                message: "Please input your Pharmacy Name!",
                                            },
                                            {
                                                pattern: /^([a-zA-Z'](\s)?)+$/,
                                                message: "Please input a valid Pharmacy Name!",
                                            },
                                        ]}
                                        validateTrigger="onSubmit"
                                    >
                                        <Input
                                            placeholder="Enter your Pharmacy's Name"
                                            style={{ height: "45px" }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="Address"
                                        label="Pharmacy Address"
                                        initialValue={userProfile?.Address}
                                        rules={[
                                            {
                                                required: false,
                                                message: "Please input your Pharmacy Address!",
                                            },
                                            {
                                                pattern: /^[0-9]+ [A-Za-z]+ [A-Za-z]+$/,
                                                message: "Please input a valid Pharmacy Address!",
                                            },
                                        ]}
                                        validateTrigger="onSubmit"
                                    >
                                        <Input
                                            placeholder="Enter your Pharmacy's Address"
                                            style={{ height: "45px" }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="Zip"
                                        label="Pharmacy Zip Code"
                                        initialValue={userProfile?.Zip}
                                        rules={[
                                            {
                                                required: false,
                                                message: "Please input your Pharmacy Zip Code!",
                                            },
                                            {
                                                pattern: /^[0-9]{5}$/,
                                                message: "Please input a valid Pharmacy Zip Code!",
                                            },
                                        ]}
                                        validateTrigger="onSubmit"
                                    >
                                        <Input
                                            placeholder="Enter your Pharmacy's Zip Code"
                                            style={{ height: "45px" }}
                                        />
                                    </Form.Item>
                                </>
                            )}
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
                                    Confirm Edit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Flex>
                </Flex>
            </Modal>
        </>
    )
}

export default Profile