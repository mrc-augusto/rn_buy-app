import {FilterStatus} from '@/types/FilterStatus'
import {CircleDashed, CircleCheck} from 'lucide-react-native'

/**
 * Componente que renderiza ícones diferentes baseado no status do item
 * - Se DONE: mostra ícone de check (concluído)
 * - Se PENDING: mostra ícone tracejado (pendente)
 */
export function StatusIcon({status}: {status: FilterStatus}){
  return (
    // Condicional que escolhe o ícone baseado no status
    status === FilterStatus.DONE ? (
      // Ícone para itens concluídos (azul)
      <CircleCheck size={16} color='#2c46b1'/>
    ) : (
      // Ícone para itens pendentes (preto)
      <CircleDashed size={16} color='#000'/>
    )
  ) 
}