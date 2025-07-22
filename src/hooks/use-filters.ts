"use client";

import { useState } from "react";
import { useDebounce } from "./use-debounce";

interface Filters {
  status: string;
  species: string;
  gender: string;
}

export function useFilters() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>({
    status: "all",
    species: "all",
    gender: "all",
  });
  const [showFilters, setShowFilters] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const clearFilters = () => {
    setFilters({ status: "all", species: "all", gender: "all" });
    setSearchTerm("");
  };

  const hasActiveFilters =
    searchTerm ||
    (filters.status !== "all" && filters.status !== "") ||
    (filters.species !== "all" && filters.species !== "") ||
    (filters.gender !== "all" && filters.gender !== "");

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    showFilters,
    setShowFilters,
    debouncedSearchTerm,
    clearFilters,
    hasActiveFilters,
  };
}
