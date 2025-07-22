"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCharacters } from "@/hooks/use-characters"
import { useEpisodes } from "@/hooks/use-episodes"
import { useFavorites } from "@/hooks/use-favorites"
import { useFilters } from "@/hooks/use-filters"
import { useCharacterSelection } from "@/hooks/use-character-selection"
import { SearchFilters } from "@/components/search-filters"
import { CharacterSection } from "@/components/character-section"
import { EpisodeList } from "@/components/episode-list"

export default function RickMortyChallenge() {
  const { characters, currentPage, totalPages, loading, error, setCurrentPage, fetchCharacters } = useCharacters()
  const { selectedChar1, selectedChar2, setSelectedChar1, setSelectedChar2 } = useCharacterSelection()
  const { char1Episodes, char2Episodes, sharedEpisodes } = useEpisodes(selectedChar1, selectedChar2)
  const { favorites, toggleFavorite } = useFavorites()
  const {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    showFilters,
    setShowFilters,
    debouncedSearchTerm,
    clearFilters,
    hasActiveFilters,
  } = useFilters()

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm, filters])

  useEffect(() => {
    fetchCharacters(currentPage, debouncedSearchTerm, filters)
  }, [currentPage, fetchCharacters, debouncedSearchTerm, filters])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Rick & Morty Explorer
          </h1>
          <p className="text-gray-600 text-lg">Discover characters and explore their adventures</p>
        </div>

        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          hasActiveFilters={hasActiveFilters}
          clearFilters={clearFilters}
        />

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-600">{error}</p>
            <Button
              variant="outline"
              onClick={() => fetchCharacters(currentPage, debouncedSearchTerm, filters)}
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <CharacterSection
            title="Character #1"
            characters={characters}
            selectedCharacter={selectedChar1}
            onSelectCharacter={setSelectedChar1}
            loading={loading}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            startIndex={0}
            endIndex={6}
          />

          <CharacterSection
            title="Character #2"
            characters={characters}
            selectedCharacter={selectedChar2}
            onSelectCharacter={setSelectedChar2}
            loading={loading}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            startIndex={6}
            endIndex={12}
          />
        </div>

        <div className="flex justify-center items-center space-x-4 mb-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1 || loading}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Page</span>
            <Badge variant="outline" className="px-3 py-1">
              {currentPage} of {totalPages}
            </Badge>
          </div>

          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages || loading}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <EpisodeList episodes={char1Episodes} title="Character #1 Episodes" isEmpty={!selectedChar1} />
          <EpisodeList episodes={sharedEpisodes} title="Shared Episodes" isEmpty={!selectedChar1 || !selectedChar2} />
          <EpisodeList episodes={char2Episodes} title="Character #2 Episodes" isEmpty={!selectedChar2} />
        </div>

        {(selectedChar1 || selectedChar2) && (
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold mb-4 text-center">Episode Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{char1Episodes.length}</p>
                <p className="text-sm text-gray-600">Character #1 Episodes</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{sharedEpisodes.length}</p>
                <p className="text-sm text-gray-600">Shared Episodes</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{char2Episodes.length}</p>
                <p className="text-sm text-gray-600">Character #2 Episodes</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
