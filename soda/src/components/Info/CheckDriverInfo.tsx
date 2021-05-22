import React, { useState } from "react";
import styled, { css } from "styled-components";
import Palette from "../../css/Palette";
import { FaChevronRight } from "react-icons/fa";
import Haneulmom from "./Haneulmom.jpeg";
import DriverInfo from "./shared/DriverInfo";
import SafetyInfo from "./shared/SafetyInfo";

const Line = styled.div`
  color: ${Palette.Grey3};
  border: 1px solid;
  width: 100%;
`;

const InfoContainer = styled.div`
  width: 360px;
  height: 250px;
  background-color: white;
  border-radius: 12px 12px 0px 0px;
  position: absolute;
  z-index: 10;
  bottom: 0;
  display: flex;
  left: 0;
`;

const userPicStyle = {
  borderRadius: "50%",
  width: "64px",
  height: "64px",
  marginLeft: "148px",
  marginTop: "-32px",
};

const InfoWrapper = styled.div`
  margin-left: 135px;
  margin-bottom: 10px;
`;

const CarInfoBtn = styled.div`
  width: 343px;
  height: 48px;
  cursor: pointer;
  background-color: white;

  line-height: 48px;
  padding-left: 16px;

  // display: flex;
  // justify-content: center;
  // align-items: center;
`;

const LocationWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

function CheckDriverInfo() {
  return (
    <>
      <InfoContainer>
        <div style={{ flexDirection: "column" }}>
          <img src={Haneulmom} alt="user" style={userPicStyle}></img>

          <InfoWrapper>
            <DriverInfo></DriverInfo>
            <LocationWrapper>
              <SafetyInfo></SafetyInfo>
            </LocationWrapper>
          </InfoWrapper>

          <CarInfoBtn>
            Car Information
            <FaChevronRight
              style={{
                float: "right",
                marginRight: "16px",
                marginTop: "14px",
                color: "#666666",
              }}
            ></FaChevronRight>
          </CarInfoBtn>
          <Line></Line>
          <CarInfoBtn>
            Accident record
            <FaChevronRight
              style={{
                float: "right",
                marginRight: "16px",
                marginTop: "14px",
                color: "#666666",
              }}
            ></FaChevronRight>
          </CarInfoBtn>
          <Line></Line>
        </div>
      </InfoContainer>
    </>
  );
}

export default CheckDriverInfo;
