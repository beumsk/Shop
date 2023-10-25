import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { emptyCart } from "../redux/cartRedux";
import { userRequest } from "../requestMethods";
import { mq } from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  ${mq({ padding: "160px 20px" }, 900)}
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 400;
  margin-bottom: 16px;
  text-align: center;
`;

const Subtitle = styled.p`
  margin-bottom: 16px;
  text-align: center;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 400px;
  text-align: left;
`;

const Thead = styled.thead``;

const Tbody = styled.tbody``;

const Tr = styled.tr``;

const Th = styled.th`
  padding: 4px 8px;
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
  padding: 4px 8px;
  margin-bottom: 8px;
  text-transform: capitalize;
  border-top: solid 1px #ccc;
`;

const Total = styled.p`
  font-size: 20px;
  margin-top: 16px;
`;

const Linkk = styled(Link)`
  border: solid 1px;
  margin-top: 32px;
  padding: 8px;
  cursor: pointer;
  &:hover {
    color: #666;
  }
`;

const Success = () => {
  const location = useLocation() as any;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = location.state?.stripeData;
  const cart = location.state?.cart;
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    !data && navigate(-1);
  }, []);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
            title: item.title,
            price: item.price,
            size: item.size,
            color: item.color,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
        dispatch(emptyCart());
      } catch (err) {
        console.error(err);
      }
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>{data ? "Congratulations!" : "Your order faced an error, you will be redirected."}</Title>
        {data && (
          <Subtitle>
            {orderId
              ? `Your order has been created successfully. Your order number is: ${orderId}`
              : "Your order is being prepared..."}
          </Subtitle>
        )}
        {orderId && (
          <>
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
                  {cart.products.map((p) => (
                    <Tr key={p._id}>
                      <Td>
                        <ItemLink to={"/product/" + p._id}>{p.title}</ItemLink>
                      </Td>
                      <Td>{p.size}</Td>
                      <Td>{p.color}</Td>
                      <Td>{p.quantity}</Td>
                      <Td>{p.price}€</Td>
                      <Td>{p.price * p.quantity}€</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableWrapper>
            <Total>TOTAL: {cart?.total}€</Total>
          </>
        )}
        <Linkk to="/">Go back home</Linkk>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Success;
