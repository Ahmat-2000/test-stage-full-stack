"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputUI from "@/components/InputUI";
import LoadingSpin from "@/components/LoadingSpin";
import { userSignUpSchema, userSignUpType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const SignUpPage = () => {
  const [feedback, setFeedback] = useState<{ code: string; message: string } | null>(null);
  const router = useRouter();

  const { register, handleSubmit, setError, reset, formState: { errors, isSubmitting } } = useForm<userSignUpType>({
    resolver: zodResolver(userSignUpSchema),
  });

  const onSubmit: SubmitHandler<userSignUpType> = async (data) => {
    try {
      setFeedback(null); 

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setFeedback(result);

      if (result.code === "ZOD_ERROR") {
        Object.keys(result.errors).forEach((key) => setError(key as keyof userSignUpType, { message: result.errors[key]._errors[0] }));
      }
      else if (result.code === "SUCCESS") {
        setTimeout(() => {
          router.push("/login"); 
        }, 500);
      }

    } catch (error) {
      console.error("Sign-up error:", error);
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

        <InputUI id="name" type="text" labelText="Your Name" 
          register={register("name")}
          error={errors?.name}
        />
        <InputUI id="email" type="email" labelText="Your E-mail" 
          register={register("email")}
          error={errors?.email}
        />
        <InputUI id="password" type="password" labelText="Your Password" 
          register={register("password")}
          error={errors?.password}
        />
        
        <button
          disabled={isSubmitting} 
          type="submit"
          className="inline-flex mt-10 items-center justify-center p-3 font-semibold transition-opacity duration-500 hover:opacity-75 text-neutral-300/80 bg-blue-500/75 rounded-lg w-1/2 mx-auto"
        >
          {isSubmitting ? (<LoadingSpin text="Processing..." />) : "Sign Up"} 
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
