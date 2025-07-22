"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import type { Character } from "@/types";

interface CharacterCardProps {
  character: Character;
  isSelected: boolean;
  onSelect: () => void;
  section: string;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export function CharacterCard({
  character,
  isSelected,
  onSelect,
  section,
  isFavorite,
  onToggleFavorite,
}: CharacterCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "bg-green-500";
      case "dead":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
        isSelected ? "ring-2 ring-blue-500 bg-blue-50 shadow-lg" : ""
      }`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
      aria-label={`Select ${character.name} for ${section}`}
    >
      <CardContent className="p-4 relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(character.id);
          }}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={character.image || "/placeholder.svg?height=64&width=64"}
              alt={character.name}
              className="w-16 h-16 rounded-full object-cover"
              loading="lazy"
            />
            {isFavorite && (
              <Star className="absolute -top-1 -right-1 w-4 h-4 fill-yellow-400 text-yellow-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{character.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <div
                className={`w-2 h-2 rounded-full ${getStatusColor(
                  character.status
                )}`}
              />
              <span className="text-sm text-gray-600 truncate">
                {character.status} - {character.species}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1 truncate">
              {character.origin.name}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
