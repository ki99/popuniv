import AuthLayout from '../layout'

import LoginForm from '@/components/features/auth/login-form'

export default function LoginPage() {
  return (
    <AuthLayout title="로그인">
      <LoginForm />
    </AuthLayout>
  )
}
