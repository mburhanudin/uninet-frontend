import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Blog from './pages/Blog';
import Denom from './pages/Denom';

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  return element;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        {/* Gunakan ProtectedRoute untuk /blog */}
        <Route
          path="/blog"
          element={<ProtectedRoute element={<Blog />} />}
        />
        <Route
          path="/denom"
          element={<ProtectedRoute element={<Denom />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
