import { useRouter } from "next/navigation";
import React, { useState, createContext, ReactNode } from "react";

interface User {
  id: number;
  name: string;
  avatar: string;
  roles: string[];
}

export interface AuthContextType {
  loggedIn: boolean;
  user: User | null;
  signIn: (params?: any) => void;
  signUp: (params?: any) => void;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const fakeUserData: User = {
  id: 1,
  name: "John Doe",
  avatar:
    "http://s3.amazonaws.com/redqteam.com/isomorphic-reloaded-image/profilepic.png",
  roles: ["USER", "ADMIN"],
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const signIn = (params?: any) => {
    setUser(fakeUserData);
    setLoggedIn(true);
    router.replace("/property-registration");
  };

  const signUp = (params?: any) => {
    setUser(fakeUserData);
    setLoggedIn(true);
    router.replace("/");
  };

  const logOut = () => {
    setUser(null);
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        logOut,
        signIn,
        signUp,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
