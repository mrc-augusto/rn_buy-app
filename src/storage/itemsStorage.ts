import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterStatus } from "@/types/FilterStatus";

// Chave usada para armazenar os itens no AsyncStorage
const ITEMS_STORAGE_KEY = '@comprar:items'

// Tipo que define a estrutura de um item no storage
export type ItemStorage = {
  id: string          // Identificador único do item
  status: FilterStatus // Status do item (pendente ou concluído)
  description: string  // Descrição do item
}

/**
 * Busca todos os itens armazenados no AsyncStorage
 * @returns Promise com array de itens ou array vazio se não houver dados
 */
async function get(): Promise<ItemStorage[]>{
  try{
    const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY)
    return storage ? JSON.parse(storage) : [] // Retorna itens ou array vazio
  }catch(error){
    throw new Error('ITEMS_GET:' + error)
  }
}

/**
 * Busca itens filtrados por status específico
 * @param status - Status para filtrar (PENDING ou DONE)
 * @returns Promise com array de itens filtrados
 */
async function getByStatus(status: FilterStatus): Promise<ItemStorage[]>{
  const items = await get() // Busca todos os itens
  return items.filter((item) => item.status === status) // Filtra por status
}

/**
 * Salva array de itens no AsyncStorage
 * @param items - Array de itens para salvar
 */
async function save(items: ItemStorage[]): Promise<void>{
  try{
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items))
  }catch(error){
    throw new Error('ITEMS_SAVE:' + error)
  }
}

/**
 * Adiciona um novo item à lista
 * @param newItem - Novo item para adicionar
 * @returns Promise com array atualizado de itens
 */
async function add(newItem: ItemStorage): Promise<ItemStorage[]>{
  const items = await get() // Busca itens existentes
  const updatedItems = [...items, newItem] // Adiciona novo item
  await save(updatedItems) // Salva lista atualizada

  return updatedItems
}

/**
 * Remove um item específico da lista
 * @param id - ID do item a ser removido
 */
async function remove(id: string): Promise<void>{
  const items = await get() // Busca todos os itens
  const updatedItems = items.filter((item)=> item.id !== id) // Remove item com ID específico
  await save(updatedItems) // Salva lista sem o item removido
}

/**
 * Remove todos os itens do storage
 */
async function clear(): Promise<void>{
  try{
    await AsyncStorage.removeItem(ITEMS_STORAGE_KEY) // Remove chave inteira do storage
  }catch(error){
    throw new Error('ITEMS_CLEAR:' + error)
  }
}

/**
 * Alterna o status de um item específico
 * Se está PENDING vira DONE, se está DONE vira PENDING
 * @param id - ID do item para alterar status
 */
async function toggleStatus(id: string): Promise<void>{
  const items = await get() // Busca todos os itens
  const updatedItems = items.map((item)=>
    item.id === id // Se é o item procurado
      ?{
          ...item, // Mantém todas as propriedades
          status: item.status === FilterStatus.PENDING // Alterna o status
          ? FilterStatus.DONE
          : FilterStatus.PENDING
      }
      : item // Se não é o item, mantém inalterado
  )
  await save(updatedItems) // Salva lista com status alterado
}

// Exporta objeto com todas as funções de storage
export const itemsStorage = {
  get,         // Buscar todos
  add,         // Adicionar novo
  getByStatus, // Buscar por status
  remove,      // Remover específico
  clear,       // Limpar todos
  toggleStatus // Alterar status
}