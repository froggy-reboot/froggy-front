import React from 'react';
import { useModal } from 'src/hooks/useModal';
import { ComponentProps, FunctionComponent } from 'react';
import UpdateDeleteModal from 'src/components/modals/UpdateDeleteModal';
import CreatePostModal from 'src/components/modals/CreatePostModal';
import ConfirmModal from 'src/components/modals/ConfirmModal';
import RavelryConnectModal from 'src/components/modals/RavelryConnectModal';
import ReportModal from 'src/components/modals/ReportModal';
import ProfileUpdateModal from 'src/components/modals/ProfileUpdateModal';

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
  RavelryConnectModal: RavelryConnectModal as FunctionComponent<
    ComponentProps<typeof RavelryConnectModal>
  >,
  ReportModal: ReportModal as FunctionComponent<
    ComponentProps<typeof ReportModal>
  >,
  ProfileUpdateModal: ProfileUpdateModal as FunctionComponent<
    ComponentProps<typeof ProfileUpdateModal>
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
