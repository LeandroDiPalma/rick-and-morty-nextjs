"use client";

import { Badge } from "@/components/ui/badge";
import { CharacterCard } from "./character-card";
import { CharacterSkeleton } from "./character-skeleton";
import type { Character } from "@/types";

interface CharacterSectionProps {
  title: string;
  characters: Character[];
  selectedCharacter: Character | null;
  onSelectCharacter: (character: Character) => void;
  loading: boolean;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  startIndex: number;
  endIndex: number;
}

export function CharacterSection({
  title,
  characters,
  selectedCharacter,
  onSelectCharacter,
  loading,
  favorites,
  onToggleFavorite,
  startIndex,
  endIndex,
}: CharacterSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {selectedCharacter && (
          <Badge
            variant="secondary"
            className="flex items-center gap-2 px-3 py-1"
          >
            <img
              src={selectedCharacter.image || "/placeholder.svg"}
              alt=""
              className="w-6 h-6 rounded-full"
            />
            {selectedCharacter.name}
          </Badge>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <CharacterSkeleton key={i} />
            ))
          : characters
              .slice(startIndex, endIndex)
              .map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  isSelected={selectedCharacter?.id === character.id}
                  onSelect={() => onSelectCharacter(character)}
                  section={title}
                  isFavorite={favorites.includes(character.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
      </div>
    </div>
  );
}
