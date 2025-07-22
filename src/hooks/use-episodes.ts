"use client";

import { useState, useEffect } from "react";
import type { Character, Episode } from "@/types";

export function useEpisodes(
  selectedChar1: Character | null,
  selectedChar2: Character | null
) {
  const [char1Episodes, setChar1Episodes] = useState<Episode[]>([]);
  const [char2Episodes, setChar2Episodes] = useState<Episode[]>([]);
  const [sharedEpisodes, setSharedEpisodes] = useState<Episode[]>([]);

  const fetchEpisodes = async (episodeUrls: string[]): Promise<Episode[]> => {
    if (episodeUrls.length === 0) return [];

    try {
      const episodeIds = episodeUrls
        .map((url) => url.split("/").pop())
        .join(",");
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode/${episodeIds}`
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      return Array.isArray(data) ? data : [data];
    } catch (error) {
      console.error("Error fetching episodes:", error);
      return [];
    }
  };

  useEffect(() => {
    const updateEpisodes = async () => {
      const [char1Eps, char2Eps] = await Promise.all([
        selectedChar1
          ? fetchEpisodes(selectedChar1.episode)
          : Promise.resolve([]),
        selectedChar2
          ? fetchEpisodes(selectedChar2.episode)
          : Promise.resolve([]),
      ]);

      setChar1Episodes(char1Eps);
      setChar2Episodes(char2Eps);

      if (selectedChar1 && selectedChar2) {
        const char1EpisodeIds = selectedChar1.episode.map((url) =>
          url.split("/").pop()
        );
        const char2EpisodeIds = selectedChar2.episode.map((url) =>
          url.split("/").pop()
        );
        const sharedIds = char1EpisodeIds.filter((id) =>
          char2EpisodeIds.includes(id)
        );

        if (sharedIds.length > 0) {
          const episodes = await fetchEpisodes(
            sharedIds.map(
              (id) => `https://rickandmortyapi.com/api/episode/${id}`
            )
          );
          setSharedEpisodes(episodes);
        } else {
          setSharedEpisodes([]);
        }
      } else {
        setSharedEpisodes([]);
      }
    };

    updateEpisodes();
  }, [selectedChar1, selectedChar2]);

  return {
    char1Episodes,
    char2Episodes,
    sharedEpisodes,
  };
}
