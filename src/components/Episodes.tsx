import { useState } from "react";
import useGetEpisodeList from "../hooks/useGetEpisodeList";
import useGetEpisodeDetails from "../hooks/useGetEpisodeDetails";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function Episodes() {
  const [page, setPage] = useState(1);
  const [nameFilter, setNameFilter] = useState("");
  const [codeFilter, setCodeFilter] = useState("");
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<string | null>(
    null
  );

  const { data } = useGetEpisodeList(page, {
    name: nameFilter || undefined,
    episode: codeFilter || undefined,
  });
  const { data: episodeDetailData } = useGetEpisodeDetails(selectedEpisodeId);

  const info = data?.episodes.info;
  const results = data?.episodes.results ?? [];
  const hasNoMatches = !!data && results.length === 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Input
          placeholder="Filter by name..."
          value={nameFilter}
          onChange={(e) => {
            setNameFilter(e.target.value);
            setPage(1);
          }}
          className="max-w-[200px]"
        />
        <Input
          placeholder="Filter by code (e.g. S01E01)"
          value={codeFilter}
          onChange={(e) => {
            setCodeFilter(e.target.value);
            setPage(1);
          }}
          className="max-w-[220px]"
        />
      </div>

      {hasNoMatches && (
        <p className="text-sm text-muted-foreground">
          No episodes match that filter.
        </p>
      )}

      {!hasNoMatches && (
        <div className="grid gap-3 sm:grid-cols-2">
          {results.map((ep) => {
            const isSelected = selectedEpisodeId === ep.id;
            return (
              <button
                key={ep.id}
                onClick={() => setSelectedEpisodeId(ep.id)}
                className={cn(
                  "rounded-lg border bg-card p-3 text-left transition-colors hover:cursor-pointer hover:bg-accent",
                  isSelected && "border-primary ring-1 ring-primary"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{ep.name}</p>
                  <Badge variant="outline">{ep.episode}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {ep.air_date}
                </p>
              </button>
            );
          })}
        </div>
      )}

      {info && !hasNoMatches && (
        <div className="flex items-center justify-between pt-1">
          <p className="text-xs text-muted-foreground">
            Page {page} of {info.pages} · {info.count} episodes
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!info.prev}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!info.next}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {episodeDetailData?.episode && (
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="text-sm font-semibold">
            {episodeDetailData.episode.name} (
            {episodeDetailData.episode.episode})
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Aired {episodeDetailData.episode.air_date} ·{" "}
            {episodeDetailData.episode.characters.length} characters
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {episodeDetailData.episode.characters.slice(0, 12).map((c) => (
              <Badge key={c.id} variant="secondary">
                {c.name}
              </Badge>
            ))}
            {episodeDetailData.episode.characters.length > 12 && (
              <Badge variant="outline">
                +{episodeDetailData.episode.characters.length - 12} more
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
