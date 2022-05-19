import styled from 'styled-components';
import { mq } from '../responsive';

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

const Filters = ({ handleFilters, filters, handleSort, sort, handleReset }) => {
  return (
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
        <Select onChange={handleSort} value={sort}>
          <Option value="newest">Newest</Option>
          <Option value="asc">Price (asc)</Option>
          <Option value="desc">Price (desc)</Option>
        </Select>
      </Filter>

      <Reset onClick={handleReset}>Reset</Reset>
    </FilterContainer>
  );
};

export default Filters;
