import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { currentArticleId, editCommentAtom } from 'src/atoms/atom';
import { patchComment, postComment } from 'src/apis/boardApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserInfo } from 'src/apis/authApi';

export default function CommandNavBar() {
  const queryClient = useQueryClient();
  const postId = useRecoilValue(currentArticleId);
  const userId = JSON.parse(localStorage.getItem('userId') || '{}');
  const editComment = useRecoilValue(editCommentAtom);
  const completeEditComment = useResetRecoilState(editCommentAtom);
  const { register, handleSubmit, reset, setValue, setFocus } = useForm<{
    comment: string;
  }>();
  const { data } = useQuery(['user'], () => getUserInfo(userId));

  const { mutate: editMutation } = useMutation(patchComment, {
    onSettled: () => {
      completeEditComment();
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const { mutate: createMutation } = useMutation(postComment, {
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  useEffect(() => {
    setValue('comment', editComment.content);
    if (editComment.content) {
      setFocus('comment');
    }
  }, [editComment]);

  const onSubmit: SubmitHandler<{ comment: string }> = async (data) => {
    (document.activeElement as HTMLElement).blur();
    reset({ comment: '' });

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

  return (
    <>
      {data && (
        <form
          onKeyDown={enterSubmitController}
          className="flex w-[100%] px-[2.5rem] py-[1.5rem]">
          <img
            src={data.data.profileImg}
            alt="프로필"
            className="mr-[1rem] h-[3.2rem] w-[3.2rem] rounded-full bg-green-10 object-cover"
          />
          <textarea
            {...register('comment', { required: true })}
            className="h-[3rem] w-[100%] flex-1 rounded-[15px] bg-black-30 pt-[0.5rem] pl-[1.3rem] text-Tag font-normal outline-none placeholder:text-black-50 focus:h-[10rem] focus:py-[1rem]"
            placeholder="댓글을 입력해 주세요."
          />
        </form>
      )}
    </>
  );
}
