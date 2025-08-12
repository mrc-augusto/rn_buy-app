import {
   Text, 
   TouchableOpacity, 
   TouchableOpacityProps 
  } from 'react-native'
import {styles} from './styles'
import { FilterStatus } from '@/types/FilterStatus'
import { StatusIcon } from '../StatusIcon'

// Interface que define as props do componente Filter
interface FilterProps extends TouchableOpacityProps{
  status: FilterStatus  // Status que o filtro representa
  isActive: boolean     // Se o filtro está atualmente ativo
}

/**
 * Componente de filtro que permite alternar entre visualizar
 * itens pendentes ou concluídos
 * - Muda opacidade baseado se está ativo ou não
 * - Mostra texto e ícone apropriados para cada status
 */
export function Filter({status, isActive, ...rest}: FilterProps){
  return(
    <TouchableOpacity 
      // Aplica opacidade 1 se ativo, 0.5 se inativo
      style={[styles.container, {opacity: isActive ? 1 : 0.5}]} 
      {...rest} // Passa todas as outras props (como onPress)
      activeOpacity={0.7}
    >
      {/* Ícone que representa o status */}
      <StatusIcon status={status} />
      
      {/* Texto que muda baseado no status */}
      <Text style={styles.title}>
        {status === FilterStatus.DONE ? 'Comprados' : 'Pendentes'}
      </Text>
    </TouchableOpacity>
  )
}