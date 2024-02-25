import { initializeApp } from "firebase/app";
import {
    getStorage,
    ref,
    uploadBytes,
    deleteObject,
    getDownloadURL,
} from "firebase/storage";

export class FireBaseService {

    private firebaseConfig = {
        apiKey: "AIzaSyC1kYHttP6Xll6nbmueF-dsFArRkLvzytI",
        authDomain: "portfolio-9d57e.firebaseapp.com",
        projectId: "portfolio-9d57e",
        storageBucket: "portfolio-9d57e.appspot.com",
        messagingSenderId: "731287241085",
        appId: "1:731287241085:web:115fe48e81da287aeb4c14",
    }

    private FB = initializeApp(this.firebaseConfig)
    private storage = getStorage(this.FB)

    SavePhoto(file: Express.Multer.File, _id: string) {
        const photo = new Blob([file.buffer])
        const filename = `${_id}.webp`;
        const metadata = {
            contentType: file.mimetype
        }
        const storageRef = ref(this.storage, filename)
        uploadBytes(storageRef, photo, metadata)
    }

    UpdatePhoto(file: Express.Multer.File, _id: string) {
        const photo = new Blob([file.buffer])
        const filename = `${_id}.webp`;
        const metadata = {
            contentType: file.mimetype
        }
        const storageRef = ref(this.storage, filename)
        uploadBytes(storageRef, photo, metadata)
    }

    DeletePhoto(_id: string) {
        const filename = `${_id}.webp`;
        const photoRef = ref(this.storage, filename);
        deleteObject(photoRef);
    }

    GetPhoto(_id: string) {
        const filename = `${_id}.webp`;
        const photoRef = ref(this.storage, filename);
        return getDownloadURL(photoRef);
    }
}
