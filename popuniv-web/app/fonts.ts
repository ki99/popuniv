import { Noto_Sans, Noto_Sans_KR, DynaPuff } from 'next/font/google';

export const noto_sans = Noto_Sans({
  variable: '--noto-sans',
  display: 'fallback',
  fallback: ['system-ui'],
  subsets: ['latin'],
});

export const noto_sans_kr = Noto_Sans_KR({
  variable: '--noto-sans_KR',
  display: 'fallback',
  fallback: ['system-ui'],
  preload: false,
});

export const dynaPuff = DynaPuff({
  variable: '--dynapuff',
  display: 'fallback',
  fallback: ['system-ui'],
  subsets: ['latin'],
});
