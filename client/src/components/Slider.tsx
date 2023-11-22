import { useState } from "react";
import styled from "styled-components";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";
import { sliderItems } from "../data";
import { mq } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background: #ddd;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(p) => (p.direction === "left" ? "10px" : "unset")};
  right: ${(p) => (p.direction === "right" ? "10px" : "unset")};
  z-index: 2;
  opacity: 0.6;
  transition: all 0.2s;
  &:hover {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1s ease;
  transform: translateX(${(p) => p.slideIndex * -100}vw);
`;

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: ${(p) => p.bg};
  ${mq({ display: "flex", flexDirection: "row" }, 600)}
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  height: 100%;
`;

const Image = styled.img`
  width: 60%;
  margin: auto;
  ${mq({ width: "100%" }, 600)}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 20px;
  ${mq({ padding: "50px" }, 600)}
`;

const Title = styled.h1`
  font-size: 40px;
  ${mq({ fontSize: "70px" }, 900)}
`;

const Desc = styled.p`
  margin: 20px 0;
  font-size: 20px;
  letter-spacing: 3px;
  ${mq({ margin: "50px 0" }, 600)}
`;

const Button = styled(Link)`
  padding: 10px;
  font-size: 20px;
  background: transparent;
  border: solid 2px black;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    color: white;
  }
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
    } else {
      setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <FaCaretLeft />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImageContainer>
              <Image src={item.img} />
            </ImageContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button to={item.link}>Shop now</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <FaCaretRight />
      </Arrow>
    </Container>
  );
};

export default Slider;
