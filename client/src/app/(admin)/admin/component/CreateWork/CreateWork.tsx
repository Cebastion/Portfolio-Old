'use client'
import { ChangeEvent, FC, useState } from 'react'
import style from './CreateWork.module.scss'
import { IWork } from '@/app/(admin)/interface/work.interface'
import { AdminService } from '@/app/(admin)/service/admin.service'
import axios from 'axios'
import { randomBytes } from 'crypto'

interface CreateWorkProps {
    SetActivePopCreate: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateWork: FC<CreateWorkProps> = ({ SetActivePopCreate }) => {
   const work: IWork = {
    _id: '',
    title: '',
    description: '',
    url: '',
    img: '' 
    }
  const [Work, SetWork] = useState<IWork>(work)
  const [Preview, SetPreview] = useState<string>('')
  const [Photo, SetPhoto] = useState<File>()

  const PreviewPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      SetPreview(URL.createObjectURL(e.target.files[0]))
      SetPhoto(e.target.files[0])
    }
  }

  const CloseActivePopCreate = () => {
    SetActivePopCreate(false)
    SetWork(work)
    SetPreview('')
  }

  const CreateWork = async () => {
    try {
      if(Photo) {
          Work._id = randomBytes(12).toString('hex')
          const formdata = new FormData()
          formdata.append('_id', Work._id)
          formdata.append('img', Photo)
          formdata.append('title', Work.title)
          formdata.append('description', Work.description)
          formdata.append('url', Work.url)
          await axios.post(`http://localhost:5500/add_work`, formdata).then(res => {
              SetActivePopCreate(false)
          SetWork(work)
          SetPreview('')
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className={style.blur} onClick={CloseActivePopCreate}></div>
      <div className={style.create__block} onClick={(e) => e.stopPropagation()}>
        <header className={style.block__header}>
          <button className={style.header__exit} onClick={CloseActivePopCreate}>
            <svg width="14.510254" height="14.537842" viewBox="0 0 14.5103 14.5378" fill="none" xmlns="http://www.w3.org/2000/svg">
              <desc>
                Created with Pixso.
              </desc>
              <defs />
              <path id="Vector" d="M13.2551 1.25513L1.25513 13.2827" stroke="#9E9E9E" stroke-opacity="1.000000" stroke-width="2.500000" stroke-linejoin="round" stroke-linecap="round" />
              <path id="Vector" d="M1.25513 1.25513L13.2551 13.2827" stroke="#9E9E9E" stroke-opacity="1.000000" stroke-width="2.500000" stroke-linejoin="round" stroke-linecap="round" />
            </svg>

          </button>
          <h2 className={style.header__title}>
            Create Work
          </h2>
          <button className={style.header__create} onClick={CreateWork}>
            Create
          </button>
        </header>
        <main className={style.block__form}>
          <div className={style.form__img}>
            <span>Add image</span>
            <label>
              <input type="file" style={{ display: 'none' }} onChange={PreviewPhoto} />
              <div className={style.add_img_block} style={{ backgroundImage: `url(${Preview})` }}>
              </div>
            </label>
          </div>
          <div className={style.form__title}>
            <label htmlFor="">Name:</label>
            <input type="text" value={Work.title} onChange={(e) => SetWork({ ...Work, title: e.target.value })} />
          </div>
          <div className={style.form__desc}>
            <label htmlFor="">Description:</label>
            <textarea value={Work.description} onChange={(e) => SetWork({ ...Work, description: e.target.value })}></textarea>
          </div>
          <div className={style.form__link}>
            <label htmlFor="">Link:</label>
            <input type="text" value={Work.url} onChange={(e) => SetWork({ ...Work, url: e.target.value })} />
          </div>
        </main>
      </div>
    </>
  )
}

export default CreateWork
