import { createGlobalStyle } from 'styled-components';
import Template from './components/Template';
function App(){
  const GlobalStyle = createGlobalStyle`
  body{
    background: #e9ecef;
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
    font-family: 'Noto Sans','Work Sans', sans-serif;
  }`
  return(<>
  <GlobalStyle></GlobalStyle>
  <Template></Template>
  </>)

}

export default App;