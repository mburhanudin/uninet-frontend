// components/templates/LoginTemplate.tsx
import React from "react";
import MainLayout from "./MainLayout";
import RegisterForm from "../organisms/RegisterForm";
import useRegistration from "../../hooks/useRegister";

const RegisterTemplate: React.FC = () => {
  const { register, registrationStatus, setRegistrationStatus } =
    useRegistration();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    register(email, password);
  };

  return (
    <MainLayout>
      <RegisterForm
        onSubmit={handleSubmit}
        registrationStatus={registrationStatus}
        setRegistrationStatus={setRegistrationStatus}
      />
    </MainLayout>
  );
};

export default RegisterTemplate;
