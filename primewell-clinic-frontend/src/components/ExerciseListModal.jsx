import { Modal, message, Table, ConfigProvider, Space, Button, Tooltip,  App as AntdApp } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import AddCalendar from "./AddCalendar";
const ExerciseListModal = (props) => {
    const [exerciseInfo, setExerciseInfo] = useState([]);
    const [selectedRows, setSelectedRows] = useState(new Set());
    const [selectedModalVisible, setSelectedModalVisible] = useState(false);

    
    useEffect(() => {
        const fetchExerciseInfo = async () => {
            try {
                const res = await axios.get("http://localhost:3000/exercisebank");
                setExerciseInfo(res.data);
            } catch (error) {
                console.error("Error fetching exercise data:", error);
            }
        };
        fetchExerciseInfo();
    }, []);

    useEffect(() => {
        if (props.open) {
            message.destroy();
        }
    }, [props.open]);

    useEffect(() => {
        console.log("Selected rows:", selectedRows);
    }, [selectedRows]);

    const handleClose = () => {
        props.handleClose();
    };

    const handleButtonClick = (record) => {
        setSelectedRows((prevSelectedRows) => {
            const newSelectedRows = new Set(prevSelectedRows);
            if (newSelectedRows.has(record.Exercise_ID)) {
                newSelectedRows.delete(record.Exercise_ID);
            } else {
                newSelectedRows.add(record.Exercise_ID);
            }
            return newSelectedRows;
        });
    };

   
    const columns = [
        { title: 'Exercise Name', dataIndex: 'Exercise_Name', width: 150 },
        { title: 'ID', dataIndex: 'Exercise_ID', width: 25 },
        { title: 'Muscle Group', dataIndex: 'Muscle_Group', width: 150 },
        { title: 'Exercise Description', dataIndex: 'Exercise_Description', width: 250 },
        { title: 'Reps', dataIndex: 'Reps', width: 25 },
        { title: 'Sets', dataIndex: 'Sets', width: 25 },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Select Exercise">
                        <Button
                            shape="circle"
                            icon={<PlusOutlined />}
                            onClick={() => handleButtonClick(record)}
                            style={{
                                backgroundColor: selectedRows.has(record.Exercise_ID) ? '#A2C3A4' : 'rgba(179, 179, 179, 0.73)',
                                marginRight:'-15px'
                            }}
                        />
                    </Tooltip>
                </Space>
            ),
            width: 30,
        },
    ];

    return (
        <ConfigProvider
            theme={{
                components: {
                    Modal: { contentBg: "#FFE6E2" },
                    Table: { colorBgContainer: "#FFE6E2" },
                },
            }}
        >
            <Modal
                open={props.open}
                footer={null}
                onCancel={handleClose}
                centered
                className="style-modal"
                width="75%"
            >
                <div style={{ width: '100%', height: '100%', overflow: 'auto', backgroundColor: '#FFE6E2' }}>
                    <Table
                        columns={columns}
                        dataSource={exerciseInfo}
                        bordered
                        size="middle"
                        pagination={{ pageSize: 5 }}
                        rowClassName={(record, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
                        rowKey="Exercise_ID"
                    />
                    <style>
                        {`
                        .table-row-light { background-color: rgb(253, 202, 194); }
                        .table-row-dark { background-color: rgb(253, 210, 203); }
                        .ant-table-thead > tr > th {
                            background-color: rgb(248, 177, 166) !important;
                            font-weight: bold;
                        }
                        `}
                    </style>
                </div>
                <h3 style={{ textAlign: 'center' }}>
                        Selected {selectedRows.size} exercise(s)
                    </h3>
                    {selectedRows.size > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button type="primary" style={{ backgroundColor: '#A2C3A4'}} onClick={() => setSelectedModalVisible(true)}>
                            View Selected Exercises
                        </Button>
                    </div>
                )}
                    <AddCalendar
                    open={selectedModalVisible}
                    handleClose={() => setSelectedModalVisible(false)}
                    selectedRows={[...selectedRows]} // Convert Set to Array
                    exerciseInfo={exerciseInfo} // optional, if you want to pass full info
                    patientId={props.patientId} // assuming parent of ExerciseListModal provides this
                    footer={null}
                    title="Selected Exercises"
                    centered
                    width="50%"
                    >
                    <ul>
                        {[...selectedRows].map((id) => {
                            const exercise = exerciseInfo.find(ex => ex.Exercise_ID === id);
                            return (
                                <li key={id}>{exercise?.Exercise_Name || `Exercise ${id}`}</li>
                            );
                        })}
                    </ul>
                    </AddCalendar>
            </Modal>
        </ConfigProvider>
    );
};

export default ExerciseListModal;




