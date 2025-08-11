import {View, Text, TouchableOpacity } from 'react-native'
import {Trash2} from 'lucide-react-native'

import {styles} from './styles'
import { StatusIcon } from '../StatusIcon'
import { FilterStatus } from '@/types/FilterStatus'

interface ItemData{
  status: FilterStatus
  description: string
}

interface ItemProps{
  data: ItemData
  onStatus: ()=>void
  onRemove: ()=>void
}

export function Item({data, onStatus, onRemove}: ItemProps){
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onStatus}>
        <StatusIcon status={data.status}/>
      </TouchableOpacity>
      <Text style={styles.description}>
        {data.description}
      </Text>
      <TouchableOpacity onPress={onRemove}>
        <Trash2 size={18} color='#828282'/>
      </TouchableOpacity>
    </View>
  )
}