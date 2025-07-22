import { render, screen, fireEvent } from "@testing-library/react"
import RickMortyChallenge from "@/app/page"
import jest from "jest" 

jest.mock("@/hooks/use-characters")
jest.mock("@/hooks/use-episodes")
jest.mock("@/hooks/use-favorites")
jest.mock("@/hooks/use-filters")
jest.mock("@/hooks/use-character-selection")

import { useCharacters } from "@/hooks/use-characters"
import { useEpisodes } from "@/hooks/use-episodes"
import { useFavorites } from "@/hooks/use-favorites"
import { useFilters } from "@/hooks/use-filters"
import { useCharacterSelection } from "@/hooks/use-character-selection"

const mockUseCharacters = useCharacters as jest.MockedFunction<typeof useCharacters>
const mockUseEpisodes = useEpisodes as jest.MockedFunction<typeof useEpisodes>
const mockUseFavorites = useFavorites as jest.MockedFunction<typeof useFavorites>
const mockUseFilters = useFilters as jest.MockedFunction<typeof useFilters>
const mockUseCharacterSelection = useCharacterSelection as jest.MockedFunction<typeof useCharacterSelection>

const mockCharacter = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: ["https://rickandmortyapi.com/api/episode/1"],
  gender: "Male",
  origin: { name: "Earth (C-137)" },
  location: { name: "Citadel of Ricks" },
}

describe("RickMortyChallenge Page", () => {
  beforeEach(() => {
    // Mock all hooks with default values
    mockUseCharacters.mockReturnValue({
      characters: [mockCharacter],
      currentPage: 1,
      totalPages: 1,
      loading: false,
      error: null,
      setCurrentPage: jest.fn(),
      fetchCharacters: jest.fn(),
    })

    mockUseEpisodes.mockReturnValue({
      char1Episodes: [],
      char2Episodes: [],
      sharedEpisodes: [],
    })

    mockUseFavorites.mockReturnValue({
      favorites: [],
      toggleFavorite: jest.fn(),
    })

    mockUseFilters.mockReturnValue({
      searchTerm: "",
      setSearchTerm: jest.fn(),
      filters: { status: "all", species: "all", gender: "all" },
      setFilters: jest.fn(),
      showFilters: false,
      setShowFilters: jest.fn(),
      debouncedSearchTerm: "",
      clearFilters: jest.fn(),
      hasActiveFilters: false,
    })

    mockUseCharacterSelection.mockReturnValue({
      selectedChar1: null,
      selectedChar2: null,
      setSelectedChar1: jest.fn(),
      setSelectedChar2: jest.fn(),
    })
  })

  it("renders the main title", () => {
    render(<RickMortyChallenge />)
    expect(screen.getByText("Rick & Morty Explorer")).toBeInTheDocument()
  })

  it("renders character sections", () => {
    render(<RickMortyChallenge />)
    expect(screen.getByText("Character #1")).toBeInTheDocument()
    expect(screen.getByText("Character #2")).toBeInTheDocument()
  })

  it("renders episode sections", () => {
    render(<RickMortyChallenge />)
    expect(screen.getByText("Character #1 Episodes")).toBeInTheDocument()
    expect(screen.getByText("Character #2 Episodes")).toBeInTheDocument()
    expect(screen.getByText("Shared Episodes")).toBeInTheDocument()
  })

  it("shows error state when there's an error", () => {
    mockUseCharacters.mockReturnValue({
      characters: [],
      currentPage: 1,
      totalPages: 1,
      loading: false,
      error: "Network error",
      setCurrentPage: jest.fn(),
      fetchCharacters: jest.fn(),
    })

    render(<RickMortyChallenge />)
    expect(screen.getByText("Network error")).toBeInTheDocument()
    expect(screen.getByText("Try Again")).toBeInTheDocument()
  })

  it("shows statistics when characters are selected", () => {
    mockUseCharacterSelection.mockReturnValue({
      selectedChar1: mockCharacter,
      selectedChar2: null,
      setSelectedChar1: jest.fn(),
      setSelectedChar2: jest.fn(),
    })

    render(<RickMortyChallenge />)
    expect(screen.getByText("Episode Statistics")).toBeInTheDocument()
  })

  it("handles pagination", () => {
    const mockSetCurrentPage = jest.fn()
    mockUseCharacters.mockReturnValue({
      characters: [mockCharacter],
      currentPage: 1,
      totalPages: 5,
      loading: false,
      error: null,
      setCurrentPage: mockSetCurrentPage,
      fetchCharacters: jest.fn(),
    })

    render(<RickMortyChallenge />)

    const nextButton = screen.getByText("Next")
    fireEvent.click(nextButton)

    expect(mockSetCurrentPage).toHaveBeenCalled()
  })
})
