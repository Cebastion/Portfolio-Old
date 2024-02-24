'use client';
import {ChangeEvent, FC, useState} from 'react';
import style from './CreateWork.module.scss';
import {IWork} from '@/app/(admin)/interface/work.interface';
import axios from 'axios';

interface EditWorkProps {
  work: IWork;
  SetActivePopEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditWork: FC<EditWorkProps> = ({SetActivePopEdit, work}) => {
  const [Work, SetWork] = useState<IWork>(work);
  const [Preview, SetPreview] = useState<string>('');
  const [Photo, SetPhoto] = useState<File>();
  const [GetPhoto, SetGetPhoto] = useState();

  const GetPhotoFB = async () => {
    const { data } = await axios.get(`http://localhost:5500/img/28e9171570735883a48b10b8`)
    SetGetPhoto(data)
  }

  GetPhotoFB()
  const PreviewPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      SetPreview(URL.createObjectURL(e.target.files[0]));
      SetPhoto(e.target.files[0]);
    }
  };

  const CloseActivePopCreate = () => {
    SetActivePopEdit(false);
    SetPreview('');
  };

  const CreateWork = () => {
    try {
      if (Photo) {
        const formData = new FormData();
        formData.append('img', Photo);
        formData.append('title', Work.title);
        formData.append('description', Work.description);
        formData.append('url', Work.url);

        axios
          .post(`http://localhost:5500/edit_work/?_id=${Work._id}`, formData)
          .then(res => {
            SetActivePopEdit(false);
            SetPreview('');
          });
      } else {
        const formData = new FormData();
        formData.append('title', Work.title);
        formData.append('description', Work.description);
        formData.append('url', Work.url);

        axios.post(`http://localhost:5500/edit_work`, formData).then(res => {
          SetActivePopEdit(false);
          SetPreview('');
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={style.blur} onClick={CloseActivePopCreate}></div>
      <div className={style.create__block} onClick={e => e.stopPropagation()}>
        <header className={style.block__header}>
          <button className={style.header__exit} onClick={CloseActivePopCreate}>
            <svg
              width="14.510254"
              height="14.537842"
              viewBox="0 0 14.5103 14.5378"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <desc>Created with Pixso.</desc>
              <defs />
              <path
                id="Vector"
                d="M13.2551 1.25513L1.25513 13.2827"
                stroke="#9E9E9E"
                stroke-opacity="1.000000"
                stroke-width="2.500000"
                stroke-linejoin="round"
                stroke-linecap="round"
              />
              <path
                id="Vector"
                d="M1.25513 1.25513L13.2551 13.2827"
                stroke="#9E9E9E"
                stroke-opacity="1.000000"
                stroke-width="2.500000"
                stroke-linejoin="round"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <h2 className={style.header__title}>Edit Work</h2>
          <button className={style.header__create} onClick={CreateWork}>
            Save
          </button>
        </header>
        <main className={style.block__form}>
          <div className={style.form__img}>
            <span>Add image</span>
            <label>
              <input
                type="file"
                style={{display: 'none'}}
                onChange={PreviewPhoto}
              />
              <div
                className={style.add_img_block}
                style={{
                  backgroundImage: `url(${
                    Preview ? Preview : GetPhoto
                  })`,
                }}></div>
            </label>
          </div>
          <div className={style.form__title}>
            <label htmlFor="">Name:</label>
            <input
              type="text"
              value={Work.title}
              onChange={e => SetWork({...Work, title: e.target.value})}
            />
          </div>
          <div className={style.form__desc}>
            <label htmlFor="">Description:</label>
            <textarea
              value={Work.description}
              onChange={e =>
                SetWork({...Work, description: e.target.value})
              }></textarea>
          </div>
          <div className={style.form__link}>
            <label htmlFor="">Link:</label>
            <input
              type="text"
              value={Work.url}
              onChange={e => SetWork({...Work, url: e.target.value})}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default EditWork;
