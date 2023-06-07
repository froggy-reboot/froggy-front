import React from 'react';
import { useInfiniteScroll } from 'src/hooks/useInfiniteScroll';
import { getMyCommentLog } from 'src/apis/mypageApi';
import { Link } from 'react-router-dom';
import timeConverter from 'src/utils/timeConverter/timeConverter';
import Loader from 'src/components/loader/Loader';

export default function MyCommentLog() {
  const { data, isLoading, setTarget } = useInfiniteScroll({
    getApi: getMyCommentLog,
    queryKey: 'my-comment',
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {data && (
        <div className="container">
          <main className="w-full px-[1.6rem] pt-[1rem]">
            <ul>
              {/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */}
              {data?.pages.map((page: any) => (
                <li key={page.id}>
                  <Link to={`/board/${page.articleId}`}>
                    <hr className="border-black-30" />
                    <p className="mt-[0.7rem] text-Body font-normal">
                      {page.content.length > 64
                        ? `${page.content.slice(0, 64)}...`
                        : page.content}
                    </p>
                    <div className="mt-[1.2rem] mb-[1rem] flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="mini_btn inline-block h-[1.9rem] w-[3.8rem] text-center text-BoardSub font-medium leading-[1.9rem]">
                          {page.article.articleType}
                        </span>
                        <p className="ml-[0.6rem] inline-block text-Tag font-normal text-black-50">
                          {page.article.title.length > 22
                            ? `${page.article.title.slice(0, 22)}...`
                            : page.article.title}
                        </p>
                      </div>
                      <p className="pr-[0.8rem] text-Board text-black-50">
                        {timeConverter(page.createdAt)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div ref={setTarget} className="h-[1rem]" />
          </main>
        </div>
      )}
    </>
  );
}
