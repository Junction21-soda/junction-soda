import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';


import { createGlobalStyle } from 'styled-components';
import App from './App';


const GlobalStyle = createGlobalStyle`
body{
  background: #e9ecef;
}`

render(
  <BrowserRouter>
  <div>
    <GlobalStyle />
    <App></App>
    </div>,
  </BrowserRouter>,
  document.getElementById('root'),
);
