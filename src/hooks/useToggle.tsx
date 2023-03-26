import React, { useState } from 'react';

export const useToggle = (initial: boolean) => {
  const [isShow, setIsShow] = useState(initial);

  const onClickHandler = () => {
    setIsShow(!isShow);
  };

  return [isShow, onClickHandler] as const;
};
