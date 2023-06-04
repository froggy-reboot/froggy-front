import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { currentArticleId, editCommentAtom } from 'src/atoms/atom';
import { patchComment, postComment } from 'src/apis/boardApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserInfo } from 'src/apis/authApi';
import { modals } from 'src/components/modals/Modals';
import { useModal } from 'src/hooks/useModal';
import defaultProfile from 'src/assets/frog_image.png';
import ToastPopup from 'src/components/toastPopup/ToastPopup';
import { ReactComponent as SendIcon } from 'src/assets/send.svg';

export default function CommandNavBar() {
  const queryClient = useQueryClient();
  const postId = useRecoilValue(currentArticleId);
  const userId = JSON.parse(localStorage.getItem('userId') || '{}');
  const editComment = useRecoilValue(editCommentAtom);
  const completeEditComment = useResetRecoilState(editCommentAtom);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setFocus,
    getValues,
    setError,
    formState: { isValid },
  } = useForm<{
    comment: string;
  }>();
  const { data } = useQuery(['user'], () => getUserInfo(userId));
  const { openModal } = useModal();
  const [toast, setToast] = useState(false);

  const { mutate: editMutation } = useMutation(patchComment, {
    onSettled: () => {
      completeEditComment();
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const { mutate: createMutation } = useMutation(postComment, {
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      queryClient.invalidateQueries({ queryKey: ['article', postId] });
    },
  });

  useEffect(() => {
    setValue('comment', editComment.content);
    if (editComment.content) {
      setFocus('comment');
    }
    if (editComment.commentId === undefined) {
      reset({ comment: '' });
    }
  }, [editComment]);

  const onSubmit: SubmitHandler<{ comment: string }> = async (data) => {
    if (!data.comment.trim()) {
      setError('comment', { type: 'trim' });
      setToast(true);
      return;
    }

    reset({ comment: '' });
    (document.activeElement as HTMLElement).blur();

    //댓글 수정
    if (editComment.commentId) {
      return editMutation({
        postId: postId,
        commentId: editComment.commentId,
        writerId: userId,
        content: data.comment,
      });
    }

    //새로운 댓글 작성
    createMutation({
      postId: postId,
      content: data.comment,
    });
  };

  const enterSubmitController = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.nativeEvent.isComposing) {
      return;
    }
    if (event.code === 'Enter' && event.shiftKey) {
      return;
    }
    if (event.code === 'Enter') {
      handleSubmit(onSubmit)();
    }
  };

  const stopEditHandler = () => {
    if (editComment.commentId && getValues('comment')) {
      openModal(modals.StopEditModal);
    }
  };

  return (
    <>
      <form
        onKeyDown={enterSubmitController}
        className="flex w-[100%] items-end px-[2.5rem] py-[1.5rem]">
        <img
          src={data?.data.profileImg ? data.data.profileImg : defaultProfile}
          alt="프로필"
          className="mr-[1rem] h-[3.2rem] w-[3.2rem] rounded-full bg-black-30 object-cover"
        />
        <textarea
          {...register('comment', {
            required: true,
          })}
          onBlur={stopEditHandler}
          className="h-[3.2rem] w-[100%] flex-1 rounded-[16px] bg-black-30 pt-[0.5rem] pl-[1.3rem] text-Body font-normal outline-none placeholder:text-black-50 focus:h-[10rem] focus:py-[1rem]"
          placeholder={
            data ? '댓글을 입력해 주세요.' : '로그인 후 이용하실 수 있습니다.'
          }
        />
        <SendIcon
          onClick={() => handleSubmit(onSubmit)()}
          fill={`${isValid ? '#65D4A5' : '#E7E7E7'}`}
          className="mt-[1.2rem] mb-[0.4rem] ml-[1rem] cursor-pointer p-[0.2rem]"
        />
      </form>
      {toast && (
        <ToastPopup
          setToast={setToast}
          message={'⚠️ 공백으로만 입력할 수 없습니다.'}
          position="top"
        />
      )}
    </>
  );
}
