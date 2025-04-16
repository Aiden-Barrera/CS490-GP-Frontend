import { Modal, Flex, Button, message } from "antd";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const AddCalendar = ({ open, handleClose, selectedRows, exerciseInfo, patientInfo }) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    console.log("Selected days:", selectedDays);
  }, [selectedDays]);

  const handleDayClick = useCallback((day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regimentByDay = {};
    days.forEach(day => {
      regimentByDay[day] = [];
    });

    selectedDays.forEach(day => {
      selectedRows.forEach((exerciseId) => {
        const exercise = exerciseInfo.find(ex => ex.Exercise_ID === exerciseId);
        if (exercise?.Exercise_Name) {
          regimentByDay[day].push(exercise.Exercise_Name);
        }
      });
    });

    try {
      await axios.patch(`http://localhost:3000/regiments/${patientInfo.patient_id}`, {
        Regiment: JSON.stringify({...regimentByDay})
      });
      message.success("Regiment successfully created!");
      console.log("Submitted:", regimentByDay);
    } catch (error) {
      console.error("Error submitting regiment:", error);
    }

    if (handleClose) handleClose();
  };

  return (
    <Modal
      open={open}
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
            <Button htmlType="submit" type="primary" style={{ backgroundColor: "#A8C4A2" }}>
              Submit Schedule
            </Button>
          </Flex>
        )}
      </form>
    </Modal>
  );
};

export default AddCalendar;