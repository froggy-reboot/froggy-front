import React, { Fragment } from 'react';
import { getMyNotification } from 'src/apis/mypageApi';
import Loader from 'src/components/loader/Loader';
import { useInfiniteScroll } from 'src/hooks/useInfiniteScroll';
import timeConverter from 'src/utils/timeConverter/timeConverter';

export default function MyNotification() {
  const { data, isLoading, setTarget } = useInfiniteScroll({
    getApi: getMyNotification,
    queryKey: 'notification',
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container h-real-screen">
      <main className="no-scrollbar mb-[3rem] w-full overflow-scroll">
        <ul className="flex h-full w-full flex-col">
          {/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */}
          {data?.pages.map((page: any, index) => (
            <Fragment key={page.id}>
              <li
                className={`flex w-full ${
                  page.isRead === 'Y' ? 'bg-black-10' : 'bg-white'
                } py-[0.8rem] px-[2rem]`}>
                <img
                  src={page.writerUser.profileImg}
                  className="mt-[0.5rem] h-[3.2rem] w-[3.2rem] rounded-full bg-black-30 object-cover"
                />
                <div className="ml-[0.9rem] mt-[0.9rem] flex flex-1 flex-col">
                  <div className="flex h-[1.6rem] items-center">
                    <p className="mr-auto text-Tag font-bold text-green-100">
                      {page.writerUser.nickname.length > 10
                        ? `${page.writerUser.nickname.slice(0, 10)}...`
                        : page.writerUser.nickname}

                      <span className="font-medium text-black-70">
                        님이 댓글을 남겼습니다.
                      </span>
                    </p>
                    <p className="text-Board text-black-50">
                      {timeConverter(page.createdAt)}
                    </p>
                  </div>
                  <p className="mt-[1rem] mb-[0.6rem] whitespace-pre-line text-Tag font-normal">
                    {page.content.length > 28
                      ? `${page.content.slice(0, 28)}...`
                      : page.content}
                  </p>
                  <div className="text-Tag font-normal text-black-70">
                    {page.targetTitle.length > 28
                      ? `${page.targetTitle.slice(0, 28)}...`
                      : page.targetTitle}
                  </div>
                </div>
              </li>
              {index !== data?.pages.length - 1 && (
                <hr className="w-[100%] border-black-30" />
              )}
            </Fragment>
          ))}
        </ul>
      </main>
      <div ref={setTarget} className="h-[1rem]" />
    </div>
  );
}
