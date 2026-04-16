import StoreProvider from "@/redux/provider";


export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      {children}
    </StoreProvider>
  )
};