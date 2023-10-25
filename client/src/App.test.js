import {
  logRoles,
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

// TODO: change test to make it go to products to product
test('navigation is working from home to products to product', async () => {
  const user = userEvent.setup();

  render(FullApp);

  const productsNav = screen.getByRole('link', { name: /products/i });
  await user.click(productsNav);
  const productsTitle = screen.getByRole('heading', { name: /products/i });
  expect(productsTitle).toBeInTheDocument();

  const pumaTee = screen.getByRole('heading', { name: /puma tshirt/i });
  await user.click(pumaTee);

  // TODO: add single product fake call
  // const pumaTitle = screen.getByRole('heading', { name: /puma tshirt/i });
  // expect(pumaTitle).toBeInTheDocument();
});

test('returns products on succesful fetch', async () => {
  const user = userEvent.setup();

  render(FullApp);

  // ensure we are on homepage
  const shopNav = screen.getByRole('link', { name: /shop/i });
  await user.click(shopNav);
  const shopTitle = screen.getByRole('heading', { name: /autumn collection/i });

  expect(shopTitle).toBeInTheDocument();
  // ensure loading correctly appears and disappear
  await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));
  // screen.debug();
  const displayedProducts = await screen.findAllByTestId(/^product-/);
  expect(displayedProducts).toHaveLength(6);
  expect(screen.getByText('puma tshirt')).toBeInTheDocument();
  expect(screen.getByText('cougar tshirt')).toBeInTheDocument();

  const lg = document.createElement('div');
  lg.innerHTML = `<p>oui<p>`;
  logRoles(lg);
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

  // test filtering
  expect(
    screen.getByRole('option', {
      name: /select a color/i,
    }).selected
  ).toBeTruthy();
  await user.selectOptions(
    screen.getAllByRole('combobox')[0],
    screen.getByRole('option', { name: 'White' })
  );
  expect(
    screen.getByRole('option', {
      name: /white/i,
    }).selected
  ).toBeTruthy();
  let displayedProducts = await screen.findAllByTestId(/^product-/);
  expect(displayedProducts).toHaveLength(1);
  expect(screen.getByText('cougar tshirt')).toBeInTheDocument();

  // test reset
  await user.click(screen.getByRole('button', { name: /reset/i }));
  displayedProducts = await screen.findAllByTestId(/^product-/);
  expect(displayedProducts).toHaveLength(7);

  // test sorting
  await user.selectOptions(
    screen.getAllByRole('combobox')[2],
    screen.getByRole('option', { name: /asc/i })
  );
  expect(
    screen.getByRole('option', {
      name: /asc/i,
    }).selected
  ).toBeTruthy();
  displayedProducts = await screen.findAllByTestId(/^product-/);
  expect(displayedProducts).toHaveLength(7);
  console.log(displayedProducts[0]);
  expect(displayedProducts[0]).toHaveTextContent(/cap regular/i);
});

test('register is working', async () => {
  const user = userEvent.setup();

  render(FullApp);

  const registerNav = screen.getByRole('link', { name: /register/i });
  await user.click(registerNav);
  const registerTitle = screen.getByRole('heading', { name: /register/i });
  expect(registerTitle).toBeInTheDocument();

  // test register form logic
  const registerButton = screen.getByRole('button', { name: /register/i });
  expect(registerButton).toBeDisabled();

  const name = screen.getByLabelText('Name');
  await user.type(name, 'T');
  expect(screen.getByText('Name length < 3')).toBeInTheDocument();
  await user.type(name, 'Test');
  expect(screen.queryByText('Name length < 3')).not.toBeInTheDocument();

  const lastname = screen.getByLabelText('Last name');
  await user.type(lastname, 'T');
  expect(screen.getByText('Last name length < 3')).toBeInTheDocument();
  await user.type(lastname, 'Test');
  expect(screen.queryByText('Last name length < 3')).not.toBeInTheDocument();

  const username = screen.getByLabelText('Username');
  await user.type(username, 'T');
  expect(screen.getByText('Username length < 3')).toBeInTheDocument();
  await user.type(username, 'Test');
  expect(screen.queryByText('Username length < 3')).not.toBeInTheDocument();

  const email = screen.getByLabelText('Email');
  await user.type(email, 't@t');
  expect(screen.getByText('Must be an email')).toBeInTheDocument();
  await user.type(email, 't@t.t');
  expect(screen.queryByText('Must be an email')).not.toBeInTheDocument();

  const password = screen.getByLabelText('Password');
  await user.type(password, 't');
  expect(screen.getByText('Password length < 6')).toBeInTheDocument();
  await user.type(password, 'tttttt');
  expect(screen.queryByText('Password length < 6')).not.toBeInTheDocument();

  const password2 = screen.getByLabelText('Confirm password');
  await user.type(password2, 't');
  expect(screen.getByText('Passwords must match')).toBeInTheDocument();
  await user.type(password2, 'tttttt');
  expect(screen.queryByText('Passwords must match')).not.toBeInTheDocument();

  expect(registerButton).toBeEnabled();

  // TODO: register test
  // await user.click(registerButton);
  // console.log(mswServer);
  // await waitFor(() => expect(mswServer.handlers[0]).toHaveBeenCalledTimes(1));

  // const requestBody = JSON.parse(mswServer.handlers[1].mockedResponse.body);
  // expect(requestBody).toEqual({
  //   name: 'John Doe',
  //   email: 'john@example.com',
  //   password: 'password',
  // });
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
