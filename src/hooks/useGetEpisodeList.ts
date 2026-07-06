import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_EPISODE_LIST = gql`
  query GetEpisodeList($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`;

export interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
}

interface EpisodeListInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

interface EpisodeListData {
  episodes: {
    info: EpisodeListInfo;
    results: Episode[];
  };
}

export interface EpisodeFilter {
  name?: string;
  episode?: string;
}

export default function useGetEpisodeList(page: number, filter: EpisodeFilter) {
  return useQuery<EpisodeListData>(GET_EPISODE_LIST, {
    variables: { page, filter },
  });
}
