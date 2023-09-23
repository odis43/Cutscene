import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    // Check if a user is signed in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrUser(user);
      } else {
        setCurrUser(null);
      }
    });

    // Unsubscribe when component unmounts
    return unsubscribe;
  }, []);

  const value = {
    currUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
