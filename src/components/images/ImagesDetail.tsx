import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as CloseBtn } from 'src/assets/plus.svg';
import { ReactComponent as Arrow } from 'src/assets/back.svg';

interface IImageList {
  images: { id: number; order: number; url: string }[];
  index: number;
}

export default function ImagesDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const imageList: IImageList = location.state;
  const [current, setCurrent] = useState(imageList.index);

  const closeBtnHandler = () => {
    navigate(-1);
  };

  const nextHandler = () => {
    setCurrent(() => {
      if (current === imageList.images.length - 1) {
        return 0;
      } else {
        return current + 1;
      }
    });
  };

  const prevHandler = () => {
    setCurrent(() => {
      if (current === 0) {
        return imageList.images.length - 1;
      } else {
        return current - 1;
      }
    });
  };

  return (
    <div className="relative flex h-[100vh] w-full items-center bg-black-100">
      <CloseBtn
        onClick={closeBtnHandler}
        className="absolute top-10 right-10 z-[100] h-[3.5rem] w-[3.5rem] rotate-45 fill-black-10"
      />
      <img
        key={imageList.images[current].id}
        src={imageList.images[current].url}
        className="max-h-[60%] w-full object-cover"
      />
      <button
        onClick={nextHandler}
        className="absolute right-4 flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-black-10 opacity-50">
        <Arrow className="h-[2.5rem] rotate-180 stroke-black-50" />
      </button>
      <button
        onClick={prevHandler}
        className="absolute left-4 flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-black-10 opacity-50">
        <Arrow className="h-[2.5rem]" />
      </button>
      <ul className="absolute bottom-20 flex w-full justify-center gap-4">
        {imageList.images.map((_, idx) => (
          <li
            key={idx}
            className={`h-[1.2rem] w-[1.2rem] rounded-full bg-white ${
              idx === current ? 'opacity-100' : 'opacity-50'
            }`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </ul>
    </div>
  );
}
