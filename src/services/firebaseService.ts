// Importe o Firebase configurado
import { get, getDatabase, ref } from "firebase/database";
import { firebase } from "./firebaseConfig";

interface getDataFromFirebaseProps {
  path?: string;
}
// Função para obter os dados do Firebase e atribuir a uma constante
async function getDataFromFirebase({path = "/"}: getDataFromFirebaseProps = {}) {
  const database = getDatabase(firebase);

  try {
    const dataRef = ref(database, path);
    const snapshot = await get(dataRef);
    const data = snapshot.val();
    return data;
  } catch (error) {
    console.error("Erro ao obter dados do Firebase:", error);
    return null;
  }
}

// Exporte a função para ser utilizada em outros arquivos
export { getDataFromFirebase };

