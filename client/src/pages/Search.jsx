import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import Products from '../components/Products';
import { mq } from '../responsive';

const Container = styled.div``;

const Title = styled.h1`
  font-weight: 200;
  font-size: 40px;
  text-transform: capitalize;
  margin: 16px;
`;

const FilterContainer = styled.div`
  ${mq({ display: 'flex', justifyContent: 'space-between' }, 600)}
`;

const Filter = styled.div`
  margin: 16px;
`;

const FilterText = styled.span`
  font-size: 16px;
  margin-right: 8px;
  ${mq({ marginRight: '16px' }, 600)}
`;

const Select = styled.select`
  padding: 8px;
  margin-right: 16px;
  cursor: pointer;
`;

const Option = styled.option``;

const Search = () => {
  const location = useLocation();
  const search = location.pathname.split('/')[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('newest');

  const handleFilters = (e) => {
    const value = e.target.value;
    if (value) {
      setFilters({
        ...filters,
        [e.target.name]: value,
      });
    } else {
      const { [e.target.name]: remove, ...cleanedFilters } = filters;
      setFilters(cleanedFilters);
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{search || 'Search'}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter products</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option value="">Select a color</Option>
            <Option value="white">White</Option>
            <Option value="black">Black</Option>
            <Option value="red">Red</Option>
            <Option value="blue">Blue</Option>
            <Option value="yellow">Yellow</Option>
            <Option value="green">Green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option value="">Select a size</Option>
            <Option value="xs">XS</Option>
            <Option value="s">S</Option>
            <Option value="m">M</Option>
            <Option value="l">L</Option>
            <Option value="xl">XL</Option>
          </Select>
        </Filter>

        <Filter>
          <FilterText>Sort products</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products search={search} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Search;
