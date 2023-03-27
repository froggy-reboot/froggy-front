import React from 'react';

export default function ConfirmModal() {
  return (
    <div className="modal_bg">
      <div className="flex h-[12.5rem] w-[32rem] flex-col items-center justify-center gap-[15px] rounded-[10px] bg-white text-Link shadow-[1px_2px_5px_rgba(0,0,0,0.2)] ">
        <p className="font-medium">정말로 삭제하시겠습니까?</p>
        <div className="flex gap-[25px] font-bold">
          <button className="h-[3.5rem] w-[9.5rem] rounded-[20px] bg-green-30 text-white">
            삭제
          </button>
          <button className="h-[3.5rem] w-[9.5rem] rounded-[20px] bg-black-10">
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
