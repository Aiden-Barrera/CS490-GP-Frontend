import { Modal, Flex, Button, App } from "antd";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
const AddCalendar = (props) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [selectedDays, setSelectedDays] = useState([]);
    const { selectedRows, exerciseInfo, patientId } = props;
    const { useApp } = App;
    const { message } = useApp();

    useEffect(() => {
        if (props.open) {
            message.destroy();
        }
    }, [props.open]);

    useEffect(() => {
        console.log("Selected days:", selectedDays);
    }, [selectedDays]);

    const handleClose = () => {
        message.destroy();
        if (props.handleClose) {
            props.handleClose();
        }
    };

    const handleDayClick = useCallback((day) => {
        setSelectedDays((prevDays) =>
            prevDays.includes(day)
                ? prevDays.filter((d) => d !== day)
                : [...prevDays, day]
        );
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();

        const Regiment = selectedRows.map((exerciseId) => ({
            exercise: exerciseId,
            days: selectedDays
        }));

        axios.post("http://localhost:3000/regiment", { Patient_ID: patientId, Regiment })
            .then(response => {
                console.log("Submitted:", Regiment);
            })
            .catch(error => {
                console.error("Error submitting regiment:", error);
            });

        props.handleClose();
    };
    return (
        <Modal
            open={props.open}
            footer={null}
            onCancel={handleClose}
            centered
            className="style-modal"
            width={1000}
            style={{ padding: '20px' }}
        >
            <form onSubmit={handleSubmit}>
                <Flex justify="center" align="center" style={{ marginBottom: '20px' }}>
                    Select what day(s) to schedule your exercise
                </Flex>

                <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#ccc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {days.map((day, index) => (
                            <div key={index} style={{ width: '14.28%', textAlign: 'center' }}>
                                {day}
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {days.map((day, index) => (
                            <div
                                key={index}
                                style={{
                                    width: '14.28%',
                                    height: '50px',
                                    border: '1px solid #ccc',
                                    backgroundColor: selectedDays.includes(day) ? '#FFE4E1' : '#fff',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleDayClick(day)}
                            >
                                {selectedDays.includes(day) && (
                                    <p style={{ fontSize: '12px', textAlign: 'center' }}>Selected</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                {selectedDays.length > 0 && (
                    <Flex justify="center" style={{ marginTop: '30px' }}>
                        <Button htmlType="submit" type="primary" style={{backgroundColor:"#A8C4A2"}}>
                            Submit Schedule
                        </Button>
                    </Flex>
                )}
            </form>
        </Modal>
    );
};

export default AddCalendar;
