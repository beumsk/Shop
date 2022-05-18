import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import Product from '../components/Product';
import { mq } from '../responsive';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 40px 20px;
  ${mq({ padding: '60px 20px' }, 900)}
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 400;
  margin-bottom: 16px;
  text-align: center;
`;

const ProductContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: center;
  gap: 16px;
`;

const Linkk = styled(Link)`
  font-size: 20px;
  margin: 32px 0;
  text-decoration: underline;
  text-align: center;
  display: block;
  cursor: pointer;
  &:hover {
    color: #666;
  }
`;

const Wishlist = () => {
  const user = useSelector((state) => state.user?.currentUser);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Wishlist</Title>
        {user.wishlist?.length > 0 ? (
          <ProductContainer>
            {user.wishlist.map((w) => (
              <Product item={w} key={w._id} />
            ))}
          </ProductContainer>
        ) : (
          <Linkk to="/products">Find products for your wishlist</Linkk>
        )}
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Wishlist;
