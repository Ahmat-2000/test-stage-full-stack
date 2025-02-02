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