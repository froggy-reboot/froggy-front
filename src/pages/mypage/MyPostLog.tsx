import React from 'react';
import { getMyPostLog } from 'src/apis/mypageApi';
import { useInfiniteScroll } from 'src/hooks/useInfiniteScroll';
import PostList from 'src/components/board/PostList';
import Loader from 'src/components/loader/Loader';

export default function MyPostLog() {
  const { data, isLoading, setTarget } = useInfiniteScroll({
    getApi: getMyPostLog,
    queryKey: 'my-post',
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {data && (
        <div className="container">
          <main className="w-[100%] px-[1.6rem] pt-[1rem]">
            <PostList props={{ data, setTarget, isMyList: true }} />
          </main>
        </div>
      )}
    </>
  );
}
