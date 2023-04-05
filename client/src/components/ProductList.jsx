import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Product from './Product';
import axios from 'axios';
import { Subtitle } from '../pages/Cart.styled';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../requestMethods';

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const Loading = styled.div`
  width: 40px;
  height: 40px;
  margin: auto;
  border: solid 4px #ddd;
  border-top-color: #999;
  border-radius: 9999px;
  @keyframes loading {
    100% {
      transform: rotate(360deg);
    }
  }
  animation: loading infinite 1s ease-in-out;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
`;

const ButtonLink = styled(Link)`
  margin: 20px auto;
  display: inline-block;
  border: solid 1px;
  padding: 8px;
  &:hover {
    color: #666;
  }
`;

const ProductList = ({ cat, search, filters, sort, except, count }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await axios.get(
          `${BASE_URL}products${cat ? '?category=' + cat : ''}`
        );
        if (!!search) {
          const filteredData = [...res.data].filter(
            (p) =>
              p.title.toLowerCase().includes(search) ||
              p.desc.toLowerCase().includes(search) ||
              p.categories.indexOf(search) !== -1
          );
          setProducts(filteredData);
          setFilteredProducts(filteredData);
        } else {
          setProducts(res.data);
          setFilteredProducts(res.data);
        }
      } catch (err) {
        // console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [cat, search]);

  useEffect(() => {
    setFilteredProducts(
      products?.filter((item) =>
        Object.entries(filters)?.every(([key, value]) => {
          return value !== '' ? item[key].includes(value) : item[key];
        })
      )
    );
  }, [filters]);

  useEffect(() => {
    if (sort === 'newest') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      );
    } else if (sort === 'asc') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === 'desc') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      <ProductContainer>
        {[...filteredProducts]
          .filter((i) => i._id !== except)
          .slice(0, count || 1000)
          .map((item) => (
            <Product item={item} key={item._id} />
          ))}

        {!loading && filteredProducts.length === 0 && (
          <Subtitle style={{ flexBasis: '100%', marginBottom: '20px' }}>
            There are no products matching your search and filters
          </Subtitle>
        )}

        {loading && (
          <Loading role="progressbar" style={{ marginBottom: '20px' }} />
        )}
      </ProductContainer>
      {filteredProducts.length > 0 && (
        <ButtonLink to="/products">Check out all products</ButtonLink>
      )}
    </Container>
  );
};

export default ProductList;
