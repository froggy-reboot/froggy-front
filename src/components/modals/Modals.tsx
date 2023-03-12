import React from 'react';
import { useModal } from 'src/hooks/useModal';
import { ComponentProps, FunctionComponent } from 'react';
import UpdateDeleteModal from 'src/components/modals/UpdateDeleteModal';

export const modals = {
  UpdateDeleteModal: UpdateDeleteModal as FunctionComponent<
    ComponentProps<typeof UpdateDeleteModal>
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
