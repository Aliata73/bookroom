import { createContext, useContext, useState, useEffect } from "react";
import checkAuth from "@/app/actions/checkAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenicated, setIsAuthenicated] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const checkAuthenication = async () => {
      const { isAuthenicated, user } = await checkAuth();
      setIsAuthenicated(isAuthenicated);
      setCurrentUser(user);
    };

    checkAuthenication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenicated,
        setIsAuthenicated,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}