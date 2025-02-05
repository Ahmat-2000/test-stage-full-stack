"use client";

import { useState, useEffect, useContext } from "react";
import { Game } from "@/types/types";
import { AuthContext } from "@/context/authContext";
import GamesList from "@/components/GamesList";

export default function Favorites() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const PAGE_SIZE = 6;

  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/favorites/list", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ page, search: searchTerm, page_size: PAGE_SIZE }),
        });
        const data = await response.json();
        if (data.results) {
          setGames(data.results);
          setFavorites(new Set(data.results.map((game: Game) => game.id)));
          setTotalPages(Math.ceil(data.total_count / PAGE_SIZE));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorite games:", error);
      }
    };
    fetchFavorites();
  }, [page, searchTerm, auth?.isAuthenticated]);

  /* Toggle favorite (Remove only) */
  const handleToggleFavorite = async (game: Game) => {
    if (!auth?.isAuthenticated) return;

    try {
      const response = await fetch(`/api/favorites/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId: game.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to remove favorite");
      }

      setFavorites((prev) => {
        const newFavorites = new Set(prev);
        newFavorites.delete(game.id);
        return newFavorites;
      });

      setGames((prevGames) => prevGames.filter((g) => g.id !== game.id));

      if (games.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      }

    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <GamesList 
      title={"❤️ My Favorite"} 
      PAGE_SIZE={PAGE_SIZE} 
      handleToggleFavorite={handleToggleFavorite} 
      state={{ 
        page, setPage,
        searchTerm, setSearchTerm,
        totalPages, loading,
        favorites, games
      }} 
    />
  );
}
