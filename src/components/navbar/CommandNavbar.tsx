import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { currentArticleId } from 'src/atoms/atom';
import { postComment } from 'src/apis/boardApi';
import axios from 'axios';

export default function CommandNavBar() {
  const postId = useRecoilValue(currentArticleId);
  const { register, handleSubmit, reset } = useForm<{
    comment: string;
  }>();

  const onSubmit: SubmitHandler<{ comment: string }> = async (data) => {
    (document.activeElement as HTMLElement).blur();
    reset({ comment: '' });
    try {
      await postComment(postId, data.comment);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          alert('빈 댓글은 작성할 수 없습니다.');
        }
      }
    }
  };

  const enterSubmitController = (
    event: React.KeyboardEvent<HTMLImageElement>,
  ) => {
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
    <form
      onKeyDown={() => enterSubmitController}
      className="flex w-[100%] px-[2.5rem] py-[1.5rem]">
      <img
        src={''}
        alt="프로필"
        className="mr-[1rem] h-[3.2rem] w-[3.2rem] rounded-full bg-green-10"
      />
      <textarea
        {...register('comment', { required: true })}
        className="h-[3rem] w-[100%] rounded-[15px] bg-black-30 pt-[0.5rem] pl-[1.3rem] text-Tag font-normal outline-none placeholder:text-black-50 focus:h-[10rem] focus:py-[1rem]"
        placeholder="댓글을 입력해 주세요."
      />
    </form>
  );
}
