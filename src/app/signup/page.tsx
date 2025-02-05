"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSignUpSchema, userSignUpType } from "@/types/types";
import InputUI from "@/components/InputUI";
import ButtonUI from "@/components/ButtonUI";

export default function SignUpPage() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError: setFormError,
    formState: { errors, isSubmitting },
  } = useForm<userSignUpType>({
    resolver: zodResolver(userSignUpSchema),
  });

  const onSubmit = async (data: userSignUpType) => {
    try {
      setSuccessMessage(null);

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.code === "ZOD_ERROR") {
        Object.keys(result.errors).forEach((key) =>
          setFormError(key as keyof userSignUpType, { message: result.errors[key]._errors[0] })
        );
        setFormError("root", { message: "Please fix the errors above." });
      } else if (result.code === "SUCCESS") {
        setSuccessMessage("✅ Account created successfully! Redirecting...");
        setTimeout(() => router.push("/login"), 1000);
      } else {
        setFormError("root", { message: result.message || "An error occurred." });
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      setFormError("root", { message: "Network error, please try again." });
    }
  };

  return (
    <div className="flex h-[75vh] items-center justify-center">
      <div className="max-w-lg w-full p-6 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">🔐 Sign Up</h2>

        {errors.root && <p className="text-center text-red-500">{errors.root.message}</p>}
        {successMessage && <p className="text-center text-green-500">{successMessage}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <InputUI id="name" type="text" labelText="Your Name" register={register("name")} error={errors.name} />
          <InputUI id="email" type="email" labelText="Your Email" register={register("email")} error={errors.email} />
          <InputUI id="password" type="password" labelText="Your Password" register={register("password")} error={errors.password} />

          <ButtonUI 
            text="Sign Up"
            type="submit"
            className="bg-green-600 hover:bg-green-800 text-white"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            loadingText="Processing..."
          />
        </form>
      </div>
    </div>
  );
}
