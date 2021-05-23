import React, { useState } from "react";
import styled, { css } from "styled-components";
import Palette from "../../css/Palette";
import Haneulmom from "./Haneulmom.jpeg";
import alertfilled from "./alertfilled.png";
import { FaPhone } from "react-icons/fa";
import DriverInfo from "./shared/DriverInfo";
import SafetyInfo from "./shared/SafetyInfo";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router';
const InfoContainer = styled.div`
  width: 360px;
  height: 250px;
  background-color: white;
  border-radius: 12px 12px 0px 0px;
  position: absolute;
  z-index: 10;
  bottom: 0;
  left: 0;
`;
const TimeText = styled.div`
  color: black;
  bottom: 0;
  margin-left: 13px;
  margin-top: 20px;
  font-size: 20px;
`;

const Line = styled.div`
  color: ${Palette.Grey3};
  border: 1px solid;
  width: 100%;
  margin-top: 15px;
`;

const DepartureText = styled.div`
  color: ${Palette.Grey1};
  font-size: 12px;
  line-height: 16px;
  margin-top: 15px;
  margin-left: 51px;
`;

const LocationText = styled.div`
  color: black;
  margin-left: 13px;
  font-size: 16px;
`;

const LocationWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const DepartureDot = styled.div`
  margin-left: 24px;
  width: 11px;
  height: 11px;
  left: 24px;
  background-color: ${Palette.Primary};
  border-radius: 50%;
`;

const DestDot = styled.div`
  margin-left: 24px;
  width: 11px;
  height: 11px;
  left: 24px;
  background-color: ${Palette.Green};
  border-radius: 50%;
`;

const userPicStyle = {
  borderRadius: "50%",
  width: "32px",
  height: "32px",
  marginLeft: "14px",
  marginTop: "16px",
  marginRight: "7px",
};

const IconBtn = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid #eeeeee;
  background-color: white;
  box-sizing: border-box;
  border-radius: 8px;
  margin-right:13px
`;
const IconWrapper = styled.div`
  margin-top: 15px;
  margin-left: 130px;
`;

function DrivingInfo() {

  const history = useHistory();

  const handleOnClick = (e:any) => {
    e.preventDefault(); //prevent transition
    history.push('/arrived');
       
};

  return (
    <InfoContainer>
      <TimeText>2 min away..</TimeText>
      <Line></Line>
      <DepartureText>Departure</DepartureText>
      <LocationWrapper>
        <DepartureDot ></DepartureDot>
        <LocationText onClick={handleOnClick}>Main gate of Gunyoung castvill</LocationText>
      </LocationWrapper>

      <DepartureText>Destination</DepartureText>
      <LocationWrapper>
        <DestDot></DestDot>
        <LocationText>Aruem School</LocationText>
      </LocationWrapper>
      <Line></Line>

      <LocationWrapper>
        <Link to="/driverinfo">
        <img src={Haneulmom} alt="user" style={userPicStyle}></img>
        </Link>
        <div style={{ flexDirection: "column" }}>
          
            <div style={{marginTop: '15px'}}>
           <DriverInfo></DriverInfo>
           </div>

          <LocationWrapper>
            <SafetyInfo></SafetyInfo>
          </LocationWrapper>
        </div>

        <IconWrapper>
          <IconBtn>
            <FaPhone></FaPhone>
          </IconBtn>
          <IconBtn>
            <img
              src={alertfilled}
              style={{ width: "16px", height: "16px" }}
            ></img>
          </IconBtn>
        </IconWrapper>
      </LocationWrapper>
    </InfoContainer>
  );
}

export default DrivingInfo ;
