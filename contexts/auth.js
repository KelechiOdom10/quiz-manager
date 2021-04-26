import { useToast } from "@chakra-ui/toast";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isBrowser } from "../utils/ssr";
import LoadingScreen from "../components/shared/Loading";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const router = useRouter();

  const getCurrentUser = async () => {
    if (isBrowser) {
      const response = await fetch("/api/user/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      if (result.status === "success") {
        setUser(result.data);
        setLoading(false);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [router.pathname]);

  const login = async payload => {
    if (isBrowser) {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...payload }),
      });

      const result = await res.json();
      const { status, message } = result;

      if (status === "error") {
        toast({
          title: "Error",
          variant: "left-accent",
          position: "top-right",
          description: message,
          status: "error",
          isClosable: true,
          duration: 4000,
        });
      }

      if (status === "success") {
        toast({
          title: "Successful Login",
          variant: "left-accent",
          position: "top-right",
          description: message,
          status: "success",
          duration: 4000,
          isClosable: true,
        });

        setUser(result.data);

        router.push("/home");
      }
    }
  };

  const signup = async payload => {
    if (isBrowser) {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...payload }),
      });

      const { status, message } = await res.json();

      if (status === "error") {
        toast({
          title: "Error",
          variant: "left-accent",
          position: "top-right",
          description: message,
          status: "error",
          isClosable: true,
          duration: 4000,
        });
        return;
      }

      if (status === "success") {
        toast({
          title: "Account created.",
          variant: "left-accent",
          position: "top-right",
          description: "We've created your account for you.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });

        router.push("/login");
      }
    }
  };

  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }).then(() => setUser(null));
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <authContext.Provider value={{ login, user, loading, signup, logout }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
