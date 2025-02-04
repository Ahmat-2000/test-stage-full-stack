import "server-only";

import { jwtVerify, SignJWT } from "jose";
import { userType } from "@/types/types";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET_KEY;
const encodedkey = new TextEncoder().encode(secretKey);

type SessionPlayload ={
  user : userType;
  expiresAt : Date
};

const algo = "HS256";

export async function encrypt(payload: SessionPlayload) {
  return new SignJWT(payload)
    .setProtectedHeader({alg: algo})
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedkey);
}

export async function decrypt(session : string | undefined ="") {
  try {
    const { payload } = await jwtVerify(session,encodedkey,{algorithms: [algo]});
    return payload;
  } catch (error) {
    console.log(`Failed to verify session : ${error}`);
    return null;
  }
}

export async function createSession(user : userType) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days in ms
  const session = await encrypt({user , expiresAt});

  // set the cookie in the session 
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: expiresAt
  });
}

export async function getSession() {
  const session = (await cookies()).get('session')?.value
  if (!session) {
    return null;
  }
  return await decrypt(session);
}

export async function deleteSession() {
  (await cookies()).delete("session");
}
