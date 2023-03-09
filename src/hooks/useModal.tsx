import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { modalStateAtom } from 'src/atoms/atom';

export const useModal = () => {
  const [showModal, setShowModal] = useRecoilState(modalStateAtom);

  const openModal = useCallback(() => {
    setShowModal(true);
  }, [setShowModal]);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  return {
    showModal,
    openModal,
    closeModal,
  };
};
