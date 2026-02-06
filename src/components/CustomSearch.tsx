import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";
import { useState } from "react";
import { mergeSortedArrays } from "../utils/mergeSortedArray";

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
    <div>
      <input
        type="text"
        placeholder="search"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          getLocations({ variables: { name: e.target.value } });
        }}
      />
      <div>
        {data?.characters.results.map((characterItem) => (
          <div key={characterItem.location.id}>
            <p>{characterItem.location.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
