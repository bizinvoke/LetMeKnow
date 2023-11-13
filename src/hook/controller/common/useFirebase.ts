// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadString } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDWw-YYGVLWjeeDPhwfp9R8Cn7cc12E9tg',
  authDomain: 'bizinvoke-demo.firebaseapp.com',
  projectId: 'bizinvoke-demo',
  storageBucket: 'gs://bizinvoke-demo-ocr-source-image-bucket',
  messagingSenderId: '781697815700',
  appId: '1:781697815700:web:e37e6e00dffe980de81081',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const resultStorage = getStorage(app, 'gs://bizinvoke-demo-ocr-result-bucket/');

export const useFirebase = () => {
  const storage = getStorage();

  return {
    uploadString,
    resultStorage,
    storageReference: (name: string) => ref(storage, name),
  };
};
