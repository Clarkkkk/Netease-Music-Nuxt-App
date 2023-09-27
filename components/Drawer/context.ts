import { type Ref } from 'vue'
import { createContext } from 'utils'

interface DrawerContext {
    visible: Ref<boolean>
    open: () => void
    close: () => void
}

export const [provide, useDrawerContext] = createContext<DrawerContext>('drawer-context')
