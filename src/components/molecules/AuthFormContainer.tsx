// components/molecules/AuthFormContainer.tsx
import React from 'react';
import Box from '@mui/material/Box';

interface AuthFormContainerProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

const AuthFormContainer: React.FC<AuthFormContainerProps> = ({ onSubmit, children }) => (
  <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
    {children}
  </Box>
);

export default AuthFormContainer;
