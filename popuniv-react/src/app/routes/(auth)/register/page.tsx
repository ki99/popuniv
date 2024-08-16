import AuthLayout from '../layout'

import RegisterForm from '@/components/features/auth/register-form'

export default function RegisterPage() {
  return (
    <AuthLayout title="회원가입">
      <RegisterForm />
    </AuthLayout>
  )
}
