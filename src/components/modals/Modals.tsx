import React from 'react';
import { useModal } from 'src/hooks/useModal';
import { ComponentProps, FunctionComponent } from 'react';
import UpdateDeleteModal from 'src/components/modals/UpdateDeleteModal';
import CreatePostModal from 'src/components/modals/CreatePostModal';
import ConfirmModal from 'src/components/modals/ConfirmModal';
import RavelryConnectModal from 'src/components/modals/RavelryConnectModal';
import ReportModal from 'src/components/modals/ReportModal';
import StopEditModal from 'src/components/modals/StopEditModal';
import WithdrawModal from 'src/components/modals/WithdrawModal';
import WithdrawConfirmModal from 'src/components/modals/WithdrawConfirmModal';
import ProfileUpdateModal from 'src/components/modals/ProfileUpdateModal';
import NotificationModal from 'src/components/modals/NotificationModal';

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
  StopEditModal: StopEditModal as FunctionComponent<
    ComponentProps<typeof ReportModal>
  >,
  WithdrawModal: WithdrawModal as FunctionComponent<
    ComponentProps<typeof WithdrawModal>
  >,
  WithdrawConfirmModal: WithdrawConfirmModal as FunctionComponent<
    ComponentProps<typeof WithdrawConfirmModal>
  >,
  ProfileUpdateModal: ProfileUpdateModal as FunctionComponent<
    ComponentProps<typeof ProfileUpdateModal>
  >,
  NotificationModal: NotificationModal as FunctionComponent<
    ComponentProps<typeof NotificationModal>
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
