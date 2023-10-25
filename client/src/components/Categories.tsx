import styled from 'styled-components';
import { categories } from '../data';
import CategoryItem from './CategoryItem';
import { mq } from '../responsive';

const Container = styled.div`
  padding: 20px;
  display: flex;
  gap: 16px;
  flex-direction: column;
  ${mq({ flexDirection: 'row' }, 600)};
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
