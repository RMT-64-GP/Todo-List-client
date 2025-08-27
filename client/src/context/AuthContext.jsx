import { createContext, useContext, useState, useEffect } from "react";
import { GoogleOAuth } from "../services/googleAuth";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = GoogleOAuth.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsLoading(false);

    // Listen for authentication events
    const handleAuthSuccess = (event) => {
      const { userInfo } = event.detail;
      setUser(userInfo);
    };

    const handleSignOut = () => {
      setUser(null);
    };

    window.addEventListener("googleAuthSuccess", handleAuthSuccess);
    window.addEventListener("googleAuthSignOut", handleSignOut);

    return () => {
      window.removeEventListener("googleAuthSuccess", handleAuthSuccess);
      window.removeEventListener("googleAuthSignOut", handleSignOut);
    };
  }, []);

  const signOut = () => {
    GoogleOAuth.signOut();
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
