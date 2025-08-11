import {
  View, 
  Image, 
  TouchableOpacity, 
  Text, 
  FlatList
} from 'react-native'
import {styles} from './styles'
import { FilterStatus } from '@/types/FilterStatus'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Filter } from '@/components/Filter'
import { Item } from '@/components/Item'

// Está é uma constante que está tipada para receber os valores
// do FilterStatus, que são DONE e PENDING
// Isso é útil para garantir que apenas esses valores sejam usados
const FILTER_STATUS: FilterStatus[] = [
  FilterStatus.PENDING,
  FilterStatus.DONE
]

const ITEMS = [
  {id: '1', status: FilterStatus.PENDING, description: '1 pct de café'},
  {id: '2', status: FilterStatus.DONE, description: '3 pct de macarrão'},
  {id: '3', status: FilterStatus.DONE, description: '3 cebolas'},
]

export function Home()
{
  return(
    <>
      <View style={styles.container}>
        <Image 
          source={require('@/assets/logo.png')}
          style={styles.logo}
        />

        <View style={styles.form}>
          <Input placeholder='O que você precisa comprar?'/>
          <Button title='Adicionar'/>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            {/* Mapeia a lista de filtros e retorna um 
            componente Filter para cada item */}
            {FILTER_STATUS.map((status)=>
              <Filter
                key={status}
                status={status}
                isActive
              />
            )}
            <TouchableOpacity style={styles.clearButton}>
              <Text style={styles.clearText}>
                Limpar
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={ITEMS}
            keyExtractor={item => item.id}
            renderItem={({item})=>(
              <Item
                data={item}
                onStatus={() => {}}
                onRemove={() => {}}
              />
            )}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={()=><Text style={styles.empty}>Nenhum item aqui</Text>}
          />
        </View>
      </View>
    </>
  )
}
