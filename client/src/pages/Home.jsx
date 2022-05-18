import Announcement from '../components/Announcement';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import ProductList from '../components/ProductList';
import Slider from '../components/Slider';

const Home = () => {
  return (
    <>
      <Navbar />
      <Announcement />
      <Slider />
      <Categories />
      <ProductList count={6} />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
