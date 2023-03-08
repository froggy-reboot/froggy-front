import React, { useState } from 'react';
import { ReactComponent as MenuIcon } from 'src/assets/menu.svg';

const dummy = [
  {
    id: 0,
    profile:
      'https://cdn.pixabay.com/photo/2018/05/31/15/06/see-no-evil-3444212_960_720.jpg',
    nickname: '뿅뿅뿅뿅뿅',
    content: '네니요? 처음보는데요.....',
    date: '2023.02.27',
  },
  {
    id: 1,
    profile:
      'https://cdn.pixabay.com/photo/2018/05/31/15/06/see-no-evil-3444212_960_720.jpg',
    nickname: '뿅뿅뿅뿅뿅',
    content: '네니요? 처음보는데요.....',
    date: '2023-02-27T15:15:49.695Z',
  },
  {
    id: 2,
    profile:
      'https://cdn.pixabay.com/photo/2018/05/31/15/06/see-no-evil-3444212_960_720.jpg',
    nickname: '뿅뿅뿅뿅뿅',
    content: '네니요? 처음보는데요.....',
    date: '2023-02-27T15:15:49.695Z',
  },
  {
    id: 3,
    profile:
      'https://cdn.pixabay.com/photo/2018/05/31/15/06/see-no-evil-3444212_960_720.jpg',
    nickname: '뿅뿅뿅뿅뿅',
    content: '네니요? 처음보는데요.....',
    date: '2023-02-27T15:15:49.695Z',
  },
  {
    id: 4,
    profile:
      'https://cdn.pixabay.com/photo/2018/05/31/15/06/see-no-evil-3444212_960_720.jpg',
    nickname: '뿅뿅뿅뿅뿅',
    content: '네니요? 처음보는데요.....',
    date: '2023-02-27T15:15:49.695Z',
  },
  {
    id: 5,
    profile:
      'https://cdn.pixabay.com/photo/2018/05/31/15/06/see-no-evil-3444212_960_720.jpg',
    nickname: '뿅뿅뿅뿅뿅',
    content: '네니요? 처음보는데요.....',
    date: '2023-02-27T15:15:49.695Z',
  },
];

export default function Comment() {
  const [showMenu, setShowMenu] = useState(true);

  return (
    <ul className="flex h-[100%] flex-col gap-[0.2rem]">
      {dummy.map((comment, idx) => (
        <>
          <li key={comment.id} className="flex">
            <img
              src={comment.profile}
              className="mt-[0.5rem] h-[3.2rem] w-[3.2rem] rounded-full"
            />
            <div className="ml-[0.9rem] mt-[0.9rem] flex flex-1 flex-col">
              <div className="flex h-[1.6rem] items-center">
                <p className="mr-auto text-Tag font-bold">{comment.nickname}</p>
                <p className="text-Board text-black-50">{comment.date}</p>
                <MenuIcon
                  onClick={() => setShowMenu(!showMenu)}
                  className="h-[1.6rem] w-[1.6rem] fill-black-50"
                />
              </div>
              <p className="mt-[1rem] mb-[0.6rem] text-Tag font-normal">
                {comment.content}
              </p>
            </div>
            {showMenu && (
              <div className="absolute flex h-[6.5rem] w-[6rem] flex-col items-center justify-center gap-[0.4rem] rounded-[15px] bg-white px-[1rem] text-Tag text-black-50 drop-shadow-[0px_1px_3px_rgba(0,0,0,0.1)]">
                <button>수정</button>
                <hr className="w-[100%] border-black-30" />
                <button>삭제</button>
              </div>
            )}
          </li>
          {idx !== dummy.length - 1 && (
            <hr className="w-[100%] border-black-30" />
          )}
        </>
      ))}
    </ul>
  );
}
