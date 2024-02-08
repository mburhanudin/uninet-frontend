import { useState } from 'react';
import { callApi } from '../utils/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 
import 'react-toastify/dist/ReactToastify.css';

const useRegistration = () => {
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<boolean | null>(null);

  const register = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await callApi<boolean>('https://reqres.in/api/register', 'POST', {
        email,
        password,
      });

      setRegistrationStatus(response);

      if (response !== null && response) {
        // Registrasi success
        toast.success('Registration successful');
        setTimeout(() =>{
            navigate('/login');
        },2000)
      } else {
        // Registrasi failed
        toast.error('Registration failed');
      }
    } finally {
        setRegistrationStatus(null);
        setLoading(false);
    }
  };

  return { register, loading, registrationStatus, setRegistrationStatus };
};

export default useRegistration;
