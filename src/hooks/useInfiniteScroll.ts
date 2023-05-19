import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useIntersectionObserver } from 'src/hooks/useIntersectionObserver';
import { IFilter } from 'src/pages/board/BoardMain';

interface IInfiniteScrollProps {
  filter?: IFilter;
  getApi: (
    {
      pageParam,
    }: {
      pageParam?: number | undefined;
    },
    filter?: IFilter,
  ) => Promise<AxiosResponse>;
}

export const useInfiniteScroll = ({ getApi, filter }: IInfiniteScrollProps) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    AxiosResponse,
    AxiosError
  >(
    ['articles', filter],
    ({ pageParam = 1 }) => getApi({ pageParam }, filter),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.data.length === 0 ? undefined : nextPage;
      },
      select: (data) => ({
        pages: data?.pages.flatMap((page) => page.data),
        pageParams: data.pageParams,
      }),
    },
  );

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  return { data, isLoading, setTarget };
};
