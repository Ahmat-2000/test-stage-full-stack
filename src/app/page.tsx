"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import GameCard from "../components/GameCard";
import GameCardLoader from "../components/GameCardLoader";
import { ButtonProps, Game, SectionProps } from "../types/types";

const Button = ({ href, text, className }: ButtonProps) => (
  <Link href={href} className="w-full">
    <button
      className={`p-3 text-sm sm:text-lg font-bold ${className} text-white rounded-md shadow-md shadow-sky-600 hover:bg-gray-600 transition`}
    >
      {text}
    </button>
  </Link>
);

const Section = ({ children, className }: SectionProps) => (
  <section className={`flex flex-col gap-10 ${className}`}>{children}</section>
);

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch trending games from RAWG API
  useEffect(() => {
    setLoading(true);
    fetch(`https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data.results.slice(0, 6));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-10">
      {/* Hero Section with Image Spinner */}
      <Section className="relative p-10 items-center justify-start h-96 sm:h-[500px] md:h-[70vh] text-center">
        <div
          className={`hero-bg absolute inset-0 bg-cover bg-center bg-no-repeat opacity-55 rounded-md transition-opacity duration-500 ${loading && "animate-pulse bg-gray-700"} `}
        ></div>
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
          {loading
            ? Array(6)
                .fill(0)
                .map((_, index) => <GameCardLoader key={index} />) // 6 spiners placeholders
            : games.map((game) => <GameCard key={game.id} game={game} />)}
        </div>
      </Section>
    </div>
  );
}
