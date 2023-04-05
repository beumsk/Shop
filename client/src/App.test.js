import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { mswServer } from './mocks/server';
import App from './App';
import { rest } from 'msw';
import { BASE_URL } from './requestMethods';

const FullApp = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

// test('renders SHOP link with link to homepage', () => {
// render(FullApp);
// const shopTitle = screen.getByRole('link', { name: /SHOP/ });
// expect(shopTitle).toBeInTheDocument();
// expect(shopTitle).toHaveAttribute('href', '/');
// });

// add testing for server
test('returns products on succesful fetch', async () => {
  render(FullApp);
  // ensure loading correctly appearsa and disappear
  await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));
  // screen.debug();
  const displayedProducts = await screen.findAllByTestId(/^product-/);
  expect(displayedProducts).toHaveLength(6);
  expect(screen.getByText('puma tshirt')).toBeInTheDocument();
  expect(screen.getByText('cougar tshirt')).toBeInTheDocument();
});

test('no matching products', async () => {
  render(FullApp);
  // faking failed server connexion
  mswServer.resetHandlers(
    rest.get(`${BASE_URL}products`, (req, res, ctx) => res(ctx.status(500)))
  );
  await waitFor(async () => {
    const txt = await screen.findByText(
      /there are no products matching your search and filters/i
    );
    expect(txt).toBeInTheDocument();
  });
});

test('navigation is working from home to cart to home', async () => {
  const user = userEvent.setup();

  render(FullApp);

  const cartNav = screen.getByRole('link', { name: /cart/i });
  await user.click(cartNav);
  const cartTitle = screen.getByRole('heading', { name: /your cart/i });
  expect(cartTitle).toBeInTheDocument();

  const shopNav = screen.getByRole('link', { name: /shop/i });
  await user.click(shopNav);
  const shopTitle = screen.getByRole('heading', { name: /autumn collection/i });
  expect(shopTitle).toBeInTheDocument();

  // TODO: 404 !navigate to error page
  // window.location.href = '/404';
  // console.log(window.location.href);
  // const nothingTitle = screen.getByRole('heading', {
  //   name: /nothing to show here/i,
  // });
  // expect(nothingTitle).toBeInTheDocument();
});

test('search is working', async () => {
  const user = userEvent.setup();

  render(FullApp);

  const searchInput = screen.getAllByRole('textbox')[0];
  await user.type(searchInput, 'tee');
  await user.keyboard('{enter}');
  const searchTitle = screen.getByRole('heading', { name: /tee/i });
  expect(searchTitle).toBeInTheDocument();

  const displayedProducts = await screen.findAllByTestId(/^product-/);
  expect(displayedProducts).toHaveLength(3);
  expect(screen.getByText('puma tshirt')).toBeInTheDocument();
  expect(screen.getByText('cougar tshirt')).toBeInTheDocument();
});

test('filtering and sorting are working', async () => {
  const user = userEvent.setup();

  render(FullApp);

  const productNav = screen.getByRole('link', { name: /products/i });
  await user.click(productNav);
  const productTitle = screen.getByRole('heading', { name: /products/i });
  expect(productTitle).toBeInTheDocument();

  // TODO: test filtering

  // TODO: test sorting
});

test('register is working', async () => {
  const user = userEvent.setup();

  render(FullApp);

  const registerNav = screen.getByRole('link', { name: /register/i });
  await user.click(registerNav);
  const registerTitle = screen.getByRole('heading', { name: /register/i });
  expect(registerTitle).toBeInTheDocument();

  // TODO: register test
});

test('login and logout are working', async () => {
  const user = userEvent.setup();

  render(FullApp);

  const loginNav = screen.getByRole('link', { name: /login/i });
  await user.click(loginNav);
  const loginTitle = screen.getByRole('heading', { name: /login/i });
  expect(loginTitle).toBeInTheDocument();

  // TODO: login/logout test
});

test('login, add favorite, reach profile and check favorites, delete favorite', async () => {
  // TODO: profile + favorites (needs login)
});

test('whole buying process is working: select product, add to cart, select size and color, go to cart, checkout, pay', async () => {
  // TODO: buy process
});
