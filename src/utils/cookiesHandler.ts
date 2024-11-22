"use server";

import { cookies } from "next/headers";
import { decodeJWT } from "./JWTDecoder";

export const getTokenValue = async (): Promise<string> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  return token.value;
};

export const getRole = async (): Promise<string> => {
  const tokenValue = await getTokenValue();
  const payload = decodeJWT(tokenValue);
  return payload.scope;
};

export const setToken = (token: string) => {
  const cookieStore = cookies();
  cookieStore.set({
    name: "token",
    value: token,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });
};

export const deleteToken = () => {
  const cookieStore = cookies();
  cookieStore.delete("token");
};
