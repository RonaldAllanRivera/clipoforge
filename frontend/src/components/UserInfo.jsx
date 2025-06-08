import { useEffect, useState } from "react";

function UserInfo() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/users/me/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);
  if (!user) return null;
  return (
    <div className="mb-4 text-lg text-center">
      Welcome, <b>{user.email}</b>!
    </div>
  );
}

export default UserInfo;
