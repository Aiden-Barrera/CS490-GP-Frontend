import { Modal, message, Flex, InputNumber } from "antd";
import { useEffect, useState, useCallback } from "react";

const AddCalendar = (props) => {
    const days = [ 'Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [selectedDays, setSelectedDays] = useState([]);
    const [exercise, setExercise] = useState({ reps: 1, sets: 1 });

    const onChange = (value) => {
        console.log(`selected ${value}`, value);
    }; //Logs what values are selected

    useEffect(() => {
        if (props.open) {
            message.destroy();
        }
    }, [props.open]);

    useEffect(() => {
        console.log(selectedDays);
    }, [selectedDays]); // Logs selectedDays only when it updates

    const handleClose = () => {
        message.destroy();
        if (props.handleClose) {
            props.handleClose();
        }
    };

    const handleDayClick = useCallback((day) => {
        if (selectedDays.includes(day)) {
          setSelectedDays(selectedDays.filter((d) => d !== day));
        } else {
          setSelectedDays([...selectedDays, day]);
        }
      }, [selectedDays, setSelectedDays]);
    
      const handleRepsChange = (value) => {
        setExercise({ ...exercise, reps: value });
      };
    
      const handleSetsChange = (value) => {
        setExercise({ ...exercise, sets: value });
      };

    return (
        <Modal 
            open={props.open} 
            footer={null} 
            onCancel={handleClose} 
            centered 
            className="style-modal" 
            width={1000}
            style={{ padding: '20px'}}
        >
            <Flex 
                justify="center" 
                align="center" 
                style={{ height:'10vh',
                    backgroundColor: "#A8C4A2", 
                    textAlign: "center", 
                    marginBottom: "20px",
                    color: "#ffffff", 
                    fontSize: "50px", 
                    fontWeight: "bold", 
                    borderRadius: "10px"
                    }}>
                    Exercise Customization
            </Flex>
        

            <Flex justify="center" align="center">Select what day(s) to schedule your exercise</Flex>
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
                        }}
                        onClick={() => handleDayClick(day)}
                    >
                        {selectedDays.includes(day) && (
                        <p style={{ fontSize: '12px', textAlign: 'center' }}>
                            Selected
                        </p>
                        )}
                    </div>
                    ))}
                </div>
            </div>

            <Flex 
            justify = "space-between"
            align = "flex-start"
            style={{
                marginTop:"20px",
                height:"300px",
                backgroundColor:"red",
                border:"1px solid black",
                borderRadius:"10px",
                padding: "0px 100px 0px 100px"
            }}>
                <Flex 
                vertical
                justifyContent= "space-between"
                align="center"
                >
                    Reps
                    <InputNumber min={1} max={20} defaultValue={1} onChange={onChange} />
                </Flex>
                

                <Flex 
                vertical
                justifyContent= "space-between"
                align="center"
                >
                    Sets
                    <InputNumber justifyContent= "center" align="center" min={1} max={10} defaultValue={1} onChange={onChange} />
                </Flex>

            </Flex>
        </Modal>
    );
};

export default AddCalendar;
