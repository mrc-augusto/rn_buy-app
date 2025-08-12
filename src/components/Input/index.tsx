import{ TextInput, TextInputProps, View } from 'react-native'
import {styles} from './styles'

/**
 * Componente de input customizado que encapsula um TextInput
 * com estilos padrão do app
 * - Recebe todas as props padrão do TextInput
 * - Aplica cor padrão para placeholder
 */
export function Input({...rest}: TextInputProps){
  return(
    <TextInput
      style={styles.container}
      placeholderTextColor='#74798b' // Cor padrão para placeholder
      {...rest} // Passa todas as props recebidas
    />
  )
}
