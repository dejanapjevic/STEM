import React from "react";
import { Navigate, Outlet } from "react-router-dom";

async function checkAuth() {
  try {
    const response = await fetch(
      "http://localhost:5211/api/Account/isLoggedIn",
      {
        credentials: "include", // Šalje cookie sa zahtevom
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data.isAuthenticated;
    }
  } catch (error) {
    console.error("Greška pri proveri prijave", error);
  }
  return false;
}

export default function IsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    checkAuth().then(setIsLoggedIn);
  }, []);

  if (isLoggedIn === null) return <div>Loading...</div>;

  return isLoggedIn ? <Navigate to="/homepage" replace /> : <Outlet />;
}
