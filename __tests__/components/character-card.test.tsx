import { render, screen, fireEvent } from "@testing-library/react";
import { CharacterCard } from "@/components/character-card";
import type { Character } from "@/types";
import { jest } from "@jest/globals";

const mockCharacter: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: ["https://rickandmortyapi.com/api/episode/1"],
  gender: "Male",
  origin: { name: "Earth (C-137)" },
  location: { name: "Citadel of Ricks" },
};

describe("CharacterCard", () => {
  const defaultProps = {
    character: mockCharacter,
    isSelected: false,
    onSelect: jest.fn(),
    section: "Character #1",
    isFavorite: false,
    onToggleFavorite: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders character information", () => {
    render(<CharacterCard {...defaultProps} />);

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Alive - Human")).toBeInTheDocument();
    expect(screen.getByText("Earth (C-137)")).toBeInTheDocument();
  });

  it("calls onSelect when card is clicked", () => {
    render(<CharacterCard {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Select Rick Sanchez for Character #1/i,
      })
    );
    expect(defaultProps.onSelect).toHaveBeenCalledTimes(1);
  });

  it("calls onToggleFavorite when heart button is clicked", () => {
    render(<CharacterCard {...defaultProps} />);

    fireEvent.click(screen.getByLabelText("Add to favorites"));
    expect(defaultProps.onToggleFavorite).toHaveBeenCalledWith(1);
  });

  it("shows selected state", () => {
    render(<CharacterCard {...defaultProps} isSelected={true} />);

    const card = screen.getByRole("button", {
      name: /Select Rick Sanchez for Character #1/i,
    });
    expect(card).toHaveClass("ring-2", "ring-blue-500", "bg-blue-50");
  });

  it("shows favorite state", () => {
    render(<CharacterCard {...defaultProps} isFavorite={true} />);

    expect(screen.getByLabelText("Remove from favorites")).toBeInTheDocument();
  });
});
