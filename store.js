import { create } from 'zustand'

export const useCaseDetailsMenu = create((set) => ({
  caseDetailsMenu: 1,
  setCaseDetailsMenu: (value) => set({ caseDetailsMenu: value })
})) 

export const useFinanceMenu = create((set) => ({
  financeMenu: 1,
  setFinanceMenu: (value) => set({ financeMenu: value })
})) 