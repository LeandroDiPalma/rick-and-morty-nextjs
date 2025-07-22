"use client";

import { useState, useCallback } from "react";
import type { Character, ApiResponse } from "@/types";

export function useCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const buildApiUrl = useCallback(
    (page: number, searchTerm: string, filters: any) => {
      const params = new URLSearchParams();
      params.append("page", page.toString());

      if (searchTerm) params.append("name", searchTerm);
      if (filters.status !== "all") params.append("status", filters.status);
      if (filters.species !== "all") params.append("species", filters.species);
      if (filters.gender !== "all") params.append("gender", filters.gender);

      return `https://rickandmortyapi.com/api/character?${params.toString()}`;
    },
    []
  );

  const fetchCharacters = useCallback(
    async (page: number, searchTerm: string, filters: any) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(buildApiUrl(page, searchTerm, filters));

        if (!response.ok) {
          if (response.status === 404) {
            setCharacters([]);
            setTotalPages(1);
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch (error) {
        console.error("Error fetching characters:", error);
        setError("Error loading characters. Please try again.");
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    },
    [buildApiUrl]
  );

  return {
    characters,
    currentPage,
    totalPages,
    loading,
    error,
    setCurrentPage,
    fetchCharacters,
  };
}
