import React from 'react';
import { useModal } from 'src/hooks/useModal';
import { modals } from 'src/components/modals/Modals';
import { Link } from 'react-router-dom';

export default function ReportModal() {
  const { closeModal } = useModal();
  return (
    <div
      className="modal_bg items-end"
      onClick={() => closeModal(modals.ReportModal)}>
      <div className="modal_under">
        <Link to="/report" className="modal_under_btn text-center">
          신고하기
        </Link>
        <hr className="w-[100%] border-black-30" />
        <button
          className="modal_under_btn"
          onClick={() => closeModal(modals.ReportModal)}>
          취소
        </button>
      </div>
    </div>
  );
}
