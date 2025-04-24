import { createContext, useState } from "react";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("Leeroy Jenkins");
  const login = (user) => setUser(user);
  const logout = () => setUser(null);
  // console.log("AuthProvider");

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
