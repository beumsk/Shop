import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { mq } from '../responsive';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/apiCalls';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mq({ padding: '10px 20px' }, 600)}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  display: none;
  ${mq({ display: 'unset' }, 600)}
`;

const SearchContainer = styled.form`
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  ${mq({ marginLeft: '16px' }, 600)};
`;

const Input = styled.input`
  border: none;
  width: 50px;
  padding: 4px;
  ${mq({ width: 'unset' }, 600)};
`;

const InputButton = styled.button`
  border: none;
  background: none;
  height: 26px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #ddd;
  }
`;

const InputIcon = styled(FaSearch)`
  color: #666666;
  font-size: 16px;
  padding: 4px;
  height: 24px;
  width: 20px;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled(Link)`
  font-weight: bold;
  font-size: 24px;
  letter-spacing: 4px;
  margin-left: 8px;
  padding: 8px 0;
  ${mq({ fontSize: '32px' }, 600)};
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled(Link)`
  font-size: 12px;
  cursor: pointer;
  margin-left: 8px;
  position: relative;
  transition: color 0.2s;
  &:hover {
    color: #666;
  }
  ${mq({ fontSize: '14px', marginLeft: '16px' }, 600)}
`;

const Logout = styled.span`
  font-size: 12px;
  margin-left: 8px;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: #666;
  }
  ${mq({ fontSize: '14px', marginLeft: '16px' }, 600)}
`;

const Count = styled.div`
  background: #319795;
  color: #fff;
  font-size: 10px;
  border-radius: 50%;
  position: absolute;
  top: -8px;
  right: -8px;
  width: 14px;
  height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  &.animated {
    animation: add 1s 1;
  }
  @keyframes add {
    50% {
      transform: scale(1.5);
    }
  }
`;

const Navbar = () => {
  const [input, setInput] = useState('');
  const notInitialRender = useRef(false);
  const countEl = useRef(null);
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (notInitialRender.current) {
      countEl.current?.classList.add('animated');
      setTimeout(() => {
        countEl.current?.classList.remove('animated');
      }, 1000);
    } else {
      notInitialRender.current = true;
    }
  }, [quantity]);

  const onLogout = () => {
    logout(dispatch);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input?.length > 2) {
      navigate('/search/' + input.toLowerCase(), { data: { input } });
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer onSubmit={handleSubmit}>
            <Input
              placeholder="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ outlineColor: input?.length > 2 ? '' : '#E53E3E' }}
            />
            <InputButton>
              <InputIcon />
            </InputButton>
          </SearchContainer>
        </Left>
        <Center>
          <Logo to="/">SHOP</Logo>
        </Center>
        <Right>
          {user && (
            <>
              <MenuItem to="/profile">Profile</MenuItem>
              <Logout onClick={onLogout}>Logout</Logout>
              <MenuItem to="/wishlist">
                <FaHeart style={{ verticalAlign: 'middle' }} />
              </MenuItem>
            </>
          )}
          {!user && (
            <>
              <MenuItem to="/register">Register</MenuItem>
              <MenuItem to="/login">Login</MenuItem>
            </>
          )}
          <MenuItem to="/cart">
            <FaShoppingCart style={{ verticalAlign: 'middle' }} />
            {quantity > 0 && <Count ref={countEl}>{quantity}</Count>}
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
