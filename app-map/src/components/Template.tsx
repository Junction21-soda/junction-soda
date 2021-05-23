import React from 'react';
import styled from 'styled-components'
import BackgroundMap from './BackgroundMap';
import ArrivedAtDest from './Info/ArrivedAtDest';
import CheckDriverInfo from './Info/CheckDriverInfo';
import DrivingInfo from './Info/DrivingInfo';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

const TemplateBlock = styled.div`
  width: 360px;
  height: 100%;

  position: relative;
  background: white;
  display: flex;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  
`

function Template(){
  return(
    <div>
      <TemplateBlock>
      <BackgroundMap></BackgroundMap>
      <Switch>
      <Route exact path="/arrived" component={ArrivedAtDest}></Route>
      <Route exact path="/driverinfo" component={CheckDriverInfo}></Route>
      <Route exact path="/" component={DrivingInfo}></Route>
      </Switch>
      {/* <DrivingInfo></DrivingInfo> */}
      {/* <CheckDriverInfo></CheckDriverInfo> */}
      {/* <ArrivedAtDest></ArrivedAtDest> */}
        
      </TemplateBlock>
    </div>
  )
}

export default Template;