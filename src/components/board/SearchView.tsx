import React from 'react';
import { ReactComponent as SearchIcon } from 'src/assets/search.svg';

export default function SearchView() {
  return (
    <div className="mt-[14rem] flex flex-col items-center justify-center">
      <SearchIcon className="h-[4rem] w-[4rem]" />
      <p className="text-Tag text-black-50">검색어를 입력하세요.</p>
    </div>
  );
}
