import React from 'react';
import { useModal } from 'src/hooks/useModal';
import { ComponentProps, FunctionComponent } from 'react';
import UpdateDeleteModal from 'src/components/modals/UpdateDeleteModal';
import CreatePostModal from 'src/components/modals/CreatePostModal';
import ConfirmModal from 'src/components/modals/ConfirmModal';

export const modals = {
  UpdateDeleteModal: UpdateDeleteModal as FunctionComponent<
    ComponentProps<typeof UpdateDeleteModal>
  >,
  CreatePostModal: CreatePostModal as FunctionComponent<
    ComponentProps<typeof CreatePostModal>
  >,
  ConfirmModal: ConfirmModal as FunctionComponent<
    ComponentProps<typeof ConfirmModal>
  >,
};

const Modals = () => {
  const { showModal } = useModal();

  return (
    <>
      {showModal.map(({ Component, props }, idx) => {
        return <Component key={idx} {...props} />;
      })}
    </>
  );
};

export default Modals;
