require("dotenv").config();
import cors from "cors";
import express, { json, Request, Response } from "express";
import { MailerService } from "./service/mailer.service";
import { MongoDb } from "./service/mongodb.service";
import { IWork } from "./interface/works.interface";
import bodyParser from "body-parser";
import multer from "multer";
import { FireBaseService } from "./service/firebase.service";
//import { IOffer } from "./interface/offer.interface";

const db = new MongoDb();
const firebase = new FireBaseService();
const app = express();
const upload = multer();

app.use(json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/works", async (req: Request, res: Response) => {
    try {
        await db.connect();
        const works = await db.GetWorks();
        res.json(works);
    } finally {
        await db.disconnect();
    }
});

/*app.get("/offer/:_id", async (req: Request, res: Response) => {
    const _id = req.params._id;
    const offer = await db.GetOffer(_id);
    res.json(offer)
});*/

/*app.get("/offers", async (req: Request, res: Response) => {
    const offer = await db.GetOffers();
    res.json(offer)
});*/

app.post(
    "/add_work",
    upload.single("img"),
    async (req: Request, res: Response) => {
        const data: IWork = req.body;
        const file = req.file;
        try {
            await db.connect();
            if (file) {
                await firebase.SavePhoto(file, data._id);
                await db.AddWork(data);
            }
        } finally {
            await db.disconnect();
        }
    }
);

/*app.post("/add_offer", async (req: Request, res: Response) => {
    const data: IOffer = req.body;
    const file = req.file
    console.log(data)
    if (file) {
        await firebase.SavePhoto(file, data._id);
        await db.AddOffer(data);
    }
});*/

app.post(
    "/edit_work",
    upload.single("img"),
    async (req: Request, res: Response) => {
        const data = req.body;
        const file = req.file;
        try {
            await db.connect();
            if (file) {
                await firebase.UpdatePhoto(file, data._id);
                await db.UpdateWork(data);
            } else {
                await db.UpdateWork(data);
            }
        } finally {
            db.disconnect();
        }
    }
);

/*app.post("/edit_offer", async (req: Request, res: Response) => {
    const data = req.body;
    const file = req.file;
    if (file) {
        await firebase.UpdatePhoto(file, data._id);
        await db.UpdateOffer(data);
    }
});*/

app.post("/delete_work/:_id", async (req: Request, res: Response) => {
    const _id = req.params._id;
    try {
        await db.connect();
        await db.DeleteWork(_id);
        await firebase.DeletePhoto(_id);
    } finally {
        await db.disconnect();
    }
});

/*app.post("/delete_offer/:_id", async (req: Request, res: Response) => {
    const _id = req.params._id;
    await db.DeleteOffer(_id);
});*/

app.post("/sendEmail", (req: Request, res: Response) => {
    const { nameproject, email, offer } = req.body;
    const mailerService = new MailerService(nameproject, email, offer);
    const result = mailerService.sendEmail();
    res.send(result);
});

app.post("/save_photo/:_id", async (req: Request, res: Response) => {
    const _id = req.params._id;
    const file = req.file;
    if (file) {
        await firebase.SavePhoto(file, _id);
    }
});

app.post(
    "/save_photo_skill/:_id",
    upload.single("img"),
    async (req: Request, res: Response) => {
        const _id = req.params._id;
        const file = req.file;
        console.log(file, _id);
        if (file) {
            await firebase.SavePhotoSkill(file, _id);
        }
    }
);

app.post("/delete_photo/:_id", async (req: Request, res: Response) => {
    const _id = req.params._id;
    await firebase.DeletePhotoSkill(_id);
});

app.get("/photos", async (req: Request, res: Response) => {
    const photo = await firebase.getAllPhotoURLs();
    res.json(photo);
});

app.listen(5500, async () => {
    await db.connect();
    console.log(`http//:localhost:${5500}`);
});

app.on("exit", async () => {
    await db.disconnect();
});
