import { FaFacebook, FaInstagram, FaPinterest } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mq } from "../responsive";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  ${mq({ flexDirection: "row", padding: "16px" }, 600)};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 16px 0;
`;

const SocialContainer = styled.div`
  display: flex;
  gap: 8px;
  svg {
    font-size: 24px;
    cursor: pointer;
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.6;
    }
  }
`;

const Center = styled.div`
  flex: 1;
  padding: 16px;
  display: none;
  ${mq({ display: "unset" }, 600)}
`;

const Title = styled.h3`
  margin-bottom: 16px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled(Link)`
  width: 50%;
  margin-bottom: 8px;
  transition: color 0.2s;
  &:hover {
    color: #666;
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 16px;
  background: #fff8f8;
  ${mq({ background: "transparent" }, 600)};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  svg {
    margin-right: 8px;
  }
`;

const Footer = () => {
  const user = useSelector((state: any) => state.user?.currentUser);

  return (
    <Container>
      <Left>
        <Logo>SHOP</Logo>
        <Desc>An amazing development shop</Desc>
        <SocialContainer>
          <FaFacebook />
          <FaInstagram />
          <FaPinterest />
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful links</Title>
        <List>
          <ListItem to="/">Home</ListItem>
          <ListItem to="/cart">Cart</ListItem>
          <ListItem to="/products">Products</ListItem>
          {user ? (
            <>
              <ListItem to="/profile">Profile</ListItem>
              <ListItem to="/wishlist">Wishlist</ListItem>
            </>
          ) : (
            <>
              <ListItem to="/login">Login</ListItem>
              <ListItem to="/register">Register</ListItem>
            </>
          )}
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <FiMapPin />
          Test street, 1030 Brussels, BE
        </ContactItem>
        <ContactItem>
          <FiPhone />
          +32 497629736
        </ContactItem>
        <ContactItem>
          <FiMail />
          mail@mail.mail
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;
