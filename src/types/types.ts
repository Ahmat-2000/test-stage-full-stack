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

export type UserSignUpInput = {
  email: string,
  password: string
  name: string
};

export type UserLoginInput = {
  email: string ,
  password: string
};