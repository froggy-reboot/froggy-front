import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ReactComponent as PlusIcon } from 'src/assets/plus.svg';
import { ReactComponent as Delete } from 'src/assets/delete.svg';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postArticles } from 'src/apis/boardApi';
import { useLocation, useNavigate } from 'react-router-dom';

interface IFormInput {
  title: string;
  content: string;
}

const reorder = (list: string[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

function BoardCreate() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit } = useForm<IFormInput>({
    mode: 'all',
  });
  const [imageList, setImageList] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const { mutate: postArticleMutate } = useMutation(postArticles, {
    onSuccess: (data) => {
      if (data.status === 201) navigate(`/board/${data.data.id}`);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['articles'] }),
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    // 드롭이 droppable 밖에서 일어났을 경우 바로 return
    if (!destination) return;
    // 드래그가 발생한 위치와 드롭이 발생한 위치가 같을 경우 바로 return
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    setImagePreview((items) => reorder(items, source.index, destination.index));
  };

  const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFileList = event.target.files;
    if (imageFileList) {
      const imageListArr = Array.from(imageFileList);
      let imageUrlLists = [...imagePreview];
      const imageListCopy = [...imageList];
      for (let i = 0; i < imageListArr.length; i++) {
        const currentImageUrl = URL.createObjectURL(imageListArr[i]);
        imageUrlLists.push(currentImageUrl);
        imageListCopy.push(imageListArr[i]);
      }
      if (imageUrlLists.length > 10) {
        imageUrlLists = imageUrlLists.slice(0, 10);
      }
      setImagePreview(imageUrlLists);
      setImageList(imageListCopy);
    }
  };

  const handleDeleteImage = (id: number) => {
    setImagePreview(imagePreview.filter((_, index) => index !== id));
    setImageList(imageList.filter((_, index) => index !== id));
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const formData = new FormData();

    for (const file of imageList) {
      formData.append('files', file);
    }
    formData.append('articleType', location.state);
    formData.append('liked', '0');
    formData.append('title', data.title);
    formData.append('content', data.content);

    postArticleMutate(formData);
  };

  return (
    <div className="container">
      <button
        className="mini_btn absolute right-[12px] top-[12.5px] z-[10] h-[3.5rem] w-[7.6rem] rounded-[2rem] text-Body"
        onClick={handleSubmit(onSubmit)}>
        업로드
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full px-[2rem]">
        <div className="mt-[2rem] flex items-center gap-[1rem]">
          <button className="tag h-[3.6rem] w-[6rem] shrink-0 rounded-[2rem] py-[0.5rem] text-Tag">
            {`${location.state}글`}
          </button>
          <input
            {...register('title', { required: true })}
            placeholder="게시글 제목"
            className="input h-[3.6rem] w-full pl-[1rem] text-[15px] font-bold placeholder:text-black-50 focus:outline-none"
          />
        </div>
        <div className="relative mt-[1.5rem]">
          <textarea
            {...register('content', {
              required: true,
              maxLength: 15000,
            })}
            placeholder="최대 15000자까지 입력할 수 있습니다."
            className="input min-h-[17.5rem] w-full resize-none pl-[1rem] pt-[1rem] text-[15px] font-medium placeholder:text-black-50 focus:outline-none"
          />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="imageList" direction="horizontal">
              {(droppableProvided) => (
                <div
                  className="no-scrollbar mt-[1rem] flex w-auto gap-[2rem] overflow-auto"
                  ref={droppableProvided.innerRef}
                  {...droppableProvided.droppableProps}>
                  {imagePreview &&
                    imagePreview.map((image, id) => (
                      <Draggable
                        key={id}
                        draggableId={id.toString()}
                        index={id}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            className="relative shrink-0">
                            <Delete
                              className="absolute -top-4 -right-4"
                              onClick={() => handleDeleteImage(id)}
                            />
                            <img src={image} className="thumbnail_img" />
                            {droppableProvided.placeholder}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  <label htmlFor="picture">
                    <input
                      id="picture"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleAddImages}
                    />
                    <div className="flex h-[7rem] w-[7rem] items-center justify-center rounded-[1rem] bg-black-10">
                      <PlusIcon className=" fill-white" />
                    </div>
                  </label>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </form>
    </div>
  );
}

export default BoardCreate;
