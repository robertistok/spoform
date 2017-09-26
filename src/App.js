import React from 'react';
import styled from 'styled-components';

import RegisterForm from './RegisterForm';

const App = () => (
  <Wrapper>
    <RegisterForm />
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f5fafa;
  height: 100vh;
`;

export default App;
