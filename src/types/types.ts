import {z} from "zod";

const nameValidation = z
  .string()
  .min(3, { message: "Name must be at least 3 characters" })
  .max(10, { message: "Name must be at most 10 characters" })
  .nonempty({ message: "Name is required." })
  .trim()
  ;

const passwordValidation = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .max(12, { message: "Password must be at most 12 characters" })
  .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter.' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
  .regex(/[^a-zA-Z0-9]/, {
    message: 'Contain at least one special character.',
  })
  .trim()
  ;

const emailValidation = z
  .string()
  .email({ message: "Please enter a valid email" })
  .trim()
  ;

export const userSignUpSchema = z.object({
  email: emailValidation,
  name: nameValidation,
  password: passwordValidation,
});

export const userLoginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export type userSignUpType = z.infer<typeof userSignUpSchema>;
export type userLoginType = z.infer<typeof userLoginSchema>;

// user type
export type userType = {
  email: string;
  name: string;
  id: string;
  createdAt: Date;
}
// Game object Types
export type Game = {
  id: number;
  name: string;
  rating: number;
  background_image: string;
  released: string;
  genres: { name: string }[];
};

// Button Component
export type ButtonProps = {
  href: string;
  text: string;
  className: string;
};

// Section Wrapper Component
export type SectionProps = {
  children: React.ReactNode;
  className?: string;
};
