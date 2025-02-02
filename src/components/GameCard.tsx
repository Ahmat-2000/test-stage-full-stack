import Image from "next/image";

type GameProps = {
  game: {
    id: number;
    name: string;
    rating: number;
    background_image: string;
    released: string;
    genres: { name: string }[];
  };
};

const GameCard = ({ game }: GameProps) => {
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
      <h3 className="mt-2 text-lg font-semibold text-white">{game.name}</h3>
      <p className="text-gray-400">📅 Release Date: {new Date(game.released).toLocaleDateString()}</p>
      <p className="text-gray-400">🎮 Genres: {game.genres.map((genre) => genre.name).join(", ")}</p>
      <p className="text-yellow-500 font-black">⭐ {game.rating}</p>
    </div>
  );
};

export default GameCard;
