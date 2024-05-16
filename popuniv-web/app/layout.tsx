import type { Metadata } from 'next';

import classNames from 'classnames';

import Navigation from '../components/common/navigation';
import { getToken } from './actions';
import { noto_sans, noto_sans_kr } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'POPUNIV',
  description: 'Kigoon World의 첫 번째 프로젝트',
  icons: {
    icon: 'icon.ico',
    apple: 'icon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={classNames(noto_sans.className, noto_sans_kr.className, 'overflow-y-hidden')}
      >
        <Navigation isAuth={!!getToken()} />
        <div className="px-32 py-16">{children}</div>
      </body>
    </html>
  );
}
