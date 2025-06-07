import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function AuthPage() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginSuccess = () => {
    // After successful login, JWT token is set in localStorage by LoginForm.
    // Navigate to dashboard
    navigate("/dashboard");
  };

  const handleRegisterSuccess = () => {
    // After successful registration, show login form.
    setShowLogin(true);
    // You could display a message here if you wish.
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-xl rounded-lg">
        {showLogin ? (
          <>
            <LoginForm onSuccess={handleLoginSuccess} />
            <p className="mt-6 text-center text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <button onClick={() => setShowLogin(false)} className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Sign Up
              </button>
            </p>
          </>
        ) : (
          <>
            <RegisterForm onSuccess={handleRegisterSuccess} />
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button onClick={() => setShowLogin(true)} className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Sign In
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
