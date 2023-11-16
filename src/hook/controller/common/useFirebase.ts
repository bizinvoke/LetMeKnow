import { useMount } from 'ahooks';
import { message } from 'antd';
import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  User,
} from 'firebase/auth';
import { getBlob, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyDWw-YYGVLWjeeDPhwfp9R8Cn7cc12E9tg',
  authDomain: 'bizinvoke-demo.firebaseapp.com',
  projectId: 'bizinvoke-demo',
  storageBucket: 'gs://bizinvoke-demo-ocr-source-image-bucket',
  messagingSenderId: '781697815700',
  appId: '1:781697815700:web:e37e6e00dffe980de81081',
};

const app = initializeApp(firebaseConfig);

const storage = getStorage();
const resultStorage = getStorage(app, 'gs://bizinvoke-demo-ocr-result-bucket/');

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

self.FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.DEV;
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LcpVQ4pAAAAAFLWcA48i0d9vas73dI-bJGwVeBR'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});

export const useFirebase = () => {
  const [user, setUser] = useState<User>();

  useMount(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
  });

  return {
    user,
    onLoginWithGoogle: () => signInWithRedirect(auth, provider),
    uploadBytes,
    storageReference: (name: string) => ref(storage, name),
    downloadFile: (name: string) => getBlob(ref(resultStorage, name)),
    signOut: (cb: () => void) => {
      signOut(auth)
        .then(cb)
        .catch((err) => message.error(`退出登录错误，请重试:${err}`));
    },
  };
};
