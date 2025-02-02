"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Types
type Game = {
  id: number;
  name: string;
  rating: number;
  background_image: string;
};

// Button Component
type ButtonProps = {
  href: string;
  text: string;
  className: string;
};
const Button = ({ href, text, className }: ButtonProps) => (
  <Link href={href} className="w-full ">
    <button
      className={`p-3 text-sm sm:text-lg font-bold ${className} text-white rounded-md shadow-md shadow-sky-600 hover:bg-gray-600 transition`}
    >
      {text}
    </button>
  </Link>
);

// Section Wrapper Component
type SectionProps = {
  children: React.ReactNode;
  className?: string;
};
const Section = ({ children, className }: SectionProps) => (
  <section className={`flex flex-col gap-10 ${className}`}>{children}</section>
);

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);

  // Fetch trending games from RAWG API
  useEffect(() => {
    fetch(`https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`)
      .then((res) => res.json())
      .then((data) => setGames(data.results.slice(0, 6))); // Limit to 6 games
  }, []);

  return (
    <div className="flex flex-col gap-10">
      {/* Hero Section */}
      <Section className="relative p-10 items-center justify-start h-96 sm:h-[500px] md:h-[70vh] text-center">
        <div className="hero-bg absolute inset-1 bg-cover bg-center bg-no-repeat opacity-55 rounded-md"></div>
        <div className="relative">
          <h1 className="text-3xl sm:text-5xl font-bold">Find. Play. Enjoy.</h1>
          <p className="my-4 text-sm sm:text-lg font-semibold">
            Discover the best games and add them to your favorites!
          </p>
          <div className="my-2 flex flex-col sm:flex-row gap-2 justify-center">
            <Button href="/signup" text="Sign Up" className="bg-sky-800 w-[60%] sm:w-4/5" />
            <Button href="/games" text="Explore Games" className="bg-pink-800 w-[60%] sm:w-4/5" />
          </div>
        </div>
      </Section>

      {/* Trending Games Section */}
      <Section>
        <h2 className="text-3xl sm:text-4xl font-bold text-center">🔥 Trending Games</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              className="flex flex-col relative bg-gray-900 rounded-lg p-4 shadow-lg hover:scale-105 transition duration-200"
            >
              <Image
                alt={game.name}
                src={game.background_image}
                className="w-full h-54 object-cover rounded-lg md:h-48 md:object-top"
                width={500}
                height={500}
                loading="lazy"
              />
              <h3 className="mt-2 text-lg font-semibold text-white">{game.name}</h3>
              <p className="text-yellow-500 font-black">⭐ {game.rating}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
