import { FaHeart, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mq } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { updateWishlist } from '../redux/userRedux';

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
`;

const Image = styled.img`
  max-width: 220px;
  max-height: 220px;
  z-index: 2;
`;

const Info = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  transition: all 0.5s ease;
  ${mq({ opacity: 0 }, 900)}
`;

const Title = styled.h2`
  color: #fff;
  font-weight: 600;
  text-transform: capitalize;
  transition: color 0.4s ease;
  &:hover {
    color: #57cccc;
  }
`;

const Container = styled.div`
  flex: 1;
  min-width: 280px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ebf8ff;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Icons = styled.div`
  display: flex;
  gap: 10px;
`;

const Icon = styled.div`
  padding: 10px;
  border-radius: 50%;
  background: white;
  transition: all 0.5s ease;
  cursor: pointer;
  &:hover {
    background: #cde9e9;
  }
  svg {
    display: block;
  }
`;

const Product = ({ item }) => {
  const user = useSelector((state) => state.user?.currentUser);
  const dispatch = useDispatch();

  const handleHeart = (prod) => {
    dispatch(updateWishlist(prod));
  };

  return (
    <Container>
      <Circle />
      <Image src={item.img} alt={item.title} />
      <Info>
        <Link to={'/product/' + item._id}>
          <Title>{item.title}</Title>
        </Link>
        <Icons>
          <Link to={'/product/' + item._id}>
            <Icon>
              <FaSearch />
            </Icon>
          </Link>
          {user && (
            <Icon onClick={() => handleHeart(item)}>
              <FaHeart
                style={{
                  color: user?.wishlist.some((w) => w._id === item._id)
                    ? 'red'
                    : null,
                }}
              />
            </Icon>
          )}
        </Icons>
      </Info>
    </Container>
  );
};

export default Product;
