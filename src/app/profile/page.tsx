"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "@/context/authContext";
import { profileSchema } from "@/types/types";
import InputUI from "@/components/InputUI";
import ButtonUI from "@/components/ButtonUI";
import { z } from "zod";

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user/info");
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setValue("name", data.name);
        setValue("email", data.email);
      } catch (error) {
        setError("root", { message: "Failed to load profile" });
      }
    };

    if (auth?.isAuthenticated) {
      fetchUser();
    } else {
      router.push("/login");
    }
  }, [auth?.isAuthenticated, router, setValue, setError]);

  const onSubmit = async (data: ProfileFormData) => {
    setError("root", { message: "" });
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.code === "ZOD_ERROR") {
          Object.keys(result.errors).forEach((key) => {
            setError(key as keyof ProfileFormData, { message: result.errors[key]._errors[0] });
          });
          setError("root", { message: "Please fix the errors above." });
        } else {
          setError("root", { message: result.error || "Failed to update profile" });
        }
      } else {
        setSuccessMessage("Profile updated successfully!");
      }
    } catch (error) {
      setError("root", { message: "Internal Server Error. Please try again." });
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account?")) return;

    try {
      const response = await fetch("/api/user/delete", { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete account");

      auth?.handleLogout();
      router.push("/signup");
    } catch (error) {
      setError("root", { message: "Failed to delete account" });
    }
  };

  return (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="max-w-lg w-full p-6 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">👤 My Profile</h2>

        {errors.root && <p className="text-center text-red-500">{errors.root.message}</p>}
        {successMessage && <p className="text-center text-green-500">{successMessage}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <InputUI id="name" type="text" labelText="Name" register={register("name")} error={errors.name} />
          <InputUI id="email" type="email" labelText="Email" register={register("email")} error={errors.email} />
          <InputUI id="password" type="password" labelText="New Password (optional)" register={register("password")} error={errors.password} />

          <ButtonUI 
            text="Update Profile"
            type="submit"
            className="bg-green-600 hover:bg-green-800 text-white"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            loadingText="Updating..."
          />

          <ButtonUI 
            text="Delete Account"
            loadingText="Deleting..."
            type="button"
            disabled={isSubmitting}
            onClick={handleDeleteAccount}           
            className="bg-red-600 hover:bg-red-700 text-white"
          />
        </form>
      </div>
    </div>
  );
}
