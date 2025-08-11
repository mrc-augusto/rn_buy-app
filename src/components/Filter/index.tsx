
import {
   Text, 
   TouchableOpacity, 
   TouchableOpacityProps 
  } from 'react-native'
import {styles} from './styles'
import { FilterStatus } from '@/types/FilterStatus'
import { StatusIcon } from '../StatusIcon'

interface FilterProps extends TouchableOpacityProps{
  status: FilterStatus
  isActive: boolean
}

export function Filter({status, isActive, ...rest}: FilterProps){
  return(
    <TouchableOpacity 
      style={[styles.container, {opacity: isActive ? 1 : 0.5}]} 
      {...rest}
      activeOpacity={0.7}
    >
      <StatusIcon status={status} />
      <Text style={styles.title}>
        {status === FilterStatus.DONE ? 'Comprados' : 'Pendentes'}
      </Text>
    </TouchableOpacity>
  )
}