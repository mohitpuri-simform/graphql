import { useState } from "react";
import useGetCharacterDetails from "../hooks/useGetCharacterDetails";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STATUS_DOT: Record<string, string> = {
  Alive: "bg-green-500",
  Dead: "bg-red-500",
};

export default function CharacterLookup() {
  const [inputId, setInputId] = useState("1");
  const [lookupId, setLookupId] = useState<number | null>(1);
  const { data, loading, error } = useGetCharacterDetails(lookupId);

  const handleLookup = () => {
    const parsed = parseInt(inputId, 10);
    setLookupId(Number.isNaN(parsed) ? null : parsed);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="number"
          min={1}
          placeholder="Character ID"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLookup()}
          className="max-w-[160px]"
        />
        <Button onClick={handleLookup}>Look up</Button>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {!loading && (error || (data && !data.character)) && (
        <p className="text-sm text-destructive">Character not found.</p>
      )}

      {data?.character && (
        <div className="flex items-start gap-4 rounded-lg border bg-card p-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={data.character.image}
              alt={data.character.name}
            />
            <AvatarFallback>
              {data.character.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1.5">
            <p className="text-lg font-semibold leading-none">
              {data.character.name}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  STATUS_DOT[data.character.status] ?? "bg-gray-400"
                )}
              />
              <span className="text-sm text-muted-foreground">
                {data.character.status} · {data.character.species}
              </span>
              <Badge variant="secondary">{data.character.gender}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Origin: {data.character.origin?.name ?? "Unknown"}
            </p>
            <p className="text-sm text-muted-foreground">
              Last known location:{" "}
              {data.character.location?.name ?? "Unknown"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
