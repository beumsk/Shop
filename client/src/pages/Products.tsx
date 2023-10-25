import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Filters from "../components/Filters";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import ProductList from "../components/ProductList";

const Container = styled.div``;

const Title = styled.h1`
  font-weight: 200;
  font-size: 40px;
  text-transform: capitalize;
  margin: 16px;
`;

const Products = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({ color: "", size: "" });
  const [sort, setSort] = useState("newest");

  const filterProps = { setFilters, filters, setSort, sort, cat };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat || "Products"}</Title>

      <Filters {...filterProps} />

      <ProductList cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Products;
