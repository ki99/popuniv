import Image from 'next/image';
import Background from 'public/assets/images/watercolor_bg_1.jpeg';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Image src={Background} alt='배경' fill sizes='100vw' className='z-[-1]' />
      <div className='z-10'>{children}</div>
    </div>
  );
}
