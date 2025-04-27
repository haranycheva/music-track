import { create } from 'zustand';

const useSelectedStore = create(set => ({
  selected: [],
  ableSelect: false,
  setAbleSelect: (ableSelect) => set({ableSelect, selected: []}),
  setSelected: (selected) => set({selected})
}));

export default useSelectedStore;
