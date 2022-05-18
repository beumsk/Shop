import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Product from './Product';
import axios from 'axios';
import { Subtitle } from '../pages/Cart.styled';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
`;

const Products = ({ cat, search, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const BASE_URL = 'http://localhost:5000/api/';

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}products${cat ? '?category=' + cat : ''}`
        );
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}products`);
        setProducts(
          [...res.data].filter(
            (p) =>
              p.title.toLowerCase().includes(search) ||
              p.desc.toLowerCase().includes(search) ||
              p.categories.indexOf(search) !== -1
          )
        );
        setFilteredProducts(
          [...res.data].filter(
            (p) =>
              p.title.toLowerCase().includes(search) ||
              p.desc.toLowerCase().includes(search) ||
              p.categories.indexOf(search) !== -1
          )
        );
      } catch (err) {
        console.error(err);
      }
    };
    if (search) {
      getProducts();
    }
  }, [search]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) => {
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
      {cat || search
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : [...filteredProducts]
            .slice(0, 8)
            .map((item) => <Product item={item} key={item._id} />)}
      {filteredProducts.length === 0 && (
        <Subtitle style={{ flexBasis: '100%', marginBottom: '20px' }}>
          There are no products matching your search and filters
        </Subtitle>
      )}
    </Container>
  );
};

export default Products;
