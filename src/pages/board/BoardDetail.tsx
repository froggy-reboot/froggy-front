import React, { useEffect } from 'react';
import { ReactComponent as MenuIcon } from 'src/assets/menu.svg';
import { ReactComponent as LikeIcon } from 'src/assets/thumb.svg';
import { ReactComponent as LikeIconActive } from 'src/assets/thumbActive.svg';
import { ReactComponent as ChatIcon } from 'src/assets/chat.svg';
import Comment from 'src/components/board/Comments';
import { useModal } from 'src/hooks/useModal';
import { modals } from 'src/components/modals/Modals';
import timeConverter from 'src/utils/timeConverter/timeConverter';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getArticleDetail, postLike } from 'src/apis/boardApi';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from 'src/components/loader/Loader';
import { useSetRecoilState } from 'recoil';
import { currentArticleId } from 'src/atoms/atom';
import { LOGIN } from 'src/pages/signin/SignInConstants';
import defaultProfile from 'src/assets/frog_image.png';

export interface IArticleDetail {
  data: {
    id: number;
    writerId: number;
    articleType: string;
    liked: number;
    title: string;
    content: string;
    createdAt: string;
    deletedAt: null | string;
    images: [
      {
        url: string;
      },
    ];
    commentCount: number;
    user: {
      writerNickname: string;
      writerProfileImg: string;
    };
    likedByUser: boolean;
  };
}

export default function BoardDetail() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { openModal } = useModal();
  const { postId } = useParams() as { postId: string };
  const setPostId = useSetRecoilState(currentArticleId);
  const userId = localStorage.getItem('userId') as string;
  const { isLoading, data } = useQuery<IArticleDetail>(
    ['article', postId],
    () => getArticleDetail(postId),
  );

  useEffect(() => {
    setPostId(Number(postId));
  }, [postId]);

  if (isLoading) {
    return <Loader />;
  }

  const likeHandler = async () => {
    try {
      const response = await postLike(Number(postId));
      if (response.status === 201) {
        queryClient.invalidateQueries({ queryKey: ['article', postId] });
        queryClient.invalidateQueries({ queryKey: ['articles'] });
      }
    } catch (error) {
      alert(LOGIN.MESSAGE.ETC);
    }
  };

  const imageDetailHandler = (imageIndex: number) => {
    navigate(`/board/images/${postId}`, {
      state: { images: data?.data.images, index: imageIndex },
    });
  };

  return (
    <>
      {data && (
        <div className="container">
          <main className="w-[100%] px-[2rem]">
            <div className="mt-[2.2rem] grid grid-cols-[50px_3fr_1fr] items-center">
              <img
                src={data ? data.data.user.writerProfileImg : defaultProfile}
                className="h-[5rem] w-[5rem] rounded-full bg-black-30 object-cover"
              />
              <div className="ml-[15px]">
                <p className="text-Body font-bold">
                  {data.data.user.writerNickname}
                </p>
                <p className="text-Board text-black-50">
                  {`${timeConverter(data?.data.createdAt)} 작성`}
                </p>
              </div>
              <MenuIcon
                onClick={() =>
                  Number(userId) === data.data.writerId
                    ? openModal(modals.UpdateDeleteModal, {
                        postId: Number(postId),
                      })
                    : openModal(modals.ReportModal, { postId: Number(postId) })
                }
                className="h-[4rem] w-[4rem] cursor-pointer justify-self-end fill-black-100 p-[1rem]"
              />
            </div>
            <article className="mt-[1.3rem]">
              <h1 className="h-[3.6rem] text-Body font-bold leading-[3.6rem]">
                <span className="tag mr-[7px]">{data?.data.articleType}</span>
                {data?.data.title}
              </h1>
              <p className="my-[0.5rem] whitespace-pre-line text-Tag font-normal">
                {data?.data.content}
              </p>
              {data.data.images.length > 1 && (
                <div className="no-scrollbar my-[1.2rem] flex gap-[1rem] overflow-y-scroll">
                  {data.data.images.map((src, idx) => (
                    <img
                      onClick={() => imageDetailHandler(idx)}
                      key={idx}
                      src={src.url}
                      className="h-[15rem] w-[15rem] cursor-pointer rounded-[5px] object-cover"
                    />
                  ))}
                </div>
              )}
              {data.data.images.length === 1 && (
                <img
                  onClick={() => imageDetailHandler(0)}
                  src={data.data.images[0].url}
                  className="h-[19.6rem] w-[100%] cursor-pointer rounded-[5px] object-cover md:h-[35rem]"
                />
              )}
            </article>
            <p className="mt-[1.2rem] text-Tag font-normal">
              {data.data.likedByUser ? (
                <LikeIconActive
                  onClick={likeHandler}
                  className="mr-[0.3rem] inline-block h-[2.4rem] w-[2.4rem] cursor-pointer"
                />
              ) : (
                <LikeIcon
                  onClick={likeHandler}
                  className="mr-[0.3rem] inline-block h-[2.4rem] w-[2.4rem] cursor-pointer"
                />
              )}
              <span>{data?.data.liked}</span>
              <ChatIcon className="mr-[0.3rem] ml-[0.8rem] inline-block h-[2.4rem] w-[2.4rem] fill-black-50" />
              <span>{data?.data.commentCount}</span>
            </p>
            <hr className="mt-[1.4rem] w-[100%] border-black-30" />
          </main>
          <div className="no-scrollbar mt-[1rem] mb-[3rem] w-[100%] overflow-scroll px-[3.5rem]">
            <Comment articleId={data.data.id} />
          </div>
        </div>
      )}
    </>
  );
}
