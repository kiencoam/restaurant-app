"use client";

import { createContext } from "react";

export const loginUserContext = createContext<{
  id: number;
  role: string;
} | null>(null);

const loginUserProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: { id: number; role: string };
}) => {
  return (
    <loginUserContext.Provider value={user}>
      {children}
    </loginUserContext.Provider>
  );
};

export default loginUserProvider;