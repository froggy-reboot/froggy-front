import React, { useEffect, useState } from 'react';
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
import { patchArticles, postArticles } from 'src/apis/boardApi';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import Loader from 'src/components/loader/Loader';
interface IFormInput {
  title: string;
  content: string;
}

interface IReorder {
  <T>(list: T[], startIndex: number, endIndex: number): T[];
}

interface IEditImageList {
  type: 'existing' | 'new';
  id?: number;
  imgUrl?: string;
  file?: File;
}

const reorder: IReorder = (list, startIndex, endIndex) => {
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

function BoardCreate() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const editPagePath = useMatch('/board/edit/:postId');
  const { register, handleSubmit, setValue } = useForm<IFormInput>({
    mode: 'all',
  });
  const [imageList, setImageList] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [imageEdit, setImageEdit] = useState<IEditImageList[]>([]);
  const [deleteImageArr, setDeleteImageArr] = useState<number[]>([]);

  const { mutate: postArticleMutate } = useMutation(postArticles, {
    onSuccess: (data) => {
      if (data.status === 201) navigate(`/board/${data.data.id}`);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['articles'] }),
  });

  const { mutate: patchArticleMutate, isLoading } = useMutation(patchArticles, {
    onSuccess: (data) => {
      if (data.status === 200) navigate(`/board/${data.data.id}`);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['articles'] }),
  });

  useEffect(() => {
    if (editPagePath) {
      setImagePreview(() => {
        return location.state.images.map((image: { url: string }) => image.url);
      });
      setImageEdit(() => {
        return location.state.images.map(
          (image: { url: string; id: number }) => ({
            imgUrl: image.url,
            id: image.id,
            type: 'existing',
          }),
        );
      });
      setValue('title', location.state.title);
      setValue('content', location.state.content);
    }
  }, []);

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
    setImageList((items) => reorder(items, source.index, destination.index));
    setImageEdit((items) => reorder(items, source.index, destination.index));
  };

  const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    //새로추가된 리스트
    const imageFileList = event.target.files;
    if (imageFileList) {
      //추가된 파일을 배열로 변경
      const imageListArr = Array.from(imageFileList);

      //프리뷰 리스트
      let imageUrlLists = [...imagePreview];
      //이미지 리스트
      const imageListCopy = [...imageList];
      //이미지 수정 리스트
      const imageEditCopy = [...imageEdit];

      //새로들어온 사진을 기존 리스트에 추가
      for (let i = 0; i < imageListArr.length; i++) {
        const currentImageUrl = URL.createObjectURL(imageListArr[i]);
        imageUrlLists.push(currentImageUrl);
        imageListCopy.push(imageListArr[i]);
        imageEditCopy.push({ type: 'new', file: imageListArr[i] });
      }

      //사진은 10개까지 추가가능
      if (imageUrlLists.length > 10) {
        imageUrlLists = imageUrlLists.slice(0, 10);
      }
      setImagePreview(imageUrlLists);
      setImageList(imageListCopy);
      setImageEdit(imageEditCopy);
    }
  };

  const handleDeleteImage = (id: number) => {
    setImagePreview(imagePreview.filter((_, index) => index !== id));
    setImageList(imageList.filter((_, index) => index !== id));
    setImageEdit(imageEdit.filter((_, index) => index !== id));
    if (imageEdit[id].type === 'existing') {
      setDeleteImageArr((prev) => [...prev, imageEdit[id].id as number]);
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (!editPagePath) {
      const formData = new FormData();

      for (const file of imageList) {
        formData.append('files', file);
      }
      formData.append('articleType', location.state);
      formData.append('title', data.title);
      formData.append('content', data.content);

      postArticleMutate(formData);
    }

    if (editPagePath) {
      const formData = new FormData();
      for (const file of imageList.reverse()) {
        formData.append('files', file);
      }

      if (deleteImageArr.length === 1) {
        formData.append('deleteImageIdList[0]', String(deleteImageArr[0]));
      } else if (deleteImageArr.length > 1) {
        for (const delFile of deleteImageArr) {
          formData.append('deleteImageIdList', String(delFile));
        }
      }

      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('photoOrderList', JSON.stringify(imageEdit));

      patchArticleMutate({ formData: formData, postId: location.state.id });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <button
        className="mini_btn absolute right-[12px] top-[12.5px] z-[10] h-[3.5rem] w-[7.6rem] rounded-[2rem] text-Body"
        onClick={handleSubmit(onSubmit)}>
        {editPagePath ? '수정하기' : '업로드'}
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full px-[2rem]">
        <div className="mt-[2rem] flex items-center gap-[1rem]">
          <button className="tag h-[3.6rem] w-[6rem] shrink-0 rounded-[2rem] py-[0.5rem] text-Tag">
            {editPagePath
              ? `${location.state.articleType}글`
              : `${location.state}글`}
          </button>
          <input
            {...register('title', { required: true, maxLength: 28 })}
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
