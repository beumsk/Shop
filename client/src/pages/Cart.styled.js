import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mq } from '../responsive';

export const Container = styled.div``;

export const Wrapper = styled.div`
  padding: 16px;
  ${mq({ padding: '32px' }, 900)}
`;

export const Title = styled.h1`
  font-weight: 200;
  font-size: 40px;
  text-transform: capitalize;
  text-align: center;
`;

export const Subtitle = styled.p`
  font-weight: 200;
  font-size: 24px;
  text-align: center;
`;

export const EmptyCart = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
`;

export const TopButton = styled(Link)`
  padding: 8px;
  cursor: pointer;
  border: 2px solid;
  &:hover {
    background: #f8f4f4;
  }
`;

export const Bottom = styled.div`
  ${mq({ display: 'flex', justifyContent: 'space-between' }, 900)}
`;

export const Info = styled.div`
  flex: 3;
`;

export const Product = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
  &:not(:last-of-type) {
    border-bottom: 1px solid #e2e8f0;
  }
`;

export const ProductDetail = styled.div`
  flex: 2;
  ${mq({ display: 'flex', justifyContent: 'space-between' }, 600)}
`;

export const Image = styled.img`
  width: 160px;
  object-fit: contain;
  ${mq({ width: '200px' }, 600)}
`;

export const Details = styled.div`
  padding: 20px;
`;

export const ProductName = styled.p`
  font-size: 20px;
  text-transform: capitalize;
  margin-bottom: 16px;
  a:hover {
    text-decoration: underline;
    color: #319795;
  }
`;

export const ProductId = styled.p`
  word-break: break-all;
  margin-bottom: 16px;
`;

export const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  margin-bottom: 16px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 1px solid #e2e8f0;
`;

export const ProductSize = styled.span``;

export const PriceDetail = styled.div`
  padding: 20px;
`;

export const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  svg {
    cursor: pointer;
  }
`;

export const ProductAmount = styled.div`
  font-size: 24px;
  margin: 0 8px;
`;

export const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

export const Summary = styled.div`
  flex: 1;
  border: 1px solid #e2e8f0;
  padding: 20px;
`;

export const SummaryTitle = styled.h1`
  font-weight: 200;
`;

export const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`;

export const SummaryItemText = styled.span``;

export const SummaryItemPrice = styled.span``;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  border: none;
  color: #fff;
  cursor: pointer;
  &:hover {
    background: #333;
  }
`;

export const ButtonClear = styled.button`
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
