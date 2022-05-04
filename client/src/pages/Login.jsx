import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { login } from '../redux/apiCalls';
import { mq } from '../responsive';

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 100px);
  padding: 40px 0;
  background: url('/images/clothes-hanging.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 16px;
  width: 80%;
  background: white;
  ${mq({ width: '40%' }, 600)}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  margin: 8px 0;
  padding: 8px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 12px 16px;
  background: #319795;
  color: #fff;
  cursor: pointer;
  margin: 8px 0;
  text-transform: uppercase;
  ${mq({ width: '40%' }, 600)}
  &:disabled {
    opacity: 0.6;
  }
`;

const Error = styled.p`
  color: #e53e3e;
`;

const Linkk = styled(Link)`
  margin: 4px 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: #666;
  }
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>Sign in</Title>
          <Form>
            <Input
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin} disabled={isFetching}>
              Login
            </Button>
            {error && <Error>Something went wrong...</Error>}
            <Linkk to="/">Forgot password</Linkk>
            <Linkk to="/register">Create new account</Linkk>
          </Form>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
