import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_CHARACTER_DETAILS = gql`
  query GetCharacterDetail($id: ID!) {
    character(id: $id) {
      name
      image
    }
  }
`;

interface CharacterDetail {
  name: string;
  image: string;
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
