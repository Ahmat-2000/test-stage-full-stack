"use server"

import "server-only";
import { deleteSession, getSession } from "../utils/session"

export async function logout() {
  await deleteSession();
}

export async function isLogin() {
  return await getSession();
}