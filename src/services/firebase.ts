import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, DataSnapshot, DatabaseReference } from "firebase/database";

class FirebaseService {
  private readonly firebaseConfig = {
    apiKey: "AIzaSyDXgGJmu-8kVCsczotHZyUksN0PeTSLCec",
    authDomain: "my-portfolio-5104c.firebaseapp.com",
    databaseURL: "https://my-portfolio-5104c-default-rtdb.firebaseio.com",
    projectId: "my-portfolio-5104c",
    storageBucket: "my-portfolio-5104c.appspot.com",
    messagingSenderId: "123425215502",
    appId: "1:123425215502:web:d323e57fe72eb6a356585f"
  };
  
  private databaseRef: DatabaseReference;

  constructor() {
    const app = initializeApp(this.firebaseConfig);
    const database = getDatabase(app);
    this.databaseRef = ref(database);
  }

  public async getConnection(): Promise<void> {
    try {
      const snapshot: DataSnapshot = await get(this.databaseRef);
      console.log("Conexão bem-sucedida!");
      console.log("Dados do banco de dados:", snapshot.val());
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error);
    }
  }
}

export {FirebaseService};


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDXgGJmu-8kVCsczotHZyUksN0PeTSLCec",
//   authDomain: "my-portfolio-5104c.firebaseapp.com",
//   databaseURL: "https://my-portfolio-5104c-default-rtdb.firebaseio.com",
//   projectId: "my-portfolio-5104c",
//   storageBucket: "my-portfolio-5104c.appspot.com",
//   messagingSenderId: "123425215502",
//   appId: "1:123425215502:web:d323e57fe72eb6a356585f"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

