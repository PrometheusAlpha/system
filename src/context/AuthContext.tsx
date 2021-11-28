import { createUserWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useEffect } from 'react'
import { auth } from '../firebase';

const AuthContext = React.createContext<any>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any): any {
  const [curentUser, setCurrentUser] = React.useState<any>(null);

  const signup = (user: any, password: any) => {
    createUserWithEmailAndPassword(auth, user, password);
  };
  const login = (user: any, password: any) => {
    return signInWithEmailAndPassword(auth, user, password);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    curentUser,
    signup,
    login
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
