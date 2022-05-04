import styled from 'styled-components';

const Container = styled.div`
  height: 30px;
  background: #319795;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

const Announcement = () => {
  return <Container>Super deal</Container>;
};

export default Announcement;
