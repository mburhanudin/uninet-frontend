import { useState } from 'react';
import { callApi } from '../utils/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 
import 'react-toastify/dist/ReactToastify.css';

interface LoginResponse {
  token: string;
}

const useLogin = () => {
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await callApi<LoginResponse>('https://reqres.in/api/login', 'POST', {
        email,
        password,
      });

      if (response !== null && response) {
        // Registrasi success
        toast.success('Login successful');
        sessionStorage.setItem('token', response.token);
        
        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {
          navigate('/blog');
        }
        
      } else {
        // Registrasi failed
        toast.error('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;
