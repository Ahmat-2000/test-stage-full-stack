'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Game = {
  id: number;
  name: string;
  rating: number;
  background_image: string;
};

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
      <section className="relative p-10 flex items-start justify-center h-96 sm:h-[500px] md:h-[70vh] text-center ">
        {/* Background Image */}
        <div className="hero-bg absolute inset-1 bg-cover bg-center bg-no-repeat opacity-55 rounded-md"></div>

        <div className="relative ">
          <h1 className="text-3xl sm:text-5xl font-bold">
            Find. Play. Enjoy.
          </h1>
          <p className="my-4 text-sm sm:text-lg font-semibold ">
            Discover the best games and add them to your favorites!
          </p>
          <Link href="/games">
            <button className="p-2 text-center bg-orange-900 shadow-sky-900 text-lg font-bold rounded-md shadow-md hover:bg-sky-700 duration-500">
              Explore Games Now
            </button>
          </Link>
        </div>
      </section>

      {/* Trending Games Section */}
      <section className="flex flex-col gap-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">🔥 Trending Games</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {games.map((game) => (
            <div key={game.id} className="relative bg-gray-900 rounded-lg p-4 shadow-lg hover:scale-105 transition">
              <Image alt="image" src={game.background_image} className="w-full h-52 object-cover rounded-md" width={500} height={500}/>
              <h3 className="mt-2 text-lg font-semibold text-white">{game.name}</h3>
              <p className="text-yellow-500 font-black">⭐ {game.rating}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call-To-Action Section */}
      <section className="py-12 text-center bg-darkNav">
        <h2 className="text-3xl text-white ">🚀 Ready to Play?</h2>
        <p className="mt-4 text-gray-300">
          Create an account and start discovering the best games now!
        </p>
        <div className="mt-6 space-x-4">
          <Link href="/signup">
            <button className="px-6 py-3 text-lg font-bold text-black rounded-md shadow-lg hover:bg-neonYellow transition">
              Sign Up
            </button>
          </Link>
          <Link href="/games">
            <button className="px-6 py-3 text-lg font-bold bg-gray-800 text-white rounded-md shadow-lg hover:bg-gray-600 transition">
              Explore Games
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
