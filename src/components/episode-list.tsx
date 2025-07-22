"use client";

import { Badge } from "@/components/ui/badge";
import type { Episode } from "@/types";

interface EpisodeListProps {
  episodes: Episode[];
  title: string;
  isEmpty?: boolean;
}

export function EpisodeList({ episodes, title, isEmpty }: EpisodeListProps) {
  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="p-4 border-b bg-gray-50">
        <h3 className="font-semibold text-lg text-center flex items-center justify-center gap-2">
          {title}
          <Badge variant="secondary">{episodes.length}</Badge>
        </h3>
      </div>
      <div className="p-4">
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {episodes.length > 0 ? (
            episodes.map((episode) => (
              <div
                key={episode.id}
                className="text-sm py-2 px-3 border border-gray-100 rounded hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-medium text-blue-600">
                      {episode.episode}
                    </span>
                    <p className="font-semibold">{episode.name}</p>
                  </div>
                  <span className="text-gray-500 text-xs">
                    {episode.air_date}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {isEmpty
                  ? "Select characters to see episodes"
                  : "No episodes found"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
