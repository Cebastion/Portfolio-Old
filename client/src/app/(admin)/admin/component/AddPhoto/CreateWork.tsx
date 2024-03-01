'use client';
import {ChangeEvent, FC, useState} from 'react';
import style from './CreateWork.module.scss';
import axios from 'axios';
import {randomBytes} from 'crypto';

interface CreateWorkProps {
  SetActivePopCreate: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddPhoto: FC<CreateWorkProps> = ({SetActivePopCreate}) => {
  const [Preview, SetPreview] = useState<string>('');
  const [Photo, SetPhoto] = useState<File>();

  const PreviewPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      SetPreview(URL.createObjectURL(e.target.files[0]));
      SetPhoto(e.target.files[0]);
    }
  };

  const CloseActivePopCreate = () => {
    SetActivePopCreate(false);
    SetPreview('');
  };

  const CreateWork = async () => {
    try {
      if (Photo) {
        const _id = randomBytes(12).toString('hex');
        const formdata = new FormData();
        formdata.append('img', Photo);
        await axios
          .post(`http://localhost:5500/save_photo/${_id}`, formdata)
          .then(res => {
            SetActivePopCreate(false);
            SetPreview('');
            window.location.reload()
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
          <h2 className={style.header__title}>Add Skill</h2>
          <button className={style.header__create} onClick={CreateWork}>
            Add
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
                style={{backgroundImage: `url(${Preview})`}}></div>
            </label>
          </div>
        </main>
      </div>
    </>
  );
};

export default AddPhoto;