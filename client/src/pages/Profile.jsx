import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import { logout } from '../redux/apiCalls';
import { userRequest } from '../requestMethods';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 80px 20px;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 400;
  margin-bottom: 16px;
`;

const Text = styled.p`
  margin-bottom: 8px;
`;

const ShowButton = styled.button`
  padding: 10px;
  margin-top: 16px;
  margin-bottom: 16px;
  border: solid 2px;
  background: transparent;
  cursor: pointer;
  &:hover {
    background: #f8f4f4;
  }
`;

const OrderTitle = styled.h2`
  font-size: 20px;
  font-weight: 400;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 400px;
  text-align: left;
  margin-top: 8px;
  margin-bottom: 32px;
`;

const Thead = styled.thead``;

const Tbody = styled.tbody``;

const Tr = styled.tr``;

const Th = styled.th`
  padding: 4px 8px 4px 0;
`;

const ItemLink = styled(Link)`
  margin-bottom: 8px;
  display: block;
  text-decoration: underline;
  text-transform: capitalize;
  cursor: pointer;
  &:hover {
    color: #666;
  }
`;

const Td = styled.td`
  padding: 4px 8px 4px 0;
  margin-bottom: 8px;
  text-transform: capitalize;
  border-top: solid 1px #ccc;
`;

const Tfoot = styled.tfoot`
  font-size: 20px;
`;

const Logout = styled.button`
  padding: 10px;
  margin-top: 16px;
  border: solid 2px #e53e3e;
  color: #e53e3e;
  background: transparent;
  cursor: pointer;
  &:hover {
    background: #f8f4f4;
  }
`;

const Profile = () => {
  const [orders, setOrders] = useState();
  const [showOrders, setShowOrders] = useState(false);
  const user = useSelector((state) => state.user?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get(`/orders`);
        setOrders(res.data);
      } catch (err) {}
    };
    getOrders();
  }, []);

  const onLogout = () => {
    navigate('/');
    logout(dispatch);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day < 10 ? '0' + day : day}.${
      month < 10 ? '0' + month : month
    }.${year}`;
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Profile</Title>
        <>
          <Text>Username: {user.username}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Registered on: {formatDate(user.createdAt)}</Text>
          <Text>Admin rights: {user.isAdmin.toString()}</Text>
        </>

        <div>
          {orders && (
            <ShowButton onClick={() => setShowOrders(!showOrders)}>
              {showOrders ? 'Hide' : 'Show'} orders
            </ShowButton>
          )}
          {showOrders &&
            orders &&
            orders
              .filter((o) => o.userId === user._id)
              .map((o, index) => (
                <>
                  <OrderTitle>
                    Order #{index + 1} - {formatDate(o.createdAt)}
                  </OrderTitle>
                  <p>{o.status}</p>
                  <TableWrapper>
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>Title</Th>
                          <Th>Size</Th>
                          <Th>Color</Th>
                          <Th>Qtt</Th>
                          <Th>Price</Th>
                          <Th>Subtotal</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {o.products.map((p) => (
                          <Tr key={p._id}>
                            <Td>
                              <ItemLink to={'/product/' + p._id}>
                                {p.title}
                              </ItemLink>
                            </Td>
                            <Td>{p.size}</Td>
                            <Td>{p.color}</Td>
                            <Td>{p.quantity}</Td>
                            <Td>{p.price}€</Td>
                            <Td>{p.price * p.quantity}€</Td>
                          </Tr>
                        ))}
                      </Tbody>
                      <Tfoot>
                        <Tr>
                          <Td colSpan={5}>TOTAL</Td>
                          <Td>{o.amount}€</Td>
                        </Tr>
                      </Tfoot>
                    </Table>
                  </TableWrapper>
                </>
              ))}
        </div>
        <Logout onClick={onLogout}>Logout</Logout>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Profile;
