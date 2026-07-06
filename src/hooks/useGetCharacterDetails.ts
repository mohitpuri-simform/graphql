import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_CHARACTER_DETAILS = gql`
  query GetCharacterDetail($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
      origin {
        name
      }
      location {
        name
      }
    }
  }
`;

interface CharacterDetail {
  id: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: {
    name: string;
  } | null;
  location: {
    name: string;
  } | null;
}

interface CharacterDetailData {
  character: CharacterDetail;
}

export default function useGetCharacterDetails(id: number | null) {
  return useQuery<CharacterDetailData>(GET_CHARACTER_DETAILS, {
    variables: {
      id: id,
    },
    skip: !id || id === 0,
  });
}
