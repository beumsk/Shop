import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import { mq } from '../responsive';

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  ${mq({ padding: '160px 20px' }, 900)}
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 400;
  margin-bottom: 16px;
  text-align: center;
`;

const Linkk = styled(Link)`
  font-size: 20px;
  margin: 4px 0;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: #666;
  }
`;

const NotFound = () => {
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Nothing to show here</Title>
        <Linkk to="/">Go back home</Linkk>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default NotFound;
