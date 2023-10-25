import { useEffect } from 'react';
import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cart from './pages/Cart';
import Success from './pages/Success';
import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';
import Products from './pages/Products';
import Search from './pages/Search';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import NotFound from './pages/NotFound';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const user = useSelector((state: any) => state.user.currentUser);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="products" element={<Products />}>
            <Route path=":cat" element={<Products />} />
          </Route>
          <Route path="search" element={<Search />}>
            <Route path=":cat" element={<Search />} />
          </Route>
          <Route path="product" element={<Product />}>
            <Route path=":id" element={<Product />} />
          </Route>
          <Route path="cart" element={<Cart />} />
          {/* TODO: prevent reaching success without payment */}
          <Route path="success" element={<Success />} />
          <Route path="login" element={user ? <Navigate to="/" replace /> : <Login />} />
          <Route path="register" element={user ? <Navigate to="/" replace /> : <Register />} />
          <Route path="profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="wishlist" element={user ? <Wishlist /> : <Navigate to="/login" />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
