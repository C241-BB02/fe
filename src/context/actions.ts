"use server";

import { sessionOptions, SessionData, defaultSession } from "@/context/AuthContext";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
};

export const login = async (response: SessionData) => {
  const session = await getSession();

  session.id = response.id;
  session.username = response.username;
  session.email = response.email;
  session.role = response.role;
  session.access = response.access;
  session.refresh = response.refresh;
  session.isLoggedIn = true;

  await session.save();
  redirect("/")
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};