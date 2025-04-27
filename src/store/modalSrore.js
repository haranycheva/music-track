import { create } from 'zustand';

const useModalStore = create(set => ({
  type: null,
  info: null,
  openModal: (type, info = null) => set({ type, info }),
  closeModal: () => set({ type: null, info: null }),
}));

export default useModalStore;
