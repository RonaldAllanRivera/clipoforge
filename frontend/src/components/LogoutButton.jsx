import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    // Navigate to a path that will trigger re-evaluation of auth status in App.jsx
    // For example, navigating to '/' will cause App.jsx to check isLoggedIn
    // and redirect to '/auth' if the token is gone.
    navigate('/');
    // You might also want to explicitly navigate to '/auth' if you prefer:
    // navigate('/auth');
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
    >
      Logout
    </button>
  );
}