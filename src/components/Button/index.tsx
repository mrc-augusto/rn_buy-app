import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import {styles} from './styles'

// Interface que estende as props padrão do TouchableOpacity
interface ButtonProps extends TouchableOpacityProps {
  title: string // Texto que aparecerá no botão
}

/**
 * Componente de botão customizado
 * - Recebe um título obrigatório
 * - Herda todas as funcionalidades do TouchableOpacity
 * - Aplica estilos padrão do app
 */
export function Button({title, ...rest}: ButtonProps){
  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={0.7} // Opacidade quando pressionado
      {...rest} // Passa todas as outras props (onPress, disabled, etc)
    >
      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}