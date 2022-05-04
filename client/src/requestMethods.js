import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/';
// const TOKEN =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2M5NDdmNjVjYzYxZTUxMDQxYzdiYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTUwMjI4OSwiZXhwIjoxNjUxNzYxNDg5fQ.T24nwaPJeEgC2zzrDHAzbw_za5z6XDdP52Ao2wKG-38';

const user = JSON.parse(localStorage.getItem('persist:root'))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
