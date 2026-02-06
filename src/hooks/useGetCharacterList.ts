import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_CHARACTER_LIST = gql`
  query {
    characters {
      results {
        id
        name
        species
      }
    }
  }
`;

interface Character {
  id: string;
  name: string;
  species: string;
}

interface CharacterData {
  characters: {
    results: Character[];
  };
}

export default function useGetCharacterList() {
  return useQuery<CharacterData>(GET_CHARACTER_LIST);
}
