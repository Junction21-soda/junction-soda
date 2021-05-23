import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Palette from '../../css/Palette'
import Pickup from './Pickup.svg';

function StartMarker(props: any){


  const {name,id} = props;
  return(
    <img src={Pickup} style={{width: '25px', height: '54px'}}></img>
  )
}

export default StartMarker;