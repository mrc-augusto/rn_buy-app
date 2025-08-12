import {View, Text, TouchableOpacity } from 'react-native'
import {Trash2} from 'lucide-react-native'

import {styles} from './styles'
import { StatusIcon } from '../StatusIcon'
import { FilterStatus } from '@/types/FilterStatus'

// Interface que define a estrutura dos dados de um item
interface ItemData{
  status: FilterStatus // Status do item (pendente ou concluído)
  description: string  // Descrição do item
}

// Interface que define as props do componente Item
interface ItemProps{
  data: ItemData        // Dados do item
  onStatus: ()=>void    // Função chamada quando clica no status
  onRemove: ()=>void    // Função chamada quando clica em remover
}

/**
 * Componente que representa um item individual da lista
 * - Mostra ícone de status (clicável para alterar)
 * - Exibe descrição do item
 * - Tem botão para remover item
 */
export function Item({data, onStatus, onRemove}: ItemProps){
  return (
    <View style={styles.container}>
      {/* Botão para alterar status do item */}
      <TouchableOpacity activeOpacity={0.8} onPress={onStatus}>
        <StatusIcon status={data.status}/>
      </TouchableOpacity>
      
      {/* Descrição do item */}
      <Text style={styles.description}>
        {data.description}
      </Text>
      
      {/* Botão para remover item */}
      <TouchableOpacity onPress={onRemove}>
        <Trash2 size={18} color='#828282'/>
      </TouchableOpacity>
    </View>
  )
}