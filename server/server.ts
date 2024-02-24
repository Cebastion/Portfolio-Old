require('dotenv').config();
import cors from 'cors';
import express, {json, Request, Response} from 'express';
import {ConfigService} from './config/config.service';
import {MailerService} from './service/mailer.service';
import {MongoDb} from './service/mongodb.service';
import {IWork} from './interface/works.interface';
import bodyParser from 'body-parser';
import multer from 'multer';
import {initializeApp} from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  updateMetadata,
  getDownloadURL,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC1kYHttP6Xll6nbmueF-dsFArRkLvzytI',
  authDomain: 'portfolio-9d57e.firebaseapp.com',
  projectId: 'portfolio-9d57e',
  storageBucket: 'portfolio-9d57e.appspot.com',
  messagingSenderId: '731287241085',
  appId: '1:731287241085:web:115fe48e81da287aeb4c14',
};

const FB = initializeApp(firebaseConfig);

const db = new MongoDb(new ConfigService());
const app = express();
const storage = getStorage(FB);
const upload = multer();

app.use(json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/works', async (req: Request, res: Response) => {
  const works = await db.GetWorks();
  res.json(works);
});

app.get('/offer', (req: Request, res: Response) => {
  res.send('Server is running');
});

app.get('/offers', (req: Request, res: Response) => {
  res.send('Server is running');
});

app.post(
  '/add_work',
  upload.single('img'),
  async (req: Request, res: Response) => {
    const data: IWork = req.body;
    const file = req.file;
    if (file) {
      const metadata = {
        contentType: file.mimetype,
      };
      const photo = new Blob([file.buffer]);
      const filename = `${data._id}.webp`;
      const storageRef = ref(storage, filename);
      uploadBytes(storageRef, photo, metadata);
      await db.AddWork(data);
    }
  },
);

app.post('/add_offer', (req: Request, res: Response) => {
  res.send('Server is running');
});

app.post('/edit_work', upload.single('img'), (req: Request, res: Response) => {
  const data = req.body;
  const file = req.file;
  if (file) {
    const metadata = {
      contentType: file.mimetype,
    };
    const filename = `${data._id}.webp`;
    const storageRef = ref(storage, filename);
    updateMetadata(storageRef, metadata);
  }
  db.UpdateWork(data);
});

app.post('/edit_offer', (req: Request, res: Response) => {
  res.send('Server is running');
});

app.post('/delete_work/:_id', async (req: Request, res: Response) => {
  const _id = req.params._id;
  const filename = `${_id}.webp`;
  const photoRef = ref(storage, filename);
  deleteObject(photoRef);
  await db.DeleteWork(_id);
});

app.post('/delete_offer', (req: Request, res: Response) => {
  res.send('Server is running');
});

app.post('/sendEmail', (req: Request, res: Response) => {
  const {nameproject, email, offer} = req.body;
  const mailerService = new MailerService(
    nameproject,
    email,
    offer,
    new ConfigService(),
  );
  const result = mailerService.sendEmail();
  res.send(result);
});

app.get('/img/:_id', async (req: Request, res: Response) => {
  const _id = req.params._id;
  const filename = `${_id}.webp`;
  const photoRef = ref(storage, filename);
  const resualt = await getDownloadURL(photoRef);
  res.json(resualt);
});

app.listen(5500, () => {
  console.log(`http//:localhost:${5500}`);
});