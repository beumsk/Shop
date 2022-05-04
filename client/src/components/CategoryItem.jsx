import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mq } from '../responsive';

const Container = styled.div`
  flex: 1;
  height: 400px;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &:hover button {
    border: solid 1px black;
    background: rgba(256, 256, 256, 0.8);
  }
`;

const Title = styled.h1`
  color: #fff;
  margin-bottom: 20px;
  padding: 0 8px;
  text-align: center;
  font-size: 20px;
  ${mq({ fontSize: '32px' }, 900)}
`;

const Button = styled.button`
  border: solid 1px white;
  padding: 10px;
  background: white;
  transition: all 0.2s;
  cursor: pointer;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={'/products/' + item.cat}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>Shop now</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
