import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { userRequest } from '../requestMethods';
import {
  updateProductDec,
  updateProductInc,
  removeProduct,
  emptyCart,
} from '../redux/cartRedux';
import Newsletter from '../components/Newsletter';
import {
  Container,
  Wrapper,
  Title,
  EmptyCart,
  Subtitle,
  TopButton,
  Top,
  Bottom,
  Info,
  Product,
  Image,
  ProductDetail,
  Details,
  ProductName,
  ProductColor,
  ProductSize,
  PriceDetail,
  ProductAmount,
  ProductAmountContainer,
  ProductPrice,
  Summary,
  SummaryItem,
  SummaryTitle,
  SummaryItemPrice,
  SummaryItemText,
  Button,
  ButtonClear,
} from './Cart.styled';
import Modal from '../components/Modal';

const KEY = process.env.REACT_APP_STRIPE;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user?.currentUser);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post('/checkout/payment', {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        navigate('/success', {
          state: { stripeData: res.data, cart: cart },
        });
      } catch (err) {
        console.error(err);
      }
    };
    stripeToken && cart.total > 0 && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  const handleQuantity = (type, info) => {
    if (type === 'dec') {
      if (info.qtt === 1) {
        dispatch(removeProduct({ index: info.index }));
      } else {
        dispatch(
          updateProductDec({
            index: info.index,
          })
        );
      }
    } else {
      dispatch(
        updateProductInc({
          index: info.index,
        })
      );
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your cart ({cart.quantity})</Title>
        {!cart.quantity > 0 ? (
          <EmptyCart>
            <Subtitle>Your cart is currently empty...</Subtitle>
            <TopButton to="/products">Find great items for your cart</TopButton>
            {user && user.wishlist.length > 0 && (
              <TopButton to="/wishlist">
                Your Wishlist ({user.wishlist.length})
              </TopButton>
            )}
          </EmptyCart>
        ) : (
          <>
            <Top>
              <TopButton to="/products">Continue shopping</TopButton>
              {user && user.wishlist.length > 0 && (
                <TopButton to="/wishlist">
                  Your Wishlist ({user.wishlist.length})
                </TopButton>
              )}
            </Top>

            <Bottom>
              <Info>
                {cart.products.map((p, index) => (
                  <Product key={p._id}>
                    <Link to={'/product/' + p._id}>
                      <Image src={p.img} />
                    </Link>
                    <ProductDetail>
                      <Details>
                        <ProductName>
                          <Link to={'/product/' + p._id}>{p.title}</Link>
                        </ProductName>
                        <ProductColor color={p.color} title={p.color} />
                        <ProductSize>
                          <b>Size:</b> {p.size?.toUpperCase()}
                        </ProductSize>
                      </Details>
                      <PriceDetail>
                        <ProductAmountContainer>
                          {p.quantity === 1 ? (
                            <Modal
                              onClose={() =>
                                handleQuantity('dec', {
                                  index,
                                  qtt: p.quantity,
                                })
                              }
                              color="#e53e3e"
                              title="Are you sure to remove this item?">
                              <FaMinus style={{ color: '#e53e3e' }} />
                            </Modal>
                          ) : (
                            <FaMinus
                              onClick={() =>
                                handleQuantity('dec', {
                                  index,
                                  qtt: p.quantity,
                                })
                              }
                            />
                          )}

                          <ProductAmount>{p.quantity}</ProductAmount>

                          <FaPlus
                            onClick={() =>
                              handleQuantity('inc', {
                                index,
                                qtt: p.quantity,
                              })
                            }
                          />
                        </ProductAmountContainer>
                        <ProductPrice>{p.price * p.quantity} €</ProductPrice>
                      </PriceDetail>
                    </ProductDetail>
                  </Product>
                ))}
              </Info>

              <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>{cart.total} €</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>5 €</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>-5 €</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>{cart.total} €</SummaryItemPrice>
                </SummaryItem>
                {/* {stripeToken ? (
                <span>Processing...</span>
              ) : ( */}
                <StripeCheckout
                  name="React shop"
                  // image=""
                  billingAddress
                  shippingAddress
                  description={`Your total is ${cart.total} €`}
                  amount={cart.total * 100}
                  currency="EUR"
                  token={onToken}
                  disabled={cart.total === 0}
                  stripeKey={KEY}>
                  <Button>CHECKOUT NOW</Button>
                </StripeCheckout>
                {/* )} */}
              </Summary>
            </Bottom>

            <Modal
              onClose={() => dispatch(emptyCart())}
              color="#e53e3e"
              title="Are you sure to clear your cart?">
              <ButtonClear>Clear your cart</ButtonClear>
            </Modal>
          </>
        )}
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Cart;
