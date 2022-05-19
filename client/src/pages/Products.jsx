import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Filters from '../components/Filters';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import ProductList from '../components/ProductList';

const Container = styled.div``;

const Title = styled.h1`
  font-weight: 200;
  font-size: 40px;
  text-transform: capitalize;
  margin: 16px;
`;

const Products = () => {
  const location = useLocation();
  const cat = location.pathname.split('/')[2];
  const [filters, setFilters] = useState({ color: '', size: '' });
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    handleReset();
  }, [cat]);

  const handleFilters = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const handleReset = () => {
    setFilters({ color: '', size: '' });
    setSort('newest');
  };

  const filterProps = { handleFilters, filters, handleSort, sort, handleReset };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat || 'Products'}</Title>

      <Filters {...filterProps} />

      <ProductList cat={cat} filters={filters} sort={sort} count={cat && 100} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Products;
