import { useState } from "react";
import useGetCharacterDetails from "./hooks/useGetCharacterDetails";
import useGetCharacterList from "./hooks/useGetCharacterList";
import CustomSearch from "./components/CustomSearch";
import CreatePost from "./components/CreatePost";
import DragAndDrop from "./components/DragAndDrop";
import CharacterLookup from "./components/CharacterLookup";
import Episodes from "./components/Episodes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function App() {
  const { data } = useGetCharacterList();
  const [selectedCharacterId, setSelectedCharacterId] = useState<
    number | null
  >(null);
  const { data: characterDetailData } =
    useGetCharacterDetails(selectedCharacterId);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <h1 className="text-3xl font-semibold tracking-tight">
            Rick &amp; Morty Explorer
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Search locations, browse characters, and try out the drag &amp;
            drop task board.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Search locations</CardTitle>
            <CardDescription>
              Find character locations by name.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CustomSearch />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Characters</CardTitle>
            <CardDescription>
              Select a character to preview their details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {data.characters.results.map((characterItem) => {
                  const characterId = parseInt(characterItem.id);
                  const isSelected = selectedCharacterId === characterId;
                  return (
                    <button
                      key={characterItem.id}
                      onClick={() => setSelectedCharacterId(characterId)}
                      className={cn(
                        "flex flex-col items-center gap-2 rounded-lg border bg-card p-4 text-center transition-colors hover:bg-accent hover:cursor-pointer",
                        isSelected && "border-primary ring-1 ring-primary"
                      )}
                    >
                      <Avatar className="h-16 w-16">
                        {isSelected && characterDetailData && (
                          <AvatarImage
                            src={characterDetailData.character.image}
                            alt={characterDetailData.character.name}
                          />
                        )}
                        <AvatarFallback>
                          {characterItem.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {characterItem.name}
                        </p>
                        <Badge variant="secondary">
                          {characterItem.species}
                        </Badge>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Character lookup</CardTitle>
            <CardDescription>
              Fetch a single character by its ID.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CharacterLookup />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Episodes</CardTitle>
            <CardDescription>
              Browse and filter episodes, then select one for details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Episodes />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Create a post</CardTitle>
          </CardHeader>
          <CardContent>
            <CreatePost />
          </CardContent>
        </Card>

        <DragAndDrop />
      </main>
    </div>
  );
}

export default App;
