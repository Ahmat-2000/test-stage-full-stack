'use server'

import { createSession, deleteSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

export async function signUpAction(formData : FormData) {
  // Get data of the form
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");
  // Send data to our api route
  try {
    const res = await fetch(`${process.env.ROOT_API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password , name})
    });
    // Redirect to login if success
    const data = await res.json();
    console.log(data);
    
    if (res.ok) {
      redirect('/login')
    }
  } catch (error) {
    console.error('JSON POST Error:', error);
  }
};


export async function loginAction( formData : FormData) {
  // Get data of the form
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  // Validate user credential
  // todo

  // Send data to our api route
  /* try {
    const res = await fetch(`${process.env.ROOT_API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password , name})
    });
    // Redirect to login if success
    const data = await res.json();
    console.log(data);
    
    if (res.ok) {
      redirect('/home')
    }
  } catch (error) {
    console.error('JSON POST Error:', error);
  } */

    // create session for the user
    await createSession({email, password});
    
    redirect("/profile");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}