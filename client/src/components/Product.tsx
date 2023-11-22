import { FaHeart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { updateWishlist } from "../redux/userRedux";

const Container = styled.div`
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ebf8ff;
  position: relative;
`;

const LinkImage = styled(Link)`
  width: 100%;
  &:hover > img {
    transform: scale(1.1);
  }
`;

const LinkTitle = styled(Link)`
  width: 100%;
  &:hover + ${LinkImage} img {
    transform: scale(1.1);
  }
`;

const Image = styled.img`
  max-width: 220px;
  max-height: 220px;
  transition: transform 0.2s;
`;

const Title = styled.h2`
  font-weight: 600;
  padding: 20px 0;
  text-transform: capitalize;
`;

const Icons = styled.div`
  display: flex;
  gap: 10px;
  padding: 20px 0;
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

const Product = ({ item }: { item: productType }) => {
  const user = useSelector((state: any) => state.user?.currentUser);
  const dispatch = useDispatch();

  const handleHeart = (prod) => {
    dispatch(updateWishlist(prod));
  };

  return (
    <Container data-testid={`product-${item._id}`}>
      <LinkTitle to={"/product/" + item._id}>
        <Title>{item.title}</Title>
      </LinkTitle>

      <LinkImage to={"/product/" + item._id}>
        <Image src={item.img} alt={item.title} />
      </LinkImage>

      <Icons>
        <Link to={"/product/" + item._id}>
          <Icon>
            <FaSearch />
          </Icon>
        </Link>
        {user && (
          <Icon onClick={() => handleHeart(item)}>
            <FaHeart
              style={{
                color: user?.wishlist.some((w) => w._id === item._id) ? "red" : undefined,
              }}
            />
          </Icon>
        )}
      </Icons>
    </Container>
  );
};

export default Product;
