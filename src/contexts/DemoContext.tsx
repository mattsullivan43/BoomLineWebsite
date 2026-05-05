import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import DemoModal from '../components/DemoModal'

type DemoCtx = {
  open: () => void
  close: () => void
}

const Ctx = createContext<DemoCtx>({ open: () => {}, close: () => {} })

export function useDemo() {
  return useContext(Ctx)
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Ctx.Provider
      value={{
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
      <DemoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Ctx.Provider>
  )
}
