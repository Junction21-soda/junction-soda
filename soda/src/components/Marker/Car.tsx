import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import CarImg from './CarImg.svg';

function Car(props: any){


  const {name,id} = props;
  return(
    <img src={CarImg} style={{width: '40px', height: '80px'}}></img>
  )
}

export default Car;