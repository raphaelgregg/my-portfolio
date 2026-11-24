import { get, getDatabase, ref } from 'firebase/database'
import { firebase } from './firebaseConfig'

interface GetDataOptions {
  path?: string
}

/**
 * Leituras já feitas nesta sessão. Home e página de projeto leem o mesmo nó
 * ("experience"); sem cache, cada navegação refaria a requisição.
 */
const cache = new Map<string, Promise<unknown>>()

async function readFromDatabase(path: string): Promise<unknown> {
  const snapshot = await get(ref(getDatabase(firebase), path))
  return snapshot.val()
}

/** Lê um nó do Realtime Database. Retorna null se a leitura falhar. */
export async function getDataFromFirebase<T = unknown>({
  path = '/',
}: GetDataOptions = {}): Promise<T | null> {
  let request = cache.get(path)

  if (!request) {
    request = readFromDatabase(path)
    cache.set(path, request)
  }

  try {
    return ((await request) as T | null) ?? null
  } catch (error) {
    // Falhas não ficam em cache: a próxima tentativa refaz a requisição
    cache.delete(path)
    console.error(`Erro ao obter "${path}" do Firebase:`, error)
    return null
  }
}
