"use client";

import { useState, useEffect } from "react";
import type { Character } from "@/types";

export function useCharacterSelection() {
  const [selectedChar1, setSelectedChar1] = useState<Character | null>(null);
  const [selectedChar2, setSelectedChar2] = useState<Character | null>(null);

  useEffect(() => {
    const savedChar1 = localStorage.getItem("selected-char-1");
    const savedChar2 = localStorage.getItem("selected-char-2");

    if (savedChar1) setSelectedChar1(JSON.parse(savedChar1));
    if (savedChar2) setSelectedChar2(JSON.parse(savedChar2));
  }, []);

  useEffect(() => {
    if (selectedChar1) {
      localStorage.setItem("selected-char-1", JSON.stringify(selectedChar1));
    }
  }, [selectedChar1]);

  useEffect(() => {
    if (selectedChar2) {
      localStorage.setItem("selected-char-2", JSON.stringify(selectedChar2));
    }
  }, [selectedChar2]);

  return {
    selectedChar1,
    selectedChar2,
    setSelectedChar1,
    setSelectedChar2,
  };
}
