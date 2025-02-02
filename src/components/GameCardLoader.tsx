
const GameCardLoader = () => {
  return (
    <div className="flex flex-col bg-gray-900 rounded-lg p-4 shadow-lg animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-gray-700 rounded-lg"></div>

      {/* Title Placeholder */}
      <div className="mt-2 h-6 w-3/4 bg-gray-700 rounded-md"></div>

      {/* Release Date Placeholder */}
      <div className="mt-2 h-4 w-1/2 bg-gray-700 rounded-md"></div>

      {/* Genres Placeholder */}
      <div className="mt-2 h-4 w-2/3 bg-gray-700 rounded-md"></div>

      {/* Rating Placeholder */}
      <div className="mt-2 h-4 w-1/4 bg-gray-700 rounded-md"></div>
    </div>
  );
};

export default GameCardLoader;
