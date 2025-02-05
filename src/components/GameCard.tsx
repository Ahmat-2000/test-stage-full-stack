import Image from "next/image";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { Game } from "@/types/types";

type GameProps = {
  game: Game;
  isFavorite: boolean;
  onToggleFavorite: (game: Game) => void;
};

const GameCard = ({ game, isFavorite, onToggleFavorite }: GameProps) => {
  const auth = useContext(AuthContext);

  return (
    <div className="flex flex-col bg-gray-900 rounded-xl p-4 shadow-lg hover:scale-105 transition-transform duration-300 hover:shadow-gray-700">
      {/* Game Image */}
      <Image
        alt={game.name}
        src={game.background_image}
        className="w-full h-54 object-cover rounded-lg sm:h-48 md:object-top"
        width={500}
        height={500}
        loading="lazy"
      />

      {/* Game Info */}
      <div className="flex flex-col gap-2 mt-2">
        <h3 className="text-lg font-semibold text-white truncate">{game.name}</h3>
        <p className="text-gray-400 text-sm">📅 Release Date: {new Date(game.released).toLocaleDateString()}</p>
        <p className="text-gray-400 text-sm">🎮 Genres: {game.genres.map((genre) => genre.name).join(", ")}</p>
        <p className="text-yellow-500 font-black">⭐ {game.rating}</p>
      </div>

      {/* Favorite Button */}
      {auth?.isAuthenticated ? (
        <button
          onClick={() => onToggleFavorite(game)}
          className={`mt-3 flex items-center justify-center gap-2 p-2 text-sm sm:text-base font-semibold rounded-md transition-all duration-300 
            ${isFavorite ? "bg-red-700 hover:bg-red-900" : "bg-green-700 hover:bg-green-900"}`
          }
        >
          <span className="text-lg text-gray-300 ">{isFavorite ? "❌" : "❤️"}</span>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      ) : (
        <p className="text-sm text-gray-400 mt-3">⚠️ Login to add favorites</p>
      )}
    </div>
  );
};

export default GameCard;
