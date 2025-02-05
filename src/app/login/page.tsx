"use client";

import { useContext, useState } from "react";
import InputUI from "@/components/InputUI";
import { userLoginSchema, userLoginType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/authContext";
import ButtonUI from "@/components/ButtonUI";

const LoginPage = () => {
  const auth = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<userLoginType>({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit: SubmitHandler<userLoginType> = async (data) => {
    try {
      setError(null);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.code === "SUCCESS") {
        auth?.checkAuth();
        router.push("/");
      } else {
        setError(result.message || "Invalid login credentials.");
      }
    } catch (error) {
      console.error("Login error: ", error);
      setError("Network error, please try again.");
    }
  };

  return (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="max-w-lg w-full p-6 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">🔑 Login</h2>

        {error && <p className="text-center text-red-500">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <InputUI id="email" type="email" labelText="Your Email" register={register("email")} error={errors.email} />
          <InputUI id="password" type="password" labelText="Your Password" register={register("password")} error={errors.password} />
          <ButtonUI 
            text="Login"
            type="submit"
            className="bg-green-600 hover:bg-green-800 text-white"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
