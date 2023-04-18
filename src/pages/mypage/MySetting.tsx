import React, { Fragment } from 'react';
import { MENULIST } from 'src/pages/mypage/MypageConstants';

export default function MySetting() {
  return (
    <div className="container">
      <ul className="flex w-full flex-col gap-[12px] p-[3.5rem]">
        {MENULIST.map((menu, idx) => (
          <Fragment key={idx}>
            <li className="pl-[8px] text-[15px] font-medium">{menu}</li>
            {idx !== MENULIST.length - 1 && (
              <hr className="w-full border-black-30" />
            )}
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
