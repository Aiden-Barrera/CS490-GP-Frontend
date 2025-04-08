import { Modal, message, Flex, Button } from "antd";
import { useEffect, useState, useCallback } from "react";

const AddCalendar = (props) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [selectedDays, setSelectedDays] = useState([]);

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
        console.log("Submitting:", { selectedDays, exercise });
        // POST request to the backend
        // props.onSubmit({ selectedDays, exercise });
        handleClose();
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
                        <Button htmlType="submit" type="primary">
                            Submit Schedule
                        </Button>
                    </Flex>
                )}
            </form>
        </Modal>
    );
};

export default AddCalendar;
