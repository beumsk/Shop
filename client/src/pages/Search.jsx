import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import ProductList from '../components/ProductList';
import { mq } from '../responsive';

const Container = styled.div``;

const Title = styled.h1`
  font-weight: 200;
  font-size: 40px;
  text-transform: capitalize;
  margin: 16px;
`;

const FilterContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: 20px;
  justify-content: space-between;
  ${mq({ justifyContent: 'unset' }, 600)}
`;

const Filter = styled.div``;

const FilterText = styled.legend`
  margin-bottom: 4px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid black;
  border-radius: 0;
  cursor: pointer;
  &:hover {
    color: #666;
    border-color: #666;
  }
`;

const Option = styled.option``;

const Reset = styled.button`
  border: solid 1px;
  background: transparent;
  height: 36px;
  padding: 0 16px;
  cursor: pointer;
  &:hover {
    color: #666;
  }
`;

const Search = () => {
  const location = useLocation();
  const search = location.pathname.split('/')[2];
  const [filters, setFilters] = useState({ color: '', size: '' });
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    handleReset();
  }, [search]);

  const handleFilters = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setFilters({ color: '', size: '' });
    setSort('newest');
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{search || 'Search'}</Title>

      <FilterContainer>
        <Filter>
          <FilterText>Colors</FilterText>
          <Select name="color" onChange={handleFilters} value={filters.color}>
            <Option value="">Select a color</Option>
            <Option value="white">White</Option>
            <Option value="black">Black</Option>
            <Option value="red">Red</Option>
            <Option value="blue">Blue</Option>
            <Option value="yellow">Yellow</Option>
            <Option value="green">Green</Option>
          </Select>
        </Filter>

        <Filter>
          <FilterText>Sizes</FilterText>
          <Select name="size" onChange={handleFilters} value={filters.size}>
            <Option value="">Select a size</Option>
            <Option value="xs">XS</Option>
            <Option value="s">S</Option>
            <Option value="m">M</Option>
            <Option value="l">L</Option>
            <Option value="xl">XL</Option>
          </Select>
        </Filter>

        <Filter>
          <FilterText>Sorting</FilterText>
          <Select onChange={(e) => setSort(e.target.value)} value={sort}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>

        <Reset onClick={handleReset}>Reset</Reset>
      </FilterContainer>

      <ProductList search={search} filters={filters} sort={sort} count={10} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Search;
