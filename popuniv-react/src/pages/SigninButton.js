import React from 'react';

export default function SigninButton() {
  const handleSigninClick = () => {
    // 회원가입 버튼을 클릭했을 때 수행할 동작을 여기에 작성합니다.
    console.log('로그인 버튼 클릭');
  };

  return (
    <button onClick={handleSigninClick}>로그인</button>
  );
}