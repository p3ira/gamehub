import ms from 'ms'
import { useInfiniteQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client.ts";
import { Platform } from "./usePlatforms.ts";
import useGameQueryStore from "../store.ts";

const apiClient = new APIClient<Game>('/games')

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: {platform: Platform}[];
    metacritic: number;
    rating_top: number;
}
const useGames = () => {
    const gameQuery = useGameQueryStore(s => s.gameQuery);

    return useInfiniteQuery<FetchResponse<Game>, Error>({
        queryKey: ['games', gameQuery],
        queryFn: ({ pageParam = 1}) => apiClient.getAll({
           params: {
                genres: gameQuery.genreId,
                parent_platforms: gameQuery.platformId,
                ordering: gameQuery.sortOrder,
                search: gameQuery.searchText,
                page: pageParam,
            }, 
        }),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.next ? allPages.length + 1 : undefined;
        },
        initialPageParam: 1,
        staleTime: ms('24h')
    })
}

export default useGames