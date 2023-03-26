import React, { ComponentProps, FunctionComponent, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { modalStateAtom } from 'src/atoms/atom';

export const useModal = () => {
  const [showModal, setShowModal] = useRecoilState(modalStateAtom);

  const openModal = useCallback(
    <T extends FunctionComponent<any>>(
      Component: T,
      props?: Omit<ComponentProps<T>, 'open'>,
    ) => {
      setShowModal((modals) => {
        return [...modals, { Component, props: { ...props } }];
      });
    },
    [setShowModal],
  );

  const closeModal = useCallback(
    <T extends FunctionComponent<any>>(Component: T) => {
      setShowModal((modals) =>
        modals.filter((modal) => modal.Component !== Component),
      );
    },
    [setShowModal],
  );

  return {
    showModal,
    openModal,
    closeModal,
  };
};
