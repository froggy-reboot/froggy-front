import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ReactComponent as PlusIcon } from 'src/assets/plus.svg';

interface IFormInput {
  title: string;
  content: string;
  image: FileList;
}

function BoardCreate() {
  const { register, handleSubmit, reset, formState, watch } =
    useForm<IFormInput>({
      mode: 'all',
    });

  const [imagePreview, setImagePreview] = useState(['']);
  const image = watch('image');
  const handleAddImages = (event: any) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...imagePreview];
    // console.log(imagePreview);
    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
      // console.log(image);
      // console.log(imageUrlLists);
    }
    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }
    setImagePreview(imageUrlLists);
  };

  const handleDeleteImage = (id: number) => {
    setImagePreview(imagePreview.filter((_, index) => index !== id));
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <div className="container">
      <button className="mini_btn" onClick={handleSubmit(onSubmit)}>
        제출하기
      </button>

      <div className="w-full px-[1.6rem]">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/*  */}
          <div className="mt-[2rem] flex items-center gap-[1rem]">
            <button className="mini_btn inline-block h-[4rem] w-[8.75rem] min-w-[6rem] rounded-[2rem] py-[0.5rem]">
              질문글
            </button>
            <input
              {...register('title')}
              placeholder="제목 작성란"
              className="input h-[4rem] w-full pl-[1rem] placeholder:text-black-50 focus:outline-none"
            />
          </div>

          {/* 이미지 & 게시물 */}
          <div className="relative mt-[1.5rem]">
            {/* 이미지 input */}
            {/* 이미지 추가 버튼 */}
            <label
              htmlFor="picture"
              onChange={handleAddImages}
              className="absolute top-5 right-5">
              <input
                {...register('image')}
                id="picture"
                type="file"
                multiple
                className="hidden"
                accept="image/*"
              />
              <div className="flex h-[8rem] w-[8rem] items-center justify-center rounded-[0.5rem] bg-black-30">
                <PlusIcon className=" fill-white" />
              </div>
            </label>

            {/* 게시물 작성 */}
            <textarea
              {...register('content', {
                maxLength: 15000,
              })}
              placeholder="글 작성란"
              className="input min-h-[17.5rem] w-full resize-none pl-[1rem] pt-[1rem] placeholder:text-black-50 focus:outline-none"
            />
            {/* 이미지 preview */}
            <div className="flex ">
              {imagePreview.map((image, id) => (
                <div key={id}>
                  <img src={image} className="w-[10rem]" />
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BoardCreate;