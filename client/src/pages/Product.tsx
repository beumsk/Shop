import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaMinus, FaPlus } from "react-icons/fa";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import ProductList from "../components/ProductList";
import { mq } from "../responsive";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { updateWishlist } from "../redux/userRedux";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  position: relative;
  ${mq({ display: "flex", padding: "50px 20px" }, 600)}
`;

const Previous = styled.p`
  position: absolute;
  top: 16px;
  padding: 4px 8px;
  cursor: pointer;
  transition: transform 0.5s ease;
  &:hover {
    transform: translateX(-4px);
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  max-height: 60vh;
  object-fit: contain;
  margin-bottom: 16px;
  ${mq({ margin: "0" }, 600)}
`;

const HeartContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  transition: color 0.2s;
  cursor: pointer;
  &:hover {
    color: red;
  }
  svg {
    vertical-align: middle;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  ${mq({ padding: "0 0 0 40px" }, 600)}
`;

const Title = styled.h1`
  font-weight: 200;
  font-size: 40px;
  text-transform: capitalize;
  margin-bottom: 16px;
`;

const Desc = styled.p`
  margin-bottom: 16px;
`;

const Categories = styled.div`
  margin-bottom: 16px;
`;

const Category = styled(Link)`
  display: inline-block;
  font-size: 12px;
  border: solid 1px;
  padding: 4px 8px;
  margin-right: 8px;
  &:hover {
    color: #666;
  }
`;

const Price = styled.p`
  font-weight: 200;
  font-size: 28px;
  padding-bottom: 16px;
  border-bottom: solid 1px #e2e8f0;
`;

const FilterContainer = styled.div`
  width: 100%;
  margin-top: 16px;
  ${mq({ display: "flex", justifyContent: "space-between" }, 900)}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
  margin-right: 8px;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${(p) => p.color};
  color: ${(p) => p.color};
  margin-right: 8px;
  cursor: pointer;
  border: ${(p) => (p.selected ? "solid 1px #319795" : "solid 1px #A0AEC0")};
  &:hover {
    opacity: ${(p) => (p.selected ? 1 : 0.6)};
  }
`;

const FilterSize = styled.select`
  padding: 4px;
  cursor: pointer;
  &:hover {
    color: #666;
  }
`;

const FilterSizeOption = styled.option``;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  svg {
    cursor: pointer;
    &:first-of-type {
      opacity: ${(p) => (p.show ? 1 : 0)};
      cursor: ${(p) => (p.show ? "pointer" : "default")};
    }
  }
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 8px;
`;

const Help = styled.p`
  margin: 16px 0;
  padding: 8px;
  background: #e53e3e;
  max-width: 300px;
  color: white;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin-bottom: 16px;
  width: 100%;
  max-width: 300px;
  border: 2px solid #319795;
  background: white;
  cursor: pointer;
  &.animated {
    animation: progress 1s 1;
  }
  &:hover {
    background: #f8f4f4;
  }
  @keyframes progress {
    100% {
      box-shadow: inset 300px 0 #319795;
      color: whitesmoke;
    }
  }
`;

const Title2 = styled.p`
  font-size: 20px;
  padding: 0 20px;
`;

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState<productType>();
  const [quantity, setQuantity] = useState<number>(1);
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [help, setHelp] = useState<string>("");
  const [anim, setAnim] = useState<boolean>(false);
  const [CTA, setCTA] = useState<boolean>(false);
  const user = useSelector((state: any) => state.user?.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
        setColor(res.data.color[0]);
        setSize(res.data.size[0]);
      } catch (err) {
        console.error(err);
      }
    };
    getProduct();
  }, [id]);

  const handleColor = (c) => {
    setColor(c);
    setHelp(size ? "" : "Size must be selected");
  };

  const handleSize = (e) => {
    setSize(e.target.value);
    setHelp(color ? "" : "Color must be selected");
  };

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleCart = () => {
    if (color && size) {
      dispatch(addProduct({ ...product, quantity, color, size }));
      setHelp("");
      setAnim(true);
      setCTA(true);
    } else {
      setHelp("Color and size must be selected");
    }
  };

  const handleHeart = (prod) => {
    dispatch(updateWishlist(prod));
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Previous onClick={() => navigate(-1)}>‹ Go back</Previous>
        <ImageContainer>
          <Image src={product?.img} alt={product?.title} />
          {user && (
            <HeartContainer onClick={() => handleHeart(product)}>
              <FaHeart
                style={{
                  color: user?.wishlist.some((w) => w._id === product?._id) ? "red" : undefined,
                }}
              />
            </HeartContainer>
          )}
        </ImageContainer>
        <InfoContainer>
          <Title>{product?.title}</Title>
          <Desc>{product?.desc}</Desc>
          <Categories>
            {product?.categories?.map((c) => (
              <Category key={c} to={"/products/" + c}>
                {c}
              </Category>
            ))}
          </Categories>
          <Price>{product?.price} €</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product?.color?.map((c) => (
                <FilterColor key={c} title={c} color={c} onClick={() => handleColor(c)} selected={color === c} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={handleSize} value={size}>
                <FilterSizeOption value="">Select a size</FilterSizeOption>
                {product?.size?.map((s) => (
                  <FilterSizeOption key={s} value={s}>
                    {s.toUpperCase()}
                  </FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>

          <AmountContainer show={quantity > 1 ? true : null}>
            <FilterTitle>Quantity</FilterTitle>
            <FaMinus onClick={() => handleQuantity("dec")} />
            <Amount>{quantity}</Amount>
            <FaPlus onClick={() => handleQuantity("inc")} />
          </AmountContainer>
          {help && <Help>{help}</Help>}
          <Button onClick={handleCart} onAnimationEnd={() => setAnim(false)} className={anim ? "animated" : ""}>
            Add to cart
          </Button>
          {CTA && (
            <>
              <Button onClick={() => navigate("/products")}>Find other products</Button>
              <Button onClick={() => navigate("/cart")}>Go to cart</Button>
            </>
          )}
        </InfoContainer>
        {/* TODO: add random products */}
      </Wrapper>
      <Title2>Suggested products</Title2>
      <ProductList except={id} count={3} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
