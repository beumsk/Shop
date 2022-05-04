import styled from 'styled-components';
import { mq } from '../responsive';

const Container = styled.div`
  background: #fffaf0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px 20px;
  ${mq({ padding: '80px 20px' }, 600)}
`;

const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 20px;
  ${mq({ fontSize: '70px' }, 600)}
`;

const Desc = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const InputContainer = styled.div`
  width: 80%;
  height: 40px;
  background: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid #e2e8f0;
  ${mq({ width: '50%' }, 600)}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background: #319795;
  color: #fff;
  cursor: pointer;
  /* transition: opacity 0.2s;
  &:hover {
    opacity: 0.6;
  } */
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favorite products</Desc>
      {/* TODO: make it work */}
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>Send</Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
