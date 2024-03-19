"use client";
import { ChangeEvent, FC, useEffect, useState } from "react";
import style from "./admin.module.scss";
import { AdminService } from "../service/admin.service";
import { IWork, IWorks } from "../interface/work.interface";
import { IOffer, IOffers } from "../interface/offer.interface";
import SwiperList from "@/app/(client)/components/SwiperList";
import axios from "axios";
import { randomBytes } from "crypto";

const page: FC = () => {
    const offerempty: IOffer = {
        _id: "",
        title: "",
        description: "",
        price: 0,
        img: "",
    };
    const workempty: IWork = {
        _id: "",
        title: "",
        description: "",
        url: "",
        img: "",
    };
    const [Work, SetWork] = useState<IWork>(workempty);
    const [Offer, SetOffer] = useState<IOffer>(offerempty);
    const [WorkEdit, SetWorkEdit] = useState<IWork>(workempty);
    const [OfferEdit, SetOfferEdit] = useState<IOffer>(offerempty);
    const [Preview, SetPreview] = useState<string>("");
    const [Photo, SetPhoto] = useState<File>();
    const [ActivePop, SetActivePop] = useState("Works");
    const [ActivePopCreate, SetActivePopCreate] = useState(false);
    const [ActivePopEdit, SetActivePopEdit] = useState(false);
    const [ActivePopCreateOffer, SetActivePopCreateOffer] = useState(false);
    const [ActivePopEditOffer, SetActivePopEditOffer] = useState(false);
    const [ActivePopCreateUser, SetActivePopCreateUser] = useState(false);
    const [ActivePopEditUser, SetActivePopEditUser] = useState(false);
    const [ListWorks, SetListWorks] = useState<IWorks>({ works: [] });
    const [ListOffers, SetListOffers] = useState<IOffers>({ offers: [] });

    const ControlActivePopWorkCreate = () => {
        SetActivePopCreate(!ActivePopCreate);
    };

    const ControlActivePopWorkEdit = (work: IWork) => {
        console.log(work)
        SetActivePopEdit(!ActivePopEdit);
        SetWorkEdit(work)
    };

    const ControlActivePopCreateOffer = () => {
        SetActivePopCreate(!ActivePopCreateOffer);
    };

    const ControlActivePopOfferEdit = (offer: IOffer) => {
        SetActivePopEditOffer(!ActivePopEditOffer);
        SetOfferEdit(offer)
    };

    const ControlActivePopCreateUser = () => {
        SetActivePopCreateUser(!ActivePopCreateUser);
    };

    const ControlActivePopEditUser = () => {
        SetActivePopEditUser(!ActivePopEditUser);
    };

    const ControlActivePop = (status: string) => {
        SetActivePop(status);
    };

    const PreviewPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            SetPreview(URL.createObjectURL(e.target.files[0]));
            SetPhoto(e.target.files[0]);
        }
    };

    const CloseActivePopWorkCreate = () => {
        SetActivePopCreate(false);
        SetWork(workempty);
        SetPreview("");
    };

    const CloseActivePopOfferCreate = () => {
        SetActivePopCreate(false);
        SetOffer(offerempty);
        SetPreview("");
    };

    const CreateWork = async () => {
        try {
            if (Photo) {
                Work._id = randomBytes(12).toString("hex");
                const formdata = new FormData();
                formdata.append("_id", Work._id);
                formdata.append("img", Photo);
                formdata.append("title", Work.title);
                formdata.append("description", Work.description);
                formdata.append("url", Work.url);
                await axios
                    .post(`http://localhost:5500/add_work`, formdata)
                    .then((res) => {
                        if (res.status === 200) {
                            SetActivePopCreate(false);
                            SetWork(workempty);
                            SetPreview("");
                            window.location.reload();
                        }
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const EditWork = () => {
        try {
            if (Photo) {
                const formData = new FormData();
                formData.append("img", Photo);
                formData.append("title", WorkEdit.title);
                formData.append("description", WorkEdit.description);
                formData.append("url", WorkEdit.url);

                axios
                    .post(
                        `http://localhost:5500/edit_work/?_id=${WorkEdit._id}`,
                        formData
                    )
                    .then((res) => {
                        SetActivePopEdit(false);
                        SetPreview("");
                        window.location.reload();
                    });
            } else {
                const formData = new FormData();
                formData.append("title", WorkEdit.title);
                formData.append("description", WorkEdit.description);
                formData.append("url", WorkEdit.url);

                axios
                    .post(`http://localhost:5500/edit_work`, formData)
                    .then((res) => {
                        SetActivePopEdit(false);
                        SetPreview("");
                        window.location.reload();
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const CreateOffer = () => {
        try {
            if (Photo) {
                const _id = randomBytes(12).toString("hex");
                const formData = new FormData();
                formData.append("img", Photo);
                formData.append("_id", _id);
                formData.append("title", Offer.title);
                formData.append("description", Offer.description);
                formData.append("price", String(Offer.price));

                axios
                    .post(
                        `http://localhost:5500/add_offer/?_id=${_id}`,
                        formData
                    )
                    .then((res) => {
                        SetActivePopCreateOffer(false);
                        SetOffer(offerempty);
                        SetPreview("");
                        window.location.reload();
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const EditOffer = () => {
        try {
            if (Photo) {
                const formData = new FormData();
                formData.append("img", Photo);
                formData.append("title", OfferEdit.title);
                formData.append("description", OfferEdit.description);
                formData.append("price", OfferEdit.price.toString());

                axios
                    .post(
                        `http://localhost:5500/edit_work/?_id=${OfferEdit._id}`,
                        formData
                    )
                    .then((res) => {
                        SetActivePopEdit(false);
                        SetPreview("");
                        window.location.reload();
                    });
            } else {
                const formData = new FormData();
                formData.append("title", OfferEdit.title);
                formData.append("description", OfferEdit.description);
                formData.append("url", OfferEdit.price.toString());

                axios
                    .post(`http://localhost:5500/edit_work`, formData)
                    .then((res) => {
                        SetActivePopEdit(false);
                        SetPreview("");
                        window.location.reload();
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const SavePhoto = async () => {
        try {
            if (Photo) {
                const _id = randomBytes(12).toString("hex");
                const formdata = new FormData();
                formdata.append("img", Photo);
                await axios
                    .post(`http://localhost:5500/save_photo/${_id}`, formdata)
                    .then((res) => {
                        SetActivePopCreate(false);
                        SetPreview("");
                        window.location.reload();
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const GetData = async () => {
        switch (ActivePop) {
            case "Works":
                const works: IWorks = await AdminService.GetWorks();
                SetListWorks(works);
                break;
            case "Offers":
                const offers: IOffers = await AdminService.GetOffers();
                SetListOffers(offers);
                break;
            default:
                break;
        }
    };

    const Delete = (_id: string) => {
        switch (ActivePop) {
            case "Works":
                AdminService.DeleteWorks(_id).then(() => {
                    GetData();
                });

                break;
            case "Offers":
                AdminService.DeleteOffers(_id).then(() => {
                    GetData();
                });
            default:
                break;
        }
    };

    useEffect(() => {
        GetData();
    }, [ActivePop]);

    return (
        <>
            <aside className={style.aside__menu}>
                <h1 className={style.menu__title}>Admin Panel</h1>
                <nav className="menu">
                    <ul className={style.menu_list}>
                        <li onClick={() => ControlActivePop("Works")}>Works</li>
                        <li onClick={() => ControlActivePop("Offers")}>
                            Offers
                        </li>
                        <li onClick={() => ControlActivePop("User")}>User</li>
                    </ul>
                </nav>
            </aside>
            <main className={style.content}>
                {ActivePop === "Works" && (
                    <div className={style.content__block}>
                        <nav className={style.block__menu}>
                            <h2 className={style.block__title}>Works</h2>
                            <button
                                className={style.block__button__add}
                                onClick={ControlActivePopWorkCreate}
                            >
                                Add Work
                            </button>
                        </nav>
                        {ActivePopCreate && ActivePop === "Works" && (
                            <>
                                <div
                                    className={style.blur}
                                    onClick={CloseActivePopWorkCreate}
                                ></div>
                                <div
                                    className={style.create__block}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <header className={style.block__header}>
                                        <button
                                            className={style.header__exit}
                                            onClick={CloseActivePopWorkCreate}
                                        >
                                            <svg
                                                width="14.510254"
                                                height="14.537842"
                                                viewBox="0 0 14.5103 14.5378"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
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
                                        <h2 className={style.header__title}>
                                            Create Work
                                        </h2>
                                        <button
                                            className={style.header__create}
                                            onClick={CreateWork}
                                        >
                                            Create
                                        </button>
                                    </header>
                                    <main className={style.block__form}>
                                        <div className={style.form__img}>
                                            <span>Add image</span>
                                            <label>
                                                <input
                                                    type="file"
                                                    style={{ display: "none" }}
                                                    onChange={PreviewPhoto}
                                                />
                                                <div
                                                    className={
                                                        style.add_img_block
                                                    }
                                                    style={{
                                                        backgroundImage: `url(${Preview})`,
                                                    }}
                                                ></div>
                                            </label>
                                        </div>
                                        <div className={style.form__title}>
                                            <label htmlFor="">Name:</label>
                                            <input
                                                type="text"
                                                value={Work.title}
                                                onChange={(e) =>
                                                    SetWork({
                                                        ...Work,
                                                        title: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className={style.form__desc}>
                                            <label htmlFor="">
                                                Description:
                                            </label>
                                            <textarea
                                                value={Work.description}
                                                onChange={(e) =>
                                                    SetWork({
                                                        ...Work,
                                                        description:
                                                            e.target.value,
                                                    })
                                                }
                                            ></textarea>
                                        </div>
                                        <div className={style.form__link}>
                                            <label htmlFor="">Link:</label>
                                            <input
                                                type="text"
                                                value={Work.url}
                                                onChange={(e) =>
                                                    SetWork({
                                                        ...Work,
                                                        url: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </main>
                                </div>
                            </>
                        )}
                        <div className={style.block__list}>
                            {ListWorks.works.map((work) => (
                                <div
                                    key={work._id}
                                    className={style.block__item}
                                >
                                    <h3 className={style.item__title}>
                                        {work.title}
                                    </h3>
                                    <nav className={style.item__menu}>
                                        <button
                                            className={style.item__edit}
                                            onClick={() => ControlActivePopWorkEdit(work)}
                                        >
                                            <svg
                                                width="18.190430"
                                                height="18.190186"
                                                viewBox="0 0 18.1904 18.1902"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <desc>Created with Pixso.</desc>
                                                <defs />
                                                <path
                                                    id="Icon"
                                                    d="M14.0981 1.0127C14.384 0.894287 14.6907 0.833252 15.0002 0.833252C15.3098 0.833252 15.6162 0.894287 15.9021 1.0127C16.1882 1.1311 16.448 1.30469 16.6667 1.52368C16.8857 1.74243 17.0593 2.0022 17.1777 2.28833C17.2961 2.57422 17.3572 2.88086 17.3572 3.19019C17.3572 3.49976 17.2961 3.8064 17.1777 4.09229C17.0593 4.37817 16.8857 4.63818 16.6667 4.85693L5.41675 16.1069L0.833496 17.3569L2.0835 12.7737L13.3335 1.52368C13.5522 1.30469 13.8123 1.1311 14.0981 1.0127Z"
                                                    stroke="#667085"
                                                    stroke-opacity="1.000000"
                                                    stroke-width="1.666667"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </button>
                                        {ActivePopEdit && (
                                            <>
                                                <div
                                                    className={style.blur}
                                                    onClick={
                                                        () => ControlActivePopWorkEdit(work)
                                                    }
                                                ></div>
                                                <div
                                                    className={
                                                        style.create__block
                                                    }
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                >
                                                    <header
                                                        className={
                                                            style.block__header
                                                        }
                                                    >
                                                        <button
                                                            className={
                                                                style.header__exit
                                                            }
                                                            onClick={
                                                                () => ControlActivePopWorkEdit(work)
                                                            }
                                                        >
                                                            <svg
                                                                width="14.510254"
                                                                height="14.537842"
                                                                viewBox="0 0 14.5103 14.5378"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <desc>
                                                                    Created with
                                                                    Pixso.
                                                                </desc>
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
                                                        <h2
                                                            className={
                                                                style.header__title
                                                            }
                                                        >
                                                            Edit Work
                                                        </h2>
                                                        <button
                                                            className={
                                                                style.header__create
                                                            }
                                                            onClick={EditWork}
                                                        >
                                                            Save
                                                        </button>
                                                    </header>
                                                    <main
                                                        className={
                                                            style.block__form
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                style.form__img
                                                            }
                                                        >
                                                            <span>
                                                                Add image
                                                            </span>
                                                            <label>
                                                                <input
                                                                    type="file"
                                                                    style={{
                                                                        display:
                                                                            "none",
                                                                    }}
                                                                    onChange={
                                                                        PreviewPhoto
                                                                    }
                                                                />
                                                                <div
                                                                    className={
                                                                        style.add_img_block
                                                                    }
                                                                    style={{
                                                                        backgroundImage: `url(${Preview
                                                                                ? Preview
                                                                                : WorkEdit.img
                                                                            })`,
                                                                    }}
                                                                ></div>
                                                            </label>
                                                        </div>
                                                        <div
                                                            className={
                                                                style.form__title
                                                            }
                                                        >
                                                            <label htmlFor="">
                                                                Name:
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={
                                                                    WorkEdit.title
                                                                }
                                                                onChange={(e) =>
                                                                    SetWorkEdit({
                                                                        ...WorkEdit,
                                                                        title: e
                                                                            .target
                                                                            .value,
                                                                    })
                                                                }
                                                            />
                                                        </div>
                                                        <div
                                                            className={
                                                                style.form__desc
                                                            }
                                                        >
                                                            <label htmlFor="">
                                                                Description:
                                                            </label>
                                                            <textarea
                                                                value={
                                                                    WorkEdit.description
                                                                }
                                                                onChange={(e) =>
                                                                    SetWorkEdit({
                                                                        ...WorkEdit,
                                                                        description:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    })
                                                                }
                                                            ></textarea>
                                                        </div>
                                                        <div
                                                            className={
                                                                style.form__link
                                                            }
                                                        >
                                                            <label htmlFor="">
                                                                Link:
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={Work.url}
                                                                onChange={(e) =>
                                                                    SetWorkEdit({
                                                                        ...WorkEdit,
                                                                        url: e
                                                                            .target
                                                                            .value,
                                                                    })
                                                                }
                                                            />
                                                        </div>
                                                    </main>
                                                </div>
                                            </>
                                        )}
                                        <button
                                            className={style.item__delete}
                                            onClick={() => Delete(work._id)}
                                        >
                                            <svg
                                                width="16.666504"
                                                height="18.333252"
                                                viewBox="0 0 16.6665 18.3333"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <desc>Created with Pixso.</desc>
                                                <defs />
                                                <path
                                                    id="Icon"
                                                    d="M0.833252 4.1665L2.5 4.1665L15.8333 4.1665M2.5 4.1665L14.1665 4.1665L14.1665 15.8333C14.1665 16.2754 13.991 16.6992 13.6785 17.0117C13.366 17.3242 12.9419 17.5 12.5 17.5L4.1665 17.5C3.72461 17.5 3.30054 17.3242 2.98804 17.0117C2.67554 16.6992 2.5 16.2754 2.5 15.8333L2.5 4.1665M5 4.1665L5 2.5C5 2.05786 5.17554 1.63403 5.48804 1.32129C5.80054 1.00879 6.22461 0.833252 6.6665 0.833252L10 0.833252C10.4419 0.833252 10.866 1.00879 11.1785 1.32129C11.491 1.63403 11.6665 2.05786 11.6665 2.5L11.6665 4.1665M6.6665 8.33325L6.6665 13.3333M10 8.33325L10 13.3333"
                                                    stroke="#667085"
                                                    stroke-opacity="1.000000"
                                                    stroke-width="1.666667"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </nav>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {ActivePop === "Offers" && (
                    <div className="content__block">
                        <nav className="block__menu">
                            <h2 className="block__title">Offers</h2>
                            <button
                                className="block__button__add"
                                onClick={ControlActivePopCreateOffer}
                            >
                                Add Offer
                            </button>
                        </nav>
                        {ActivePopCreateOffer && ActivePop === "Offers" && (
                            <>
                                <div
                                    className={style.blur}
                                    onClick={CloseActivePopOfferCreate}
                                ></div>
                                <div
                                    className={style.create__block}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <header className={style.block__header}>
                                        <button
                                            className={style.header__exit}
                                            onClick={CloseActivePopOfferCreate}
                                        >
                                            <svg
                                                width="14.510254"
                                                height="14.537842"
                                                viewBox="0 0 14.5103 14.5378"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
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
                                        <h2 className={style.header__title}>
                                            Create Offer
                                        </h2>
                                        <button
                                            className={style.header__create}
                                            onClick={CreateOffer}
                                        >
                                            Create
                                        </button>
                                    </header>
                                    <main className={style.block__form}>
                                        <div className={style.form__img}>
                                            <span>Add image</span>
                                            <label>
                                                <input
                                                    type="file"
                                                    style={{ display: "none" }}
                                                    onChange={PreviewPhoto}
                                                />
                                                <div
                                                    className={
                                                        style.add_img_block
                                                    }
                                                    style={{
                                                        backgroundImage: `url(${Preview})`,
                                                    }}
                                                ></div>
                                            </label>
                                        </div>
                                        <div className={style.form__title}>
                                            <label htmlFor="">Name:</label>
                                            <input
                                                type="text"
                                                value={Offer.title}
                                                onChange={(e) =>
                                                    SetOffer({
                                                        ...Offer,
                                                        title: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className={style.form__desc}>
                                            <label htmlFor="">
                                                Description:
                                            </label>
                                            <textarea
                                                value={Offer.description}
                                                onChange={(e) =>
                                                    SetOffer({
                                                        ...Offer,
                                                        description:
                                                            e.target.value,
                                                    })
                                                }
                                            ></textarea>
                                        </div>
                                        <div className={style.form__link}>
                                            <label htmlFor="">Price:</label>
                                            <input
                                                type="text"
                                                value={Offer.price}
                                                onChange={(e) =>
                                                    SetOffer({
                                                        ...Offer,
                                                        price: parseInt(
                                                            e.target.value
                                                        ),
                                                    })
                                                }
                                            />
                                        </div>
                                    </main>
                                </div>
                            </>
                        )}
                        <div className={style.block__list}>
                            {ListOffers.offers.map((offer) => (
                                <div
                                    key={offer._id}
                                    className={style.block__item}
                                >
                                    <h3 className={style.item__title}>
                                        {offer.title}
                                    </h3>
                                    <nav className={style.item__menu}>
                                        <button
                                            className={style.item__edit}
                                            onClick={() => ControlActivePopOfferEdit(offer)}
                                        >
                                            <svg
                                                width="18.190430"
                                                height="18.190186"
                                                viewBox="0 0 18.1904 18.1902"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <desc>Created with Pixso.</desc>
                                                <defs />
                                                <path
                                                    id="Icon"
                                                    d="M14.0981 1.0127C14.384 0.894287 14.6907 0.833252 15.0002 0.833252C15.3098 0.833252 15.6162 0.894287 15.9021 1.0127C16.1882 1.1311 16.448 1.30469 16.6667 1.52368C16.8857 1.74243 17.0593 2.0022 17.1777 2.28833C17.2961 2.57422 17.3572 2.88086 17.3572 3.19019C17.3572 3.49976 17.2961 3.8064 17.1777 4.09229C17.0593 4.37817 16.8857 4.63818 16.6667 4.85693L5.41675 16.1069L0.833496 17.3569L2.0835 12.7737L13.3335 1.52368C13.5522 1.30469 13.8123 1.1311 14.0981 1.0127Z"
                                                    stroke="#667085"
                                                    stroke-opacity="1.000000"
                                                    stroke-width="1.666667"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </button>
                                        {ActivePopEdit && (
                                            <>
                                                <div
                                                    className={style.blur}
                                                    onClick={
                                                       () => ControlActivePopOfferEdit(offer)
                                                    }
                                                ></div>
                                                <div
                                                    className={
                                                        style.create__block
                                                    }
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                >
                                                    <header
                                                        className={
                                                            style.block__header
                                                        }
                                                    >
                                                        <button
                                                            className={
                                                                style.header__exit
                                                            }
                                                            onClick={
                                                                () => ControlActivePopOfferEdit(offer)
                                                            }
                                                        >
                                                            <svg
                                                                width="14.510254"
                                                                height="14.537842"
                                                                viewBox="0 0 14.5103 14.5378"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <desc>
                                                                    Created with
                                                                    Pixso.
                                                                </desc>
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
                                                        <h2
                                                            className={
                                                                style.header__title
                                                            }
                                                        >
                                                            Edit Offer
                                                        </h2>
                                                        <button
                                                            className={
                                                                style.header__create
                                                            }
                                                            onClick={EditOffer}
                                                        >
                                                            Save
                                                        </button>
                                                    </header>
                                                    <main
                                                        className={
                                                            style.block__form
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                style.form__img
                                                            }
                                                        >
                                                            <span>
                                                                Add image
                                                            </span>
                                                            <label>
                                                                <input
                                                                    type="file"
                                                                    style={{
                                                                        display:
                                                                            "none",
                                                                    }}
                                                                    onChange={
                                                                        PreviewPhoto
                                                                    }
                                                                />
                                                                <div
                                                                    className={
                                                                        style.add_img_block
                                                                    }
                                                                    style={{
                                                                        backgroundImage: `url(${Preview
                                                                                ? Preview
                                                                                : OfferEdit.img
                                                                            })`,
                                                                    }}
                                                                ></div>
                                                            </label>
                                                        </div>
                                                        <div
                                                            className={
                                                                style.form__title
                                                            }
                                                        >
                                                            <label htmlFor="">
                                                                Name:
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={
                                                                    OfferEdit.title
                                                                }
                                                                onChange={(e) =>
                                                                    SetOfferEdit({
                                                                        ...OfferEdit,
                                                                        title: e
                                                                            .target
                                                                            .value,
                                                                    })
                                                                }
                                                            />
                                                        </div>
                                                        <div
                                                            className={
                                                                style.form__desc
                                                            }
                                                        >
                                                            <label htmlFor="">
                                                                Description:
                                                            </label>
                                                            <textarea
                                                                value={
                                                                    Offer.description
                                                                }
                                                                onChange={(e) =>
                                                                    SetOfferEdit({
                                                                        ...OfferEdit,
                                                                        description:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    })
                                                                }
                                                            ></textarea>
                                                        </div>
                                                        <div
                                                            className={
                                                                style.form__link
                                                            }
                                                        >
                                                            <label htmlFor="">
                                                                Price:
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={
                                                                    OfferEdit.price
                                                                }
                                                                onChange={(e) =>
                                                                    SetOfferEdit({
                                                                        ...OfferEdit,
                                                                        price: parseInt(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        ),
                                                                    })
                                                                }
                                                            />
                                                        </div>
                                                    </main>
                                                </div>
                                            </>
                                        )}
                                        <button
                                            className={style.item__delete}
                                            onClick={() => Delete(offer._id)}
                                        >
                                            <svg
                                                width="16.666504"
                                                height="18.333252"
                                                viewBox="0 0 16.6665 18.3333"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <desc>Created with Pixso.</desc>
                                                <defs />
                                                <path
                                                    id="Icon"
                                                    d="M0.833252 4.1665L2.5 4.1665L15.8333 4.1665M2.5 4.1665L14.1665 4.1665L14.1665 15.8333C14.1665 16.2754 13.991 16.6992 13.6785 17.0117C13.366 17.3242 12.9419 17.5 12.5 17.5L4.1665 17.5C3.72461 17.5 3.30054 17.3242 2.98804 17.0117C2.67554 16.6992 2.5 16.2754 2.5 15.8333L2.5 4.1665M5 4.1665L5 2.5C5 2.05786 5.17554 1.63403 5.48804 1.32129C5.80054 1.00879 6.22461 0.833252 6.6665 0.833252L10 0.833252C10.4419 0.833252 10.866 1.00879 11.1785 1.32129C11.491 1.63403 11.6665 2.05786 11.6665 2.5L11.6665 4.1665M6.6665 8.33325L6.6665 13.3333M10 8.33325L10 13.3333"
                                                    stroke="#667085"
                                                    stroke-opacity="1.000000"
                                                    stroke-width="1.666667"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </nav>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {ActivePop === "User" && (
                    <div className={style.content__block}>
                        <nav className={style.block__menu}>
                            <div className={style.block__title}>
                                <h2>User</h2>
                            </div>
                            <div
                                className="block__button__add"
                                onClick={ControlActivePopCreateUser}
                            >
                                Add Photo
                            </div>
                        </nav>
                        {ActivePopCreateUser && ActivePop === "User" && (
                            <>
                                <div
                                    className={style.blur}
                                    onClick={ControlActivePopCreateUser}
                                ></div>
                                <div
                                    className={style.create__block}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <header className={style.block__header}>
                                        <button
                                            className={style.header__exit}
                                            onClick={ControlActivePopCreateUser}
                                        >
                                            <svg
                                                width="14.510254"
                                                height="14.537842"
                                                viewBox="0 0 14.5103 14.5378"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
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
                                        <h2 className={style.header__title}>
                                            Add Skill
                                        </h2>
                                        <button
                                            className={style.header__create}
                                            onClick={SavePhoto}
                                        >
                                            Add
                                        </button>
                                    </header>
                                    <main className={style.block__form}>
                                        <div className={style.form__img}>
                                            <span>Add image</span>
                                            <label>
                                                <input
                                                    type="file"
                                                    style={{ display: "none" }}
                                                    onChange={PreviewPhoto}
                                                />
                                                <div
                                                    className={
                                                        style.add_img_block
                                                    }
                                                    style={{
                                                        backgroundImage: `url(${Preview})`,
                                                    }}
                                                ></div>
                                            </label>
                                        </div>
                                    </main>
                                </div>
                            </>
                        )}
                        <div className={style.previw__list}>
                            <SwiperList />
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

export default page;
