import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";
import { useState } from "react";
import { mergeSortedArrays } from "../utils/mergeSortedArray";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const GET_LOCATIONS = gql`
  query GetLocations($name: String!) {
    characters(filter: { name: $name }) {
      results {
        location {
          id
          name
        }
      }
    }
  }
`;

interface Location {
  location: {
    id: string;
    name: string;
  };
}

interface LocationData {
  characters: {
    results: Location[];
  };
}

export default function CustomSearch() {
  const [getLocations, { data }] = useLazyQuery<LocationData>(GET_LOCATIONS);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(mergeSortedArrays([1, 3, 5, 7, 9, 11], [2, 4, 6], 3, 3));
  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Search by character name..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          getLocations({ variables: { name: e.target.value } });
        }}
        className="max-w-sm"
      />
      {!!data?.characters.results.length && (
        <div className="flex flex-wrap gap-2">
          {data.characters.results.map((characterItem, index) => (
            <Badge key={`${characterItem.location.id}-${index}`} variant="outline">
              {characterItem.location.name}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
