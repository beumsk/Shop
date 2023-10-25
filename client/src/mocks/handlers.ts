import { rest } from 'msw';
import { BASE_URL } from '../requestMethods';

const mockProducts = [
  {
    _id: '623c9b9b5c93dcfe54794b18',
    title: 'puma tshirt',
    desc: 'ejzhrgzekhr',
    img: 'https://www.hummel.net/dw/image/v2/BDWL_PRD/on/demandware.static/-/Sites-hummel-master-catalog/default/dw0577cc3f/images/packshot/203518-7045_1.png?sw=514&sh=685&sm=fit&q=80',
    categories: ['tee', 'man'],
    size: ['l', 'm'],
    color: ['blue'],
    price: 20,
    createdAt: '2022-03-24T16:26:03.624Z',
    updatedAt: '2022-03-24T16:26:03.624Z',
    __v: 0,
  },
  {
    _id: '623c9d717ab9fb5f56899665',
    title: 'cougar tshirt',
    desc: 'ejzhrgzekhr',
    img: 'http://pngimg.com/uploads/tshirt/tshirt_PNG5443.png',
    categories: ['tee', 'woman'],
    size: ['m', 's'],
    color: ['red', 'white'],
    price: 30,
    createdAt: '2022-03-23T16:33:53.297Z',
    updatedAt: '2022-03-23T16:33:53.297Z',
    __v: 0,
  },
  {
    _id: '623d9c965ca3cc66fc4ffaef',
    title: 'tiger tshirt',
    desc: 'ertysertd',
    img: 'https://www.sportyfied.com/thumbs/regular/8000_darkgreen_700x700.png',
    categories: ['tee', 'man'],
    size: ['s'],
    color: ['green', 'black'],
    price: 40,
    createdAt: '2022-03-25T16:33:53.297Z',
    updatedAt: '2022-03-25T16:33:53.297Z',
    __v: 0,
  },
  {
    _id: '6246f5fdab41580ca1c94d9c',
    title: 'Jeans pants',
    desc: 'Blue jeans pants',
    img: 'https://static.wixstatic.com/media/2cd43b_c255e067674645668d8f505e6b632bc4~mv2.png/v1/fill/w_320,h_320,q_90/2cd43b_c255e067674645668d8f505e6b632bc4~mv2.png',
    categories: ['pants', 'man'],
    size: ['s'],
    color: ['blue'],
    price: 60,
    createdAt: '2022-03-29T16:33:53.297Z',
    updatedAt: '2022-03-29T16:33:53.297Z',
    __v: 0,
  },
  {
    _id: '6246f840ab41580ca1c94d9d',
    title: 'Chino pants',
    desc: 'Grey chino pants',
    img: 'https://cdn.shopify.com/s/files/1/0205/8124/products/2019-01-04_TABS_-_Long_Pants0023_2000x.png?v=1571265412',
    categories: ['pants', 'man'],
    size: ['m', 'l'],
    color: ['grey'],
    price: 65,
    createdAt: '2022-03-28T16:33:53.297Z',
    updatedAt: '2022-03-28T16:33:53.297Z',
    __v: 0,
  },
  {
    _id: '6246f8baab41580ca1c94d9e',
    title: 'Cargo pants',
    desc: 'Khaki cargo pants',
    img: 'https://www.pngall.com/wp-content/uploads/2016/09/Cargo-Pant-PNG.png',
    categories: ['pants', 'man'],
    size: ['s', 'l'],
    color: ['khaki'],
    price: 55,
    createdAt: '2022-03-30T16:33:53.297Z',
    updatedAt: '2022-03-30T16:33:53.297Z',
    __v: 0,
  },
  {
    _id: '6246fbe4ab41580ca1c94d9f',
    title: 'Cap regular',
    desc: 'Yellow cap regular',
    img: 'https://i.pinimg.com/originals/ea/71/91/ea719114bcc2fde39251c81ac25941d7.png',
    categories: ['cap', 'man'],
    size: ['m'],
    color: ['yellow'],
    price: 15,
    createdAt: '2022-03-31T16:33:53.297Z',
    updatedAt: '2022-03-31T16:33:53.297Z',
    __v: 0,
  },
];

const getProductsPath = `${BASE_URL}products`;

const productsHandler = rest.get(getProductsPath, async (req, res, ctx) =>
  res(ctx.json(mockProducts))
);

const registerHandler = rest.post(
  `${BASE_URL}/auth/register`,
  async (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        message: 'User created successfully!',
      })
    )
);

export const productsHandlerException = rest.get(
  getProductsPath,
  async (req, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Deliberately broken request' }))
);

export const handlers = [productsHandler, registerHandler];
