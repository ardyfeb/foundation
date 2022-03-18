import { default as React } from 'react'
import { View } from 'react-native'

import { useSystem } from './hooks/useSystem'
import { Modifier, composeModifers } from './modifiers/modifier'
import { Theme } from './theme'
import { AnyObject } from './types'

export function createComponent<P extends AnyObject, T extends Theme>(
  modifiers: (Modifier<P, T>| Modifier<P, T>[])[],
  BaseComponent: React.ComponentType<any> = View
) {
  const composed = composeModifers(modifiers)
  
  const MappedComponent = React.forwardRef(
    (props: P, ref) => {
      const mapped = useSystem(composed, props)

      return (
        <BaseComponent {...{ ref, ...mapped }} />
      )
    }
  )

  type MappedComponentType = typeof MappedComponent

  return MappedComponent as MappedComponentType & {
    defaultProps?: Partial<React.ComponentProps<MappedComponentType>>
  }
}
