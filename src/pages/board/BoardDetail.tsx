import React from 'react';
import { ReactComponent as MenuIcon } from 'src/assets/menu.svg';
import { ReactComponent as LikeIcon } from 'src/assets/empty_like.svg';
import { ReactComponent as ChatIcon } from 'src/assets/chat.svg';
import Comment from 'src/components/board/Comments';
import { useModal } from 'src/hooks/useModal';
import { modals } from 'src/components/modals/Modals';
import timeConverter from 'src/utils/timeConverter/timeConverter';

const dummy = {
  id: 11,
  writer_id: 2,
  liked: 0,
  nickname: 'synodic',
  title: '혹시 이런 뜨개질 해 보신 분 있나요.',
  content:
    '안녕하세요, 개마입니다. 어쩌고 저쩌고, field의 기본 사이즈 근데 글글이 길어지면 어어떻떻게  보보여여야야하하나나요요? 최최대대한  길길게  써써보보자자면  사사실  1000자도 넘게 쓸쓸수수있어요 네이버카페처럼말이죠! 그치만 ',
  created_at: '2023-02-27T15:15:49.695Z',
  deleted_at: 'null',
  post_type: '자유',
  fileList: [
    'https://cdn.pixabay.com/photo/2016/08/23/13/12/knitting-1614283__340.jpg',
    'https://cdn.pixabay.com/photo/2021/11/12/13/14/sweater-6788998_960_720.jpg',
    'https://cdn.pixabay.com/photo/2016/08/23/13/12/knitting-1614283__340.jpg',
    'https://cdn.pixabay.com/photo/2021/11/12/13/14/sweater-6788998_960_720.jpg',
  ],
  comment_count: 3,
};

export default function BoardDetail() {
  const { openModal } = useModal();
  return (
    <div className="container">
      <main className="w-[100%] px-[2rem]">
        <div className="mt-[2.2rem] grid grid-cols-[50px_3fr_1fr] items-center">
          <img src="" className="h-[5rem] w-[5rem] rounded-full bg-green-30" />
          <div className="ml-[15px]">
            <p className="text-Body font-bold">{dummy.nickname}</p>
            <p className="text-Board text-black-50">
              {`${timeConverter(dummy.created_at)} 작성`}
            </p>
          </div>
          <MenuIcon
            onClick={() =>
              openModal(modals.UpdateDeleteModal, {
                postId: dummy.id,
              })
            }
            className="h-[2rem] w-[2rem] justify-self-end fill-black-100"
          />
        </div>
        <article className="mt-[1.3rem]">
          <h1 className="h-[3.6rem] text-Body font-bold leading-[3.6rem]">
            <span className="tag mr-[7px]">{dummy.post_type}</span>
            {dummy.title}
          </h1>
          <p className="my-[0.5rem] text-Tag font-normal">{dummy.content}</p>
          {dummy.fileList.length > 1 && (
            <div className="my-[1.2rem] flex gap-[1rem] overflow-y-scroll">
              {dummy.fileList.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  className="h-[15rem] w-[15rem] rounded-[5px] object-cover"
                />
              ))}
            </div>
          )}
          {dummy.fileList.length === 1 && (
            <img
              src={dummy.fileList[0]}
              className="h-[19.6rem] w-[100%] rounded-[5px] object-cover"
            />
          )}
        </article>
        <p className="mt-[3px] text-Callout">
          <LikeIcon className="mr-[0.3rem] inline-block h-[1.5rem] w-[1.5rem] fill-black-50" />
          <span>{dummy.liked}</span>
          <ChatIcon className="mr-[0.3rem] ml-[0.4rem] inline-block h-[1.5rem] w-[1.5rem] fill-black-50" />
          <span>{dummy.comment_count}</span>
        </p>
        <hr className="mt-[1.4rem] w-[100%] border-black-30" />
      </main>
      <div className="mt-[1rem] mb-[3rem] w-[100%] overflow-scroll px-[3.5rem] ">
        <Comment />
      </div>
    </div>
  );
}
