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
  image: FileList;
}

const reorder = (list: string[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const listStyle: React.CSSProperties = {
  display: 'flex',
  gap: '2rem',
  margin: '1rem',
};

function BoardCreate() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit } = useForm<IFormInput>({
    mode: 'all',
  });
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const { mutate: postArticleMutate } = useMutation(postArticles, {
    onSuccess: (data) => {
      if (data.status === 200) navigate('/board');
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
    const imageLists = event.target.files;
    if (imageLists) {
      let imageUrlLists = [...imagePreview];
      for (let i = 0; i < imageLists.length; i++) {
        const currentImageUrl = URL.createObjectURL(imageLists[i]);
        imageUrlLists.push(currentImageUrl);
      }
      if (imageUrlLists.length > 10) {
        imageUrlLists = imageUrlLists.slice(0, 10);
      }
      setImagePreview(imageUrlLists);
    }
  };

  const handleDeleteImage = (id: number) => {
    setImagePreview(imagePreview.filter((_, index) => index !== id));
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const formData = new FormData();

    for (const key of Object.keys(imagePreview)) {
      formData.append('files', data.image[Number(key)]);
    }
    formData.append('articleType', location.state);
    formData.append('liked', '0');
    formData.append('title', data.title);
    formData.append('content', data.content);

    postArticleMutate(formData);
  };

  return (
    <div className="mt-[6rem]">
      <div className="container">
        <button className="mini_btn" onClick={handleSubmit(onSubmit)}>
          제출하기
        </button>

        <div className="w-full px-[1.6rem]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-[2rem] flex items-center gap-[1rem]">
              <button className="mini_btn inline-block h-[4rem] w-[8.75rem] min-w-[6rem] rounded-[2rem] py-[0.5rem]">
                {location.state}
              </button>
              <input
                {...register('title')}
                placeholder="제목 작성란"
                className="input h-[4rem] w-full pl-[1rem] placeholder:text-black-50 focus:outline-none"
              />
            </div>
            <div className="relative mt-[1.5rem]">
              <label htmlFor="picture" className="absolute top-5 right-5">
                <input
                  {...register('image')}
                  id="picture"
                  type="file"
                  multiple
                  className="hidden"
                  accept="image/*"
                  onChange={handleAddImages}
                />
                <div className="flex h-[8rem] w-[8rem] items-center justify-center rounded-[0.5rem] bg-black-30">
                  <PlusIcon className=" fill-white" />
                </div>
              </label>
              <textarea
                {...register('content', {
                  maxLength: 15000,
                })}
                placeholder="글 작성란"
                className="input min-h-[17.5rem] w-full resize-none pl-[1rem] pt-[1rem] placeholder:text-black-50 focus:outline-none"
              />
              <DragDropContext onDragEnd={onDragEnd}>
                <div className="mt-[1rem] flex gap-[1rem]">
                  <Droppable droppableId="hello" direction="horizontal">
                    {(droppableProvided) => (
                      <div
                        ref={droppableProvided.innerRef}
                        {...droppableProvided.droppableProps}
                        style={listStyle}>
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
                                  className="relative">
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
                      </div>
                    )}
                  </Droppable>
                </div>
              </DragDropContext>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BoardCreate;
