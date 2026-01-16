import React from 'react';
import ParticleBackground from '../../components/auth/ParticleBackground/ParticleBackground';
import LoginForm from '../../components/auth/LoginForm/LoginForm';
import './Login.css';

const Login = () => {
  return (
    <div className="login-page">
      <ParticleBackground />
      <LoginForm />
    </div>
  );
};

export default Login;