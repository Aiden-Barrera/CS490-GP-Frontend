import { useState } from "react";
import {Flex, Layout} from "antd"
import {  BorderOutlined } from '@ant-design/icons'

const {Content, Sider} = Layout
const ReviewCard = () => {
    const DoctorHeader = ({ name }) => {
    return (
      <h2
        justify="start"
        align="start"
        style={{
          color: "#0C0C0D",
          backgroundColor: '#FFE6E2',
          fontSize: 36,
          marginTop: 5,
          marginLeft: 10,
          height: 30,
          fontFamily:'Poppins'
        }}
      >
        {name}
      </h2>
    );
  };
  
  const ReviewBody = ({ reviewBody }) => {
    return (
      <div
        style={{
          width: 660,
          height: 100,
          fontSize: 20,
          marginTop: -10,
          textAlign: 'left',
          padding: 10,
          backgroundColor: '#FFE6E2',
          color: '#333',
          overflow: 'auto',
          fontFamily:'Poppins'
      }}
      >
        {reviewBody}
      </div>
    );
  };
  
  
return (
    <>
        {/*Format of the review cards*/}
            <Layout 
            style={{
                borderRadius: 8,
                overflow: 'hidden',
                width: '100%',
                height: "210px",
                backgroundColor: "#FFE6E2"
                }}
                >
                    {/*Where 'Quality', squarebox containing rating, and no. of ratings will go*/}
                    <Sider 
                    width="25%" 
                    style={{
                        flexDirection: 'column',
                        textAlign: 'center',
                        lineHeight: '120px',
                        color: '#fff',
                        backgroundColor: '#FFE6E2',
                        fontFamily:'Poppins'
                    }}
                    >
                        <Flex
                        style={{
                            marginTop: '10px',
                            width: '100%',
                            height: '30px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: '#000000'
                        }}> 
                            Quality 
                        </Flex>
                        <Flex
                        style={{
                            marginLeft: '55px',
                            width: '50%',
                            height: '101px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#ffffff',
                            color: '#000000',
                            }}
                        >     
                          <span style={{ fontSize: '70px', fontWeight: 'bold' }}>
                            3.5
                          </span>
                         </Flex>
                         <Flex
                         style={{
                            width: '100%',
                            height: '30px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: '#000000',
                         }}
                         >
                            no. of rating
                         </Flex>
                    </Sider>
                
                <Layout>
            
            {/*Header of the review card*/}
                <Flex
                style={{
                  borderRadius: 8,
                  display: 'flex',
                    backgroundColor: '#FFE6E2',
                    justifyContent: 'start',
                    alignItems: 'center',
                    }}
                >
                    {/*Put user symbol here*/}
                    <h2 
                    style={{
                      justifyContent: 'start',
                      align: "center",
                        color: "#0C0C0D",
                        backgroundColor: '#FFE6E2',
                        fontSize: 24,
                        margin: 0,
                        fontFamily:'Poppins'
                        }}
                    >
                        Header
                    </h2>

                </Flex>
                    <Content 
                    style={{
                        textAlign: 'center',
                        minHeight: 100,
                        color: '#fff',
                        backgroundColor: '#FFE6E2',
                    }}
                    >
                        <DoctorHeader name="Dr. Example" />
                       {/* <DoctorHeader name={`Dr. ${props.info.first_name} ${props.info.last_name}`} /> */}
                        <ReviewBody reviewBody= "Review goes here"/>    
                    </Content>
                </Layout>
            </Layout>
    </>
)
}

export default ReviewCard
