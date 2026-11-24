import { get, getDatabase, ref } from 'firebase/database'
import { firebase } from './firebaseConfig'

interface GetDataOptions {
  path?: string
}

/** Lê um nó do Realtime Database. Retorna null se a leitura falhar. */
export async function getDataFromFirebase<T = unknown>({
  path = '/',
}: GetDataOptions = {}): Promise<T | null> {
  try {
    const snapshot = await get(ref(getDatabase(firebase), path))
    return snapshot.val() as T | null
  } catch (error) {
    console.error(`Erro ao obter "${path}" do Firebase:`, error)
    return null
  }
}
