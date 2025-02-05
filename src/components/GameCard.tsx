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
    <div className="flex flex-col bg-gray-900 rounded-lg p-4 shadow-lg hover:scale-105 transition duration-200">
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
      <h3 className="mt-2 text-lg font-semibold text-white">
        {game.name}
      </h3>
      <p className="text-gray-400">📅 
        Release Date: {new Date(game.released).toLocaleDateString()}
      </p>
      <p className="text-gray-400">
        🎮 Genres: {game.genres.map((genre) => genre.name).join(", ")}
      </p>
      <p className="text-yellow-500 font-black">
        ⭐ {game.rating}
      </p>

      {/* Favorite Button */}
      {auth?.isAuthenticated ? (
        <button
          onClick={() => onToggleFavorite(game)}
          className={`mt-3 p-2 rounded-md transition-all duration-300 
            ${isFavorite ? "bg-red-700 hover:bg-red-900" : "bg-green-700 hover:bg-green-900"}`
          }
        >
          {isFavorite ? "❌ Remove from Favorites" : "❤️ Add to Favorites"}
        </button>
      ) : (
        <p className="text-sm text-gray-400 mt-3">⚠️ Login to add favorites</p>
      )}
    </div>
  );
};

export default GameCard;
