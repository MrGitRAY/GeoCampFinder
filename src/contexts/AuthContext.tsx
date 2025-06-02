import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type AuthContextType = {
  user: string | null;
  password: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  password: null,
  login: () => { },
  logout: () => { },
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  const login = (username: string, pwd: string) => {
    setUser(username);
    setPassword(pwd);
    localStorage.setItem("User", username);
  };

  const logout = () => {
    setUser(null);
    setPassword(null);
    localStorage.removeItem("User");
  };

  return (
    <AuthContext.Provider value={{ user, password, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);