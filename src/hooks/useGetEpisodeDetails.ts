import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_EPISODE_DETAILS = gql`
  query GetEpisodeDetails($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        id
        name
        image
      }
    }
  }
`;

interface EpisodeCharacter {
  id: string;
  name: string;
  image: string;
}

interface EpisodeDetail {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: EpisodeCharacter[];
}

interface EpisodeDetailData {
  episode: EpisodeDetail;
}

export default function useGetEpisodeDetails(id: string | null) {
  return useQuery<EpisodeDetailData>(GET_EPISODE_DETAILS, {
    variables: { id },
    skip: !id,
  });
}
