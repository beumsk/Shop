import styled from 'styled-components';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
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
  margin-bottom: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 8px 0;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
`;

const Agreement = styled.p`
  font-size: 12px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 12px 16px;
  background: #319795;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  ${mq({ width: '40%' })}
`;

const Register = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>Create an account</Title>
          <Form>
            <Input placeholder="name" />
            <Input placeholder="last name" />
            <Input placeholder="username" />
            <Input placeholder="email" />
            <Input placeholder="password" />
            <Input placeholder="confirm password" />
            <Agreement>
              I agree to everything by creating an account in accordance to the
              privacy policy.
            </Agreement>
            <Button>Create</Button>
          </Form>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Register;
