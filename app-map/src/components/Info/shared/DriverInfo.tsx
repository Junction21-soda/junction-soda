import React, { useState } from "react";
import styled, { css } from "styled-components";
import Palette from "../../../css/Palette";
import badge from "./badge.png";

const NameText = styled.div`
  color: ${Palette.Grey1};
  font-size: 12px;
  line-height: 16px;

`;

const LocationWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
function DriverInfo() {
  return (
    <LocationWrapper>
      <NameText>Haneulmom</NameText>
      <img
        src={badge}
        alt="badge"
        style={{ width: "16px", height: "16px",}}
      ></img>
    </LocationWrapper>
  );
}

export default DriverInfo;
