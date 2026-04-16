'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/redux/store'

export default function StoreProvider({ children, }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null)
  if (storeRef.current === null) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  // return <Provider store={storeRef.current}>{children}</Provider>
  const store = storeRef.current;
  return <Provider store={store}>{children}</Provider>
}





// export default function Providers({ children }: { children: React.ReactNode }) {
//   const storeRef = useRef<any>(null)

//   if (!storeRef.current) {
//     storeRef.current = makeStore()
//   }

//   return <Provider store={storeRef.current}>{children}</Provider>
// }


// import { useMemo } from 'react'

// export default function Providers({ children }: { children: React.ReactNode }) {
//   const store = useMemo(() => makeStore(), [])

//   return <Provider store={store}>{children}</Provider>