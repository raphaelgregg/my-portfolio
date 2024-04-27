// Importe o SDK do Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import "firebase/database";

// Configurações do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDXgGJmu-8kVCsczotHZyUksN0PeTSLCec",
  authDomain: "my-portfolio-5104c.firebaseapp.com",
  databaseURL: "https://my-portfolio-5104c-default-rtdb.firebaseio.com",
  projectId: "my-portfolio-5104c",
  storageBucket: "my-portfolio-5104c.appspot.com",
  messagingSenderId: "123425215502",
  appId: "1:123425215502:web:d323e57fe72eb6a356585f"
};

// Inicialize o Firebase
const firebase = initializeApp(firebaseConfig);

// Exporte o Firebase para ser utilizado em outros arquivos
export { firebase };

