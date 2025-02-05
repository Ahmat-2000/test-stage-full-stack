"use client";

import { useContext, Dispatch, SetStateAction } from "react";
import GameCard from "@/components/GameCard";
import GameCardLoader from "@/components/GameCardLoader";
import { Game } from "@/types/types";
import { AuthContext } from "@/context/authContext";

type GameListState = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  totalPages: number;
  loading: boolean;
  favorites: Set<number>;
  games: Game[];
};
type GameListProps = {
  title: string;
  PAGE_SIZE : number;
  handleToggleFavorite: (game: Game) => void;
  state: GameListState;
};


export default function GamesList({
  title, handleToggleFavorite, state,PAGE_SIZE
}: GameListProps) {
  const { page, setPage, searchTerm, setSearchTerm, favorites, loading, games, totalPages} = state;
  const auth = useContext(AuthContext);

  return (
    <div className="flex flex-col gap-5 min-h-[80vh] py-1">
      <h2 className="text-3xl sm:text-4xl m-0 font-bold text-center">{title}</h2>
      {/* Search Bar */}
      <div className="flex justify-center">
        <input
          type="text"
          className="w-4/5 md:w-1/2 p-3 border border-gray-700 rounded-md bg-gray-900/90 text-gray-300 placeholder-gray-400 shadow shadow-gray-600 outline-none focus:ring-1 focus:ring-green-900 focus:border-green-900 transition-all duration-300"
          placeholder="Search games by name & genre"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />
      </div>
      {/* Game List */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {loading ? 
          Array(PAGE_SIZE).fill(0).map((_, index) => <GameCardLoader key={index} />) 
          :
          games.length > 0 ? games.map((game) => (
            <GameCard key={game.id} game={game} isFavorite={favorites.has(game.id)} onToggleFavorite={handleToggleFavorite} />
          )) : 
          <p className="text-center text-gray-400 text-lg col-span-full">No games found!</p>
        }
      </div>
      {/* Pagination */}
      {totalPages > 1 && games.length > 0 && (
        <div className="flex justify-center gap-4 mt-3">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="text-sm sm:text-base p-2 bg-gray-800 text-gray-300 rounded-md disabled:opacity-50"
          >
            ⬅️ Previous
          </button>
          <span className="text-sm sm:text-lg flex items-center">Page {page} / {totalPages}</span>
          <button
            disabled={page >= totalPages || games.length < PAGE_SIZE}
            onClick={() => setPage(page + 1)}
            className="text-sm sm:text-base p-2 bg-gray-800 text-gray-300 rounded-md disabled:opacity-50"
          >
            Next ➡️
          </button>
        </div>
      )}

    </div>
  );
}
