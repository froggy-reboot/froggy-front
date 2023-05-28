import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { postReportArticle, postReportComment } from 'src/apis/boardApi';
import axios from 'axios';

interface IReportFromInput {
  content: string;
}

export default function ReportPage() {
  const reportData = useLocation().state;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<IReportFromInput>({ mode: 'all' });

  const onSubmit: SubmitHandler<IReportFromInput> = async (data) => {
    try {
      //댓글 신고
      if (reportData.commentId) {
        const response = await postReportComment({
          postId: reportData.postId,
          commentId: reportData.commentId,
          content: data.content,
        });
        if (response.status === 201) {
          alert('신고가 접수되었습니다.');
          navigate(`/board/${reportData.postId}`);
        }
      }
      //글신고
      if (!reportData.commentId) {
        const response = await postReportArticle({
          postId: reportData.postId,
          content: data.content,
        });
        if (response.status === 201) {
          alert('신고가 접수되었습니다.');
          navigate(`/board/${reportData.postId}`);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          if (reportData.commentId) {
            alert('신고할 댓글이 존재하지 않습니다.');
          } else {
            alert('신고할 게시글이 존재하지 않습니다.');
          }
        }
      }
    }
  };

  return (
    <div className="container h-real-screen px-[3rem] pb-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col justify-between gap-[2rem]">
        <div className="mt-[3rem]">
          <label
            htmlFor="content"
            className="mb-[1rem] ml-[0.5rem] inline-block text-Body font-bold">
            신고사유
          </label>
          <textarea
            id="content"
            {...register('content', {
              required: true,
              minLength: 10,
              validate: (value) => {
                return !!value.trim();
              },
            })}
            placeholder="신고 사유를 10글자 이상 입력해주세요."
            className="input h-[25rem] p-[1rem] md:h-[40rem]"
          />
        </div>
        <button
          type="submit"
          className={`submit_btn mb-[2rem] ${
            isValid ? 'bg-green-50' : 'bg-black-30'
          }`}>
          제출하기
        </button>
      </form>
    </div>
  );
}
