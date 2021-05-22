import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Destination from './Destination.svg';
function Marker(props: any){

  
  return (
    <img src={Destination} style={{width: '25px', height: '54px'}}>
    </img>
    
  )
}

export default Marker;