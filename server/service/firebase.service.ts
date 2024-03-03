import { initializeApp } from "firebase/app";
import {
    getStorage,
    ref,
    uploadBytes,
    deleteObject,
    getDownloadURL,
    listAll,
} from "firebase/storage";

export class FireBaseService {
    private firebaseConfig = {
        apiKey: "AIzaSyC1kYHttP6Xll6nbmueF-dsFArRkLvzytI",
        authDomain: "portfolio-9d57e.firebaseapp.com",
        projectId: "portfolio-9d57e",
        storageBucket: "portfolio-9d57e.appspot.com",
        messagingSenderId: "731287241085",
        appId: "1:731287241085:web:115fe48e81da287aeb4c14",
    };

    private FB = initializeApp(this.firebaseConfig);
    private storage = getStorage(this.FB);

    async SavePhoto(file: Express.Multer.File, _id: string) {
        const photo = new Blob([file.buffer]);
        const filename = `${_id}.webp`;
        const metadata = {
            contentType: file.mimetype,
        };
        const storageRef = ref(this.storage, filename);
        await uploadBytes(storageRef, photo, metadata);
    }

    async UpdatePhoto(file: Express.Multer.File, _id: string) {
        const photo = new Blob([file.buffer]);
        const filename = `${_id}.webp`;
        const metadata = {
            contentType: file.mimetype,
        };
        const storageRef = ref(this.storage, filename);
        await uploadBytes(storageRef, photo, metadata);
    }

    async DeletePhoto(_id: string) {
        const filename = `${_id}.webp`;
        const photoRef = ref(this.storage, filename);
        await deleteObject(photoRef);
    }

    async GetPhoto(_id: string) {
        const filename = `${_id}.webp`;
        const photoRef = ref(this.storage, filename);
        return await getDownloadURL(photoRef);
    }

    async SavePhotoSkill(file: Express.Multer.File, _id: string) {
        const photo = new Blob([file.buffer]);
        const filename = `skills/${_id}.webp`;
        const metadata = {
            contentType: file.mimetype,
        };
        const storageRef = ref(this.storage, filename);
        await uploadBytes(storageRef, photo, metadata);
    }

    async DeletePhotoSkill(_id: string) {
        const filename = `skills/${_id}.webp`;
        const photoRef = ref(this.storage, filename);
        await deleteObject(photoRef);
    }

    async getAllPhotoURLs() {
        const listRef = ref(this.storage, "/skills/");
        const photoURLs = [];
        const listResult = await listAll(listRef);
        for (const itemRef of listResult.items) {
            const photoURL = await getDownloadURL(itemRef);
            photoURLs.push(photoURL);
        }
        return photoURLs;
    }
}
