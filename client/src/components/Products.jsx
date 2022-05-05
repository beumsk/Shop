import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Product from './Product';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
`;

const Button = styled.span`
  margin: 20px auto;
  padding: 8px;
  cursor: pointer;
  border: 2px solid;
  background: transparent;
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
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}products`);
        setProducts(
          [...res.data].filter((p) => p.title.toLowerCase().includes(search))
        );
        setFilteredProducts(
          [...res.data].filter((p) => p.title.toLowerCase().includes(search))
        );
      } catch (err) {}
    };
    if (search) {
      getProducts();
    }
  }, [search]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
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
        <Button>
          <Link to="/products">Take me to products</Link>
        </Button>
      )}
    </Container>
  );
};

export default Products;
