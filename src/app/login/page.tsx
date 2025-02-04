"use client";

import { useContext, useState } from "react";
import InputUI from "@/components/InputUI";
import LoadingSpin from "@/components/LoadingSpin";
import { userLoginSchema, userLoginType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {AuthContext} from "@/context/authContext";

const LoginPage = () => {
  const auth = useContext(AuthContext);
  const [feedback, setFeedback] = useState<{ code: string; message: string } | null>(null);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<userLoginType>({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit: SubmitHandler<userLoginType> = async (data) => {
    try {
      setFeedback(null);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setFeedback(result);
      if (result.code === "SUCCESS") {
        setTimeout(() => {
          auth?.checkAuth();
          router.push("/profile"); 
        }, 1000);
        //router.push("/profile"); 
        // await auth?.checkAuth();
      }

    } catch (error) {
      console.error("Login error: ", error);
      setFeedback({ code: "NETWORK_ERROR", message: "Network error, please try again." });
    }
  };

  return (
    <div className="flex flex-col h-[80vh] justify-center items-center w-full py-20 px-2">
      <form 
        className="flex flex-col justify-center p-5 sm:p-10 gap-5 h-[80vh] shadow shadow-gray-700 rounded-sm w-full md:w-4/5 lg:w-1/2" 
        onSubmit={handleSubmit(onSubmit)}
      >
        {feedback && (
          <div className={`px-4 py-3 rounded shadow-md animate-pulse ${
            feedback.code === "SUCCESS" ? "text-green-500 shadow-green-900" : "text-red-500 shadow-red-900"
          }`} role="alert">
            <strong className="font-bold text-inherit">{feedback.message}</strong>
          </div>
        )}

        <InputUI id="email" type="email" labelText="Your E-mail" 
          register={register("email")}
          error={errors?.email}
        />
        <InputUI id="password" type="password" labelText="Your password" 
          register={register("password")}
          error={errors?.password}
        />
        
        <button
          disabled={isSubmitting} 
          type="submit"
          className="inline-flex mt-10 items-center justify-center p-3 font-semibold transition-opacity duration-500 hover:opacity-75 text-neutral-300/80 bg-blue-500/75 rounded-lg w-1/2 mx-auto"
        >
          {isSubmitting ? (<LoadingSpin text="Processing..." />) : "Login"} 
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
