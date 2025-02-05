"use client";

import { useState, useEffect, useContext, SetStateAction } from "react";
import { Game } from "@/types/types";
import { AuthContext } from "@/context/authContext";
import GamesList from "@/components/GamesList";

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const PAGE_SIZE = 6;

  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/games", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ page, search: searchTerm, page_size: PAGE_SIZE }),
        });
        const data = await response.json();

        if (data.results) {
          setGames(data.results);
          setFavorites(new Set(data.favorites));
          setTotalPages(Math.ceil(data.total_count / PAGE_SIZE));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, [page, searchTerm, auth?.isAuthenticated]);

  const handleToggleFavorite = async (game: Game) => {
    if (!auth?.isAuthenticated) return;
    const isAlreadyFavorite = favorites.has(game.id);
    try {
      const response = await fetch(`/api/favorites/${isAlreadyFavorite ? "remove" : "add"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId: game.id, name: game.name, released: game.released, rating: game.rating, background_image: game.background_image,genres: game.genres,
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
    <GamesList title={"🎮 All Games"} 
      PAGE_SIZE={PAGE_SIZE} handleToggleFavorite={handleToggleFavorite} 
      state={{ 
        page: page, setPage: setPage,
        searchTerm: searchTerm, setSearchTerm: setSearchTerm,
        totalPages: totalPages, loading: loading,
        favorites: favorites, games: games
      }} 
    />
  );
}
