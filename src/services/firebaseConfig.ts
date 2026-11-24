import { initializeApp } from 'firebase/app'

// Estas chaves identificam o projeto e são públicas por design no Firebase.
// A proteção dos dados depende das regras do Realtime Database: confirme no
// console do Firebase que a escrita pública está bloqueada.
const firebaseConfig = {
  apiKey: 'AIzaSyDXgGJmu-8kVCsczotHZyUksN0PeTSLCec',
  authDomain: 'my-portfolio-5104c.firebaseapp.com',
  databaseURL: 'https://my-portfolio-5104c-default-rtdb.firebaseio.com',
  projectId: 'my-portfolio-5104c',
  storageBucket: 'my-portfolio-5104c.appspot.com',
  messagingSenderId: '123425215502',
  appId: '1:123425215502:web:d323e57fe72eb6a356585f',
}

export const firebase = initializeApp(firebaseConfig)
