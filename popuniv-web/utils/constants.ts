export const TOKEN = (typeof window !== 'undefined' && localStorage.getItem('token')) || '';
export const USER = (typeof window !== 'undefined' && localStorage.getItem('user')) || null;
