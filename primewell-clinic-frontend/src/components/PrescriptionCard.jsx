import { Flex, Button } from "antd";
import dayjs from "dayjs";

const PrescriptionCard = ({ prescription }) => {
    const createDate = dayjs(prescription?.Create_Date);
    console.log(prescription)

    return (
        <Flex
            vertical
            gap="10px"
            style={{
                background: "#96cdf0",
                padding: "20px 30px",
                width: "100%",
                maxWidth: "100%",
                borderRadius: "8px",
                boxSizing: "border-box",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
        >
            <Flex align="center" justify="space-between">
                <Flex vertical gap="15px">
                    <Flex gap="10px" align="center">
                        <img
                            src="/prescriptionIcon.svg"
                            alt="Prescription Icon"
                            style={{
                                width: "48px",
                                height: "auto",
                                borderRadius: "10px",
                                flexShrink: 0,
                            }}
                        />
                        <h2
                            style={{
                                color: "#ffffff",
                                fontSize: "32px",
                                borderRight: "3px solid #ffffff",
                                paddingRight: "18px",
                                margin: 0,
                            }}
                        >
                            {prescription?.Patient_Name}
                        </h2>
                        <h2
                            style={{
                                color: "#ffffff",
                                fontSize: "32px",
                                paddingLeft: "9px",
                                margin: 0,
                            }}
                        >
                            Pill {prescription?.Pill_Name} x{prescription?.Quantity}
                        </h2>
                    </Flex>
                    <Flex gap="10px" align="center">
                        <img
                            src="/firstAidIcon.svg"
                            alt="Doctor Icon"
                            style={{
                                width: "52px",
                                height: "auto",
                                borderRadius: "10px",
                                flexShrink: 0,
                            }}
                        />
                        <h2
                            style={{
                                color: "#ffffff",
                                fontSize: "32px",
                                borderRight: "3px solid #ffffff",
                                paddingRight: "18px",
                                margin: 0,
                            }}
                        >
                            Dr. {prescription?.Doctor_Name}
                        </h2>
                        <h2
                            style={{
                                color: "#ffffff",
                                fontSize: "32px",
                                paddingLeft: "9px",
                                margin: 0,
                            }}
                        >
                            {createDate.format("MMM D, YYYY")}
                        </h2>
                    </Flex>
                </Flex>

                <Button
                    type="primary"
                    style={{
                        fontWeight: "700",
                        fontSize: "24px",
                        backgroundColor: "#e6f7ff",
                        color: "#333333",
                        padding: "20px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                        cursor: "default"
                    }}
                    disabled={prescription?.Prescription_Status === "Accepted"}
                >
                    {prescription?.Prescription_Status}
                </Button>
            </Flex>
        </Flex>
    );
};

export default PrescriptionCard;
