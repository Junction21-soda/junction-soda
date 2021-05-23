import React, { useState } from "react";
import styled, { css } from "styled-components";
import Palette from "../../../css/Palette";


const SafetyText = styled.div`
  color: ${Palette.Grey1};
  font-size: 12px;
  line-height: 16px;
  margin-top: 4px;
`;

const SafetyLvl = styled.div`
  color: ${Palette.Primary};
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  text-align: right;
  margin-left: 4px;
`;

function SafetyInfo() {
  return (
    <>
      <SafetyText>Safety lvl. </SafetyText>
            <SafetyLvl>A</SafetyLvl>
   </>
  );
}

export default SafetyInfo;
