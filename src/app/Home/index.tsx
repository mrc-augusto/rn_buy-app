import {
  View, 
  Image, 
  TouchableOpacity, 
  Text, 
  FlatList,
  Alert
} from 'react-native'
import {styles} from './styles'
import { FilterStatus } from '@/types/FilterStatus'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Filter } from '@/components/Filter'
import { Item } from '@/components/Item'
import { useState, useEffect } from 'react'
import { ItemStorage, itemsStorage} from '@/storage/itemsStorage'

// Array constante com os tipos de filtro disponíveis
// Usado para mapear e criar os componentes Filter
const FILTER_STATUS: FilterStatus[] = [
  FilterStatus.PENDING, // Itens pendentes
  FilterStatus.DONE     // Itens concluídos
]

/**
 * Componente principal da tela Home
 * Gerencia a lista de compras com funcionalidades de:
 * - Adicionar novos itens
 * - Filtrar itens por status
 * - Marcar itens como concluídos/pendentes
 * - Remover itens
 * - Limpar toda a lista
 */
export function Home(){
  // Estados do componente
  const [filter, setFilter] = useState(FilterStatus.PENDING) // Filtro ativo atual
  const [description, setDescription] = useState('')         // Texto do input para novo item
  const [items, setItems] = useState<ItemStorage[]>([])      // Lista de itens filtrados

  /**
   * Função para adicionar um novo item à lista
   * - Valida se a descrição não está vazia
   * - Cria novo item com status PENDING
   * - Salva no storage e atualiza a lista
   */
  async function handleAdd(){
    // Validação: verifica se há descrição
    if(!description.trim()){
      return Alert.alert('Adicionar', 'Informe a descrição para adicionar')
    }

    // Cria novo item com ID aleatório
    const newItem={
      id: Math.random().toString(36).substring(2), // Gera ID único
      description,
      status: FilterStatus.PENDING // Novo item sempre começa como pendente
    }
    
    await itemsStorage.add(newItem) // Adiciona ao storage
    await itemByStatus()            // Atualiza lista filtrada

    // Reset do formulário e feedback
    setFilter(FilterStatus.PENDING) // Força filtro para PENDING para mostrar o item
    Alert.alert('Adicionado', `Adicionado ${description}`)
    setDescription('') // Limpa o input
  }
  
  /**
   * Função para buscar itens do storage baseado no filtro atual
   * Atualiza o estado 'items' com os itens filtrados
   */
  async function itemByStatus(){
    try{
      const response = await itemsStorage.getByStatus(filter) // Busca itens por status
      setItems(response) // Atualiza estado com itens filtrados
    }catch(error){
      Alert.alert('Erro', 'Não foi possível filtrar os itens')
    }
  }

  /**
   * Função para remover um item específico
   * @param id - ID do item a ser removido
   */
  async function handleRemove(id: string){
    try{
      await itemsStorage.remove(id) // Remove do storage
      await itemByStatus()          // Atualiza lista

      Alert.alert('Removido', 'Item removido com sucesso')
    }catch(error){
      Alert.alert('Erro', 'Não foi possível remover o item')
    }
  }

  /**
   * Função para limpar todos os itens
   * Mostra confirmação antes de executar
   */
  function handleClear(){
    Alert.alert('Limpar', 'Deseja limpar todos os itens?', [
      {
        text: 'Não',
        style: 'cancel' // Botão para cancelar
      },
      {
        text: 'Sim',
        onPress: async() => {
          try{
            await itemsStorage.clear() // Remove todos do storage
            setItems([])               // Limpa lista local
            Alert.alert('Limpar', 'Todos os itens foram removidos')
          }catch(error){
            Alert.alert('Erro', 'Não foi possível limpar os itens')
          }
        }
      }
    ])
  }

  /**
   * Função para alterar status de um item (pendente ↔ concluído)
   * @param id - ID do item para alterar status
   */
  async function handleToggleItemStatus(id: string){
    try{
      await itemsStorage.toggleStatus(id) // Alterna status no storage
      await itemByStatus()                // Atualiza lista
    }catch(error){
      console.log(error)
      Alert.alert('Erro', 'Não foi possível atualizar o status do item')
    }
  }

  // Effect que executa quando o filtro muda
  // Busca os itens correspondentes ao novo filtro
  useEffect(()=>{
    itemByStatus()
  }, [filter]) // Dependência: executa quando 'filter' muda

  return(
    <>
      <View style={styles.container}>
        {/* Logo do app */}
        <Image 
          source={require('@/assets/logo.png')}
          style={styles.logo}
        />

        {/* Formulário para adicionar novos itens */}
        <View style={styles.form}>
          <Input 
            placeholder='O que você precisa comprar?'
            onChangeText= {setDescription} // Atualiza estado quando digita
            value={description}            // Valor controlado pelo estado
          />
          <Button 
            title='Adicionar'
            onPress={handleAdd} // Chama função de adicionar
          />
        </View>

        {/* Área principal com filtros e lista */}
        <View style={styles.content}>
          {/* Header com filtros e botão limpar */}
          <View style={styles.header}>
            {/* Mapeia os filtros disponíveis */}
            {FILTER_STATUS.map((status)=> (
              <Filter
                key={status}
                status={status}
                isActive = {status === filter}      // Marca como ativo se for o filtro atual
                onPress={()=>setFilter(status)}     // Muda filtro quando clica
              />
            ))}
            
            {/* Botão para limpar todos os itens */}
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearText}>
                Limpar
              </Text>
            </TouchableOpacity>
          </View>

          {/* Lista de itens */}
          <FlatList
            data={items}                              // Dados para renderizar
            keyExtractor={item => item.id}            // Chave única para cada item
            renderItem={({item})=>(                   // Como renderizar cada item
              <Item
                data={item}                           // Passa dados do item
                onStatus={() => handleToggleItemStatus(item.id)} // Função para alterar status
                onRemove={() => {handleRemove(item.id)}}         // Função para remover
              />
            )}
            showsVerticalScrollIndicator={false}                                    // Esconde barra de scroll
            ItemSeparatorComponent={() => <View style={styles.separator} />}       // Separador entre itens
            contentContainerStyle={styles.listContent}                             // Estilo do container
            ListEmptyComponent={()=><Text style={styles.empty}>Nenhum item aqui</Text>} // Mensagem quando vazio
          />
        </View>
      </View>
    </>
  )
}
