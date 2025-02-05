
"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import GameCard from "@/components/GameCard";
import GameCardLoader from "@/components/GameCardLoader";
import { ButtonProps, Game, SectionProps } from "@/types/types";
import { AuthContext } from "@/context/authContext";

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
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const auth = useContext(AuthContext);
  const PAGE_SIZE = 9

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/games", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ page: 2, search: "", page_size: PAGE_SIZE }),
        });
        const data = await response.json();

        if (data.results) {
          setGames(data.results);
          setFavorites(new Set(data.favorites || []));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, [auth?.isAuthenticated]);

  const handleToggleFavorite = async (game: Game) => {
    if (!auth?.isAuthenticated) return;
    const isAlreadyFavorite = favorites.has(game.id);

    try {
      const response = await fetch(`/api/favorites/${isAlreadyFavorite ? "remove" : "add"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameId: game.id,
          name: game.name,
          released: game.released,
          rating: game.rating,
          background_image: game.background_image,
          genres: game.genres,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update favorites");
      }

      setFavorites((prev) => {
        const newFavorites = new Set(prev);
        if (isAlreadyFavorite) {
          newFavorites.delete(game.id);
        } else {
          newFavorites.add(game.id);
        }
        return newFavorites;
      });

    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
<div className="flex flex-col gap-10">
      {/* Hero Section with Image Spinner */}
      <Section className="relative p-10 items-center justify-start h-96 sm:h-[500px] md:h-[70vh] text-center">
        <div
          className={`hero-bg absolute inset-0 bg-cover bg-center bg-no-repeat opacity-55 rounded-md transition-opacity duration-500  `}
        ></div>
        <div className="relative">
          <h1 className="text-3xl sm:text-5xl font-bold">Find. Play. Enjoy.</h1>
          <p className="my-4 text-sm sm:text-lg font-semibold">
            Discover the best games and add them to your favorites!
          </p>
          <div className="my-2 flex flex-col sm:flex-row gap-2 justify-center">
          {auth?.isAuthenticated ? (
              <Button href="/favorites" text="My Favorites" className="bg-green-700 w-[60%] sm:w-4/5" />
            ) : (
              <Button href="/signup" text="Sign Up" className="bg-sky-800 w-[60%] sm:w-4/5" />
            )}
            <Button href="/games" text="Explore Games" className="bg-pink-800 w-[60%] sm:w-4/5" />
          </div>
        </div>
      </Section>

      {/* Trending Games Section */}
      <Section>
        <h2 className="text-3xl sm:text-4xl font-bold text-center">🔥 Trending Games</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading
            ? Array(PAGE_SIZE)
              .fill(0)
              .map((_, index) => <GameCardLoader key={index} />)
            : games.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  isFavorite={favorites.has(game.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
          ))}
        </div>
      </Section>
    </div>
  );
}
