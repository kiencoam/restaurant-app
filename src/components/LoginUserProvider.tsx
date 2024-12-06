"use client";

import { createContext, useContext } from "react";

export const loginUserContext = createContext<{
  userId: number;
  role: string;
} | null>(null);

const loginUserProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: { userId: number; role: string };
}) => {
  return (
    <loginUserContext.Provider value={user}>
      {children}
    </loginUserContext.Provider>
  );
};

export default loginUserProvider;
