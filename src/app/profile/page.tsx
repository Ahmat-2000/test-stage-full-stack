"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "@/context/authContext";
import InputUI from "@/components/InputUI"; 

const profileSchema = z.object({
  name: z.string().min(3, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
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
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    if (auth?.isAuthenticated) {
      fetchUser();
    } else {
      router.push("/login");
    }
  }, [auth?.isAuthenticated, router, setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update profile");
      alert("Profile updated successfully!");
    } catch (error) {
      setError("Failed to update profile");
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account?")) return;

    try {
      const response = await fetch("/api/user/delete", { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete account");

      alert("Account deleted successfully!");
      auth?.handleLogout();
      router.push("/signup");
    } catch (error) {
      setError("Failed to delete account");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">👤 My Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* ✅ Using InputUI component */}
        <InputUI id="name" type="text" labelText="Name" register={register("name")} error={errors.name} />
        <InputUI id="email" type="email" labelText="Email" register={register("email")} error={errors.email} />
        <InputUI id="password" type="password" labelText="New Password (optional)" register={register("password")} error={errors.password} />

        <button type="submit" className="w-full p-2 bg-green-600 hover:bg-green-700 text-white rounded-md" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Profile"}
        </button>
      </form>

      <button onClick={handleDeleteAccount} className="w-full mt-4 p-2 bg-red-600 hover:bg-red-700 text-white rounded-md">
        Delete Account
      </button>
    </div>
  );
}
