import isServer from '@/utils/isServer';
import { getCookie as getCookieFromServer } from '@/app/actions';

const getCookieFromClient = (name: string) => {
  const cookies = document.cookie;
  const entries = cookies.split('; ').map((c) => c.split('='));
  const value = entries.find((entry) => entry[0] === name)?.[1] || '';

  return value;
};

const getCookie = (name: string) => {
  return isServer() ? getCookieFromServer(name) : getCookieFromClient(name);
};

export default getCookie;
