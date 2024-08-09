import ky from '@toss/ky';
import getCookie from './cookie';

const url = process.env.NEXT_PUBLIC_API_URL;

export const publicApi = ky.create({
  prefixUrl: url,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const api = publicApi.extend({
  hooks: {
    beforeRequest: [
      (request: any) => {
        const token = getCookie('token');
        request.headers.set('Authorization', `Bearer ${token}`);
      },
    ],
  },
});
