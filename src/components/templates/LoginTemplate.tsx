// components/templates/LoginTemplate.tsx
import React from 'react';
import MainLayout from './MainLayout';
import LoginForm from '../organisms/LoginForm';
import useLogin from '../../hooks/useLogin';

const LoginTemplate: React.FC = () => {
  const { login } = useLogin()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    login(email, password);
  };

  return (
    <MainLayout>
      <LoginForm onSubmit={handleSubmit} />
    </MainLayout>
  );
};

export default LoginTemplate;
