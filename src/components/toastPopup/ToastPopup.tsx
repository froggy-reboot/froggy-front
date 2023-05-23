import React, { useEffect } from 'react';

export default function ToastPopup({
  message,
  setToast,
}: {
  message: string;
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <div className="absolute bottom-[3rem] z-20 flex h-[4rem] w-[90%] max-w-[73rem] translate-x-[-50%] animate-toast items-center justify-center rounded-[1rem] bg-green-50 opacity-80 shadow-[0px_2px_8px_rgba(0,0,0,0.25)]">
      <p className="text-Body text-white">{message}</p>
    </div>
  );
}
