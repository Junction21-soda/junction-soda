import React, { useState } from "react";
import styled, { css } from "styled-components";
import Palette from "../../css/Palette";
import Haneulmom from "./Haneulmom.jpeg";
import DriverInfo from "./shared/DriverInfo";
import SafetyInfo from "./shared/SafetyInfo";
import { FaPhone } from "react-icons/fa";
import alertfilled from "./alertfilled.png";

const InfoContainer = styled.div`
  width: 360px;
  height: 346px;
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
  margin-top: 24px; //TODO: ALIGN THIS WITH OTHER LINES
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 25px;
  margin-left: 8px;
`;

const ColumnWrapper = styled.div`
  flex-direction: column;
`;

const IconBtn = styled.div`
  width: 120px;
  height: 32px;
  border: 1px solid #eeeeee;
  background-color: white;
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 8px;
  cursor:pointer;
`;

const BtnText = styled.div`
  font-size: 16px;
  font-weight: bold;
`;
const userPicStyle = {
  borderRadius: "50%",
  width: "64px",
  height: "64px",
  marginLeft: "16px",
  marginTop: "24px",
};

const PrimaryBtn = styled.button`
  width: 328px;
  height: 48px;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  border-radius: 8px;
  background-color: white;
  color: black;
  cursor:pointer
`;
const SecondaryBtn = styled.button`
  
  width: 328px;
  height: 48px;
  background-color: ${Palette.Primary};
  cursor:pointer;
  border-radius: 8px;
  color: white;
  border:none
`;

const BtnWrapper = styled.div`
  margin-top: 24px;
  margin-left: 16px;
  margin-right: 16px;
`
const PrimaryBtnWrapper = styled.div`
margin-bottom:16px;
`
function ArrivedAtDest() {
  return (
    <InfoContainer>
      <TimeText>8:49AM arrived</TimeText>
      <Line></Line>
      <Wrapper>
        <img src={Haneulmom} alt="user" style={userPicStyle}></img>
        <ColumnWrapper>
          <InfoWrapper>
            <div style={{ marginTop: "4px", marginRight: "102px" }}>
              <DriverInfo></DriverInfo>
            </div>
            <Wrapper>
              <SafetyInfo></SafetyInfo>
            </Wrapper>
          </InfoWrapper>
          <Wrapper>
            <IconBtn>
              <FaPhone style={{ marginRight: "4px" }}></FaPhone>call
            </IconBtn>
            <IconBtn>
              <img
                src={alertfilled}
                style={{ width: "16px", height: "16px", marginRight: "4px" }}
              ></img>
              report
            </IconBtn>
          </Wrapper>
        </ColumnWrapper>
      </Wrapper>
      <Line></Line>

      <ColumnWrapper>
      <BtnWrapper>
        <PrimaryBtnWrapper>
        <PrimaryBtn>
          <BtnText>Tip jar</BtnText>
        </PrimaryBtn>
        </PrimaryBtnWrapper>
       
        <SecondaryBtn>
          <BtnText>Done</BtnText>
        </SecondaryBtn>
        </BtnWrapper>
      </ColumnWrapper>
    </InfoContainer>
  );
}

export default ArrivedAtDest;
